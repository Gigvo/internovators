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
    // Simulate registration
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 1500);
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
                onClick={() => setIsLoading(true)}
                disabled={isLoading}
              >
                {isLoading ? "Connecting..." : "Continue with Google"}
              </Button>
            </TabsContent>
          </Tabs>
        ) : (
          <form onSubmit={handleProfileSetup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="main-division">Main Division</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select your main division" />
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
                  <SelectItem value="frontend-dev">
                    Frontend Development
                  </SelectItem>
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
