"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarIcon, UserIcon, LogOutIcon, SettingsIcon } from "lucide-react";

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate profile update
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span>OTI Connect</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Home
            </Link>
            <Link
              href="/calendar"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Calendar
            </Link>
            <Link
              href="/booking"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Room Booking
            </Link>
            <Link
              href="/feedback"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              OtiBersuara
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="User"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-10 px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-[1fr_3fr]">
          <div className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src="/placeholder.svg?height=96&width=96"
                  alt="User"
                />
                <AvatarFallback className="text-2xl">JD</AvatarFallback>
              </Avatar>
              <div className="space-y-1 text-center">
                <h1 className="text-2xl font-bold">John Doe</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  john.doe@example.com
                </p>
              </div>
            </div>
            <nav className="space-y-2">
              <Link
                href="/profile"
                className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
              >
                <UserIcon className="h-4 w-4" />
                Profile
              </Link>
              <Link
                href="/calendar"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <CalendarIcon className="h-4 w-4" />
                Calendar
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <SettingsIcon className="h-4 w-4" />
                Settings
              </Link>
              <Link
                href="/signin"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <LogOutIcon className="h-4 w-4" />
                Sign Out
              </Link>
            </nav>
          </div>
          <div className="space-y-8">
            <Tabs defaultValue="info">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="info">Personal Info</TabsTrigger>
                <TabsTrigger value="divisions">Divisions</TabsTrigger>
                <TabsTrigger value="availability">Availability</TabsTrigger>
              </TabsList>
              <TabsContent value="info" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first-name">First Name</Label>
                          <Input id="first-name" defaultValue="John" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Last Name</Label>
                          <Input id="last-name" defaultValue="Doe" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          defaultValue="john.doe@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          defaultValue="+1234567890"
                        />
                      </div>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save Changes"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="divisions" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Division Memberships</CardTitle>
                    <CardDescription>
                      Your current division assignments
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="font-medium">Main Division</h3>
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-1">
                          <p className="font-medium">Frontend Development</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Member since: Jan 15, 2023
                          </p>
                        </div>
                        <Badge>Approved</Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">Managerial Division</h3>
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-1">
                          <p className="font-medium">Resource Manager</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Member since: Mar 10, 2023
                          </p>
                        </div>
                        <Badge variant="outline">Pending</Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">Projects & Events</h3>
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-1">
                          <p className="font-medium">Annual Conference 2023</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Role: Technical Coordinator
                          </p>
                        </div>
                        <Badge>Approved</Badge>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-1">
                          <p className="font-medium">
                            Website Redesign Project
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Role: Frontend Developer
                          </p>
                        </div>
                        <Badge>Approved</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="availability" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Availability</CardTitle>
                    <CardDescription>
                      Update your available times for meetings and events
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileUpdate} className="space-y-6">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="monday">Monday</Label>
                              <Checkbox id="monday" checked />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <Select defaultValue="09:00">
                                <SelectTrigger>
                                  <SelectValue placeholder="From" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="09:00">9:00 AM</SelectItem>
                                  <SelectItem value="10:00">
                                    10:00 AM
                                  </SelectItem>
                                  <SelectItem value="11:00">
                                    11:00 AM
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <Select defaultValue="17:00">
                                <SelectTrigger>
                                  <SelectValue placeholder="To" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="16:00">4:00 PM</SelectItem>
                                  <SelectItem value="17:00">5:00 PM</SelectItem>
                                  <SelectItem value="18:00">6:00 PM</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="tuesday">Tuesday</Label>
                              <Checkbox id="tuesday" checked />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <Select defaultValue="09:00">
                                <SelectTrigger>
                                  <SelectValue placeholder="From" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="09:00">9:00 AM</SelectItem>
                                  <SelectItem value="10:00">
                                    10:00 AM
                                  </SelectItem>
                                  <SelectItem value="11:00">
                                    11:00 AM
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <Select defaultValue="17:00">
                                <SelectTrigger>
                                  <SelectValue placeholder="To" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="16:00">4:00 PM</SelectItem>
                                  <SelectItem value="17:00">5:00 PM</SelectItem>
                                  <SelectItem value="18:00">6:00 PM</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="wednesday">Wednesday</Label>
                              <Checkbox id="wednesday" checked />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <Select defaultValue="10:00">
                                <SelectTrigger>
                                  <SelectValue placeholder="From" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="09:00">9:00 AM</SelectItem>
                                  <SelectItem value="10:00">
                                    10:00 AM
                                  </SelectItem>
                                  <SelectItem value="11:00">
                                    11:00 AM
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <Select defaultValue="18:00">
                                <SelectTrigger>
                                  <SelectValue placeholder="To" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="16:00">4:00 PM</SelectItem>
                                  <SelectItem value="17:00">5:00 PM</SelectItem>
                                  <SelectItem value="18:00">6:00 PM</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="thursday">Thursday</Label>
                              <Checkbox id="thursday" />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <Select defaultValue="09:00" disabled>
                                <SelectTrigger>
                                  <SelectValue placeholder="From" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="09:00">9:00 AM</SelectItem>
                                  <SelectItem value="10:00">
                                    10:00 AM
                                  </SelectItem>
                                  <SelectItem value="11:00">
                                    11:00 AM
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <Select defaultValue="17:00" disabled>
                                <SelectTrigger>
                                  <SelectValue placeholder="To" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="16:00">4:00 PM</SelectItem>
                                  <SelectItem value="17:00">5:00 PM</SelectItem>
                                  <SelectItem value="18:00">6:00 PM</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save Availability"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
