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

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const form = new FormData(e.currentTarget as HTMLFormElement);
    const name = form.get("name") as string;
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      if (response.ok) {
        console.log("Sign-up successful");
        // Redirect or show success message
      } else {
        const errorData = await response.json();
        console.error("Sign-up failed:", errorData);
      }
    } catch (error) {
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
    // Simulate profile setup
    setTimeout(() => {
      setIsLoading(false);
      // Redirect would happen here after successful profile setup
    }, 1500);
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

        {step === 1 ? (
          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="google">Google</TabsTrigger>
            </TabsList>
            <TabsContent value="email" className="space-y-4">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" required />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Sign Up"}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="google" className="space-y-4">
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
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select your technical division" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="backend-dev">
                    Backend Deveopment
                  </SelectItem>
                  <SelectItem value="data-science">Data Science</SelectItem>
                  <SelectItem value="game-development">
                    Game Development
                  </SelectItem>
                  <SelectItem value="frontend-dev">
                    Frontend Development
                  </SelectItem>
                  <SelectItem value="competitive-programming">
                    Competitive Programming
                  </SelectItem>
                  <SelectItem value="mobile-apps">Mobile Apps</SelectItem>
                  <SelectItem value="ui-ux">UI/UX</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="managerial-division">
                Managerial Division (Optional)
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select your managerial division" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="internal-affairs">
                    Internal Affairs
                  </SelectItem>
                  <SelectItem value="human-development">
                    Human Development
                  </SelectItem>
                  <SelectItem value="resource-manager">
                    Resource Manager
                  </SelectItem>
                  <SelectItem value="external-affairs">
                    External Affairs
                  </SelectItem>
                  <SelectItem value="information-technology">
                    Information Technology
                  </SelectItem>
                  <SelectItem value="assignation-manager">
                    Assignation Manager
                  </SelectItem>
                  <SelectItem value="skill-development">
                    Skill Development
                  </SelectItem>
                  <SelectItem value="bussines-management">
                    Bussines Management
                  </SelectItem>
                  <SelectItem value="research-and-competition">
                    Research and Competition
                  </SelectItem>
                  <SelectItem value="content-and-design">
                    Content and Design
                  </SelectItem>
                  <SelectItem value="project-manager">
                    Projet Manager
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Weekly Availability</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="monday" />
                  <Label htmlFor="monday">Monday</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="tuesday" />
                  <Label htmlFor="tuesday">Tuesday</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="wednesday" />
                  <Label htmlFor="wednesday">Wednesday</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="thursday" />
                  <Label htmlFor="thursday">Thursday</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="friday" />
                  <Label htmlFor="friday">Friday</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="weekend" />
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
