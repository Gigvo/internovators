"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
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

  // Add email validation function
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Add password validation function
  const validatePassword = (password: string) => {
    // At least 6 characters, 1 uppercase, 1 lowercase, 1 number
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return re.test(password);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    // Validate name
    if (!name || name.trim().length < 2) {
      setError("Name must be at least 2 characters long");
      setIsLoading(false);
      return;
    }

    // Validate email
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    // Validate password
    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number");
      setIsLoading(false);
      return;
    }

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Store the token
        localStorage.setItem("jwt", data.token);
        // Move to next step
        setStep(2);
      } else {
        // Show the specific error message from the backend
        setError(data.message || data.error || "Sign up failed. Please try again.");
        console.error("Registration failed:", data);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Error during sign-up:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

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
        // Redirect to home page after successful profile setup
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

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">
            {step === 1 ? "Create an Account" : "Complete Your Profile"}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {step === 1
              ? "Sign up to join your organization"
              : "Tell us about your role in the organization"}
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 text-sm text-red-500">
            {error}
          </div>
        )}

        {step === 1 ? (
          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="google">Google</TabsTrigger>
            </TabsList>
            <TabsContent value="email">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    placeholder="John Doe" 
                    required 
                    minLength={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    name="password" 
                    type="password" 
                    required 
                    minLength={6}
                  />
                  <p className="text-xs text-gray-500">
                    Must be at least 6 characters with 1 uppercase, 1 lowercase, and 1 number
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input 
                    id="confirm-password" 
                    name="confirm-password" 
                    type="password" 
                    required 
                    minLength={6}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Sign Up"}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="google">
              <Button
                variant="outline"
                className="w-full"
                onClick={handleGoogleSignUp}
                disabled={isLoading}
              >
                {isLoading ? "Connecting..." : "Continue with Google"}
              </Button>
            </TabsContent>
          </Tabs>
        ) : (
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
        )}

        <div className="space-y-4">
          <Separator />
          <div className="text-center text-sm">
            {step === 1 ? (
              <>
                Already have an account?{" "}
                <Link href="/signin" className="text-primary hover:underline">
                  Sign in
                </Link>
              </>
            ) : (
              <>
                Need to make changes?{" "}
                <button
                  onClick={() => setStep(1)}
                  className="text-primary hover:underline"
                >
                  Go back
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
