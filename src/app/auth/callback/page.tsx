"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function AuthCallback() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [mainDivision, setMainDivision] = useState<string>("");
  const [managerialDivision, setManagerialDivision] = useState<string>("");
  const [availableTimes, setAvailableTimes] = useState<Record<string, boolean>>({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    weekend: false,
  });

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get token from URL query parameters
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        
        if (!token) {
          setError("No authentication token found");
          setIsLoading(false);
          return;
        }

        // Store the token
        localStorage.setItem("jwt", token);

        // Fetch user profile to check if setup is needed
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const userData = await response.json();
          // Check if user needs profile setup (e.g., if mainDivision is not set)
          if (!userData.mainDivision) {
            setShowProfileSetup(true);
          } else {
            router.push("/");
          }
        } else {
          setError("Failed to fetch user profile");
        }
      } catch (err) {
        setError("An error occurred during authentication: " + err);
      } finally {
        setIsLoading(false);
      }
    };

    handleCallback();
  }, []);

  const handleProfileSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        throw new Error("No authentication token found");
      }

      // Update user profile with division selections
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            mainDivision,
            managerialDivision: managerialDivision || undefined,
            availableTimes: Object.entries(availableTimes)
              .filter(([, isAvailable]) => isAvailable)
              .map(([day]) => day),
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        router.push("/");
      } else {
        setError(data.message || "Profile setup failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Error during profile setup:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckboxChange = (day: string) => {
    setAvailableTimes((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Error</h1>
          <p className="mt-2">{error}</p>
          <Button
            className="mt-4"
            onClick={() => router.push("/signin")}
          >
            Back to Sign In
          </Button>
        </div>
      </div>
    );
  }

  if (showProfileSetup) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Complete Your Profile</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Tell us about your role in the organization
            </p>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4 text-sm text-red-500">
              {error}
            </div>
          )}

          <form onSubmit={handleProfileSetup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="main-division">Technical Division</Label>
              <Select value={mainDivision} onValueChange={setMainDivision} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select your technical division" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="data-science-and-ai">Data Science and AI</SelectItem>
                  <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                  <SelectItem value="ui-ux">UI/UX</SelectItem>
                  <SelectItem value="frontend">Frontend</SelectItem>
                  <SelectItem value="backend">Backend</SelectItem>
                  <SelectItem value="mobile-apps">Mobile Apps</SelectItem>
                  <SelectItem value="competitive-programming">Competitive Programming</SelectItem>
                  <SelectItem value="game-development">Game Development</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="managerial-division">
                Managerial Division (Optional)
              </Label>
              <Select value={managerialDivision} onValueChange={setManagerialDivision}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your managerial division" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="content-and-design">Content and Design</SelectItem>
                  <SelectItem value="resource-manager">Resource Manager</SelectItem>
                  <SelectItem value="external-affairs">External Affairs</SelectItem>
                  <SelectItem value="research-and-competition">Research and Competition</SelectItem>
                  <SelectItem value="human-development">Human Development</SelectItem>
                  <SelectItem value="business-management">Business Management</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Weekly Availability</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="monday" 
                    checked={availableTimes.monday}
                    onCheckedChange={() => handleCheckboxChange("monday")}
                  />
                  <Label htmlFor="monday">Monday</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="tuesday" 
                    checked={availableTimes.tuesday}
                    onCheckedChange={() => handleCheckboxChange("tuesday")}
                  />
                  <Label htmlFor="tuesday">Tuesday</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="wednesday" 
                    checked={availableTimes.wednesday}
                    onCheckedChange={() => handleCheckboxChange("wednesday")}
                  />
                  <Label htmlFor="wednesday">Wednesday</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="thursday" 
                    checked={availableTimes.thursday}
                    onCheckedChange={() => handleCheckboxChange("thursday")}
                  />
                  <Label htmlFor="thursday">Thursday</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="friday" 
                    checked={availableTimes.friday}
                    onCheckedChange={() => handleCheckboxChange("friday")}
                  />
                  <Label htmlFor="friday">Friday</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="weekend" 
                    checked={availableTimes.weekend}
                    onCheckedChange={() => handleCheckboxChange("weekend")}
                  />
                  <Label htmlFor="weekend">Weekend</Label>
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Saving profile..." : "Complete Setup"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return null;
}
