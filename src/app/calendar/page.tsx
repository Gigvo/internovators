"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, ClockIcon, UsersIcon, MapPinIcon } from "lucide-react";

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span>OrgManager</span>
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
            <Link
              href="/internal-affairs"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Internal Affairs
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
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
            <p className="text-gray-500 dark:text-gray-400">
              View and manage your organization events and meetings
            </p>
          </div>

          <Tabs defaultValue="org">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="org">Organization</TabsTrigger>
              <TabsTrigger value="division">Division</TabsTrigger>
              <TabsTrigger value="personal">Personal</TabsTrigger>
            </TabsList>
            <TabsContent value="org" className="space-y-6 pt-6">
              <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Calendar</CardTitle>
                      <CardDescription>
                        Select a date to view events
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                      />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Filters</CardTitle>
                      <CardDescription>
                        Customize your calendar view
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">
                          Event Type
                        </label>
                        <Select defaultValue="all">
                          <SelectTrigger>
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Events</SelectItem>
                            <SelectItem value="meetings">Meetings</SelectItem>
                            <SelectItem value="trainings">Trainings</SelectItem>
                            <SelectItem value="events">
                              Special Events
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">
                          Division
                        </label>
                        <Select defaultValue="all">
                          <SelectTrigger>
                            <SelectValue placeholder="Select division" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Divisions</SelectItem>
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
                    </CardContent>
                  </Card>
                </div>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>
                          Events for{" "}
                          {date?.toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </CardTitle>
                        <CardDescription>
                          Organization-wide events and meetings
                        </CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        Add to Calendar
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-medium">Mandatory Events</h3>
                        <div className="rounded-lg border p-4 bg-primary/5">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold">
                                Quarterly Organization Meeting
                              </h4>
                              <Badge>Mandatory</Badge>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <ClockIcon className="mr-1 h-4 w-4" />
                              <span>10:00 AM - 12:00 PM</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <MapPinIcon className="mr-1 h-4 w-4" />
                              <span>Conference Room</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <UsersIcon className="mr-1 h-4 w-4" />
                              <span>All Members</span>
                            </div>
                            <p className="text-sm mt-2">
                              Review of quarterly goals and achievements. All
                              division heads to present progress reports.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="font-medium">Division Meetings</h3>
                        <div className="rounded-lg border p-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold">
                                Frontend Development Weekly Sync
                              </h4>
                              <Badge variant="outline">Division</Badge>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <ClockIcon className="mr-1 h-4 w-4" />
                              <span>2:00 PM - 3:00 PM</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <MapPinIcon className="mr-1 h-4 w-4" />
                              <span>Meeting Room 1</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <UsersIcon className="mr-1 h-4 w-4" />
                              <span>Frontend Development Team</span>
                            </div>
                          </div>
                        </div>
                        <div className="rounded-lg border p-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold">
                                Resource Manager Planning
                              </h4>
                              <Badge variant="outline">Division</Badge>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <ClockIcon className="mr-1 h-4 w-4" />
                              <span>4:00 PM - 5:00 PM</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <MapPinIcon className="mr-1 h-4 w-4" />
                              <span>Meeting Room 2</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <UsersIcon className="mr-1 h-4 w-4" />
                              <span>Resource Manager Team</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="font-medium">Training Sessions</h3>
                        <div className="rounded-lg border p-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold">
                                New Member Orientation
                              </h4>
                              <Badge variant="outline">Training</Badge>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <ClockIcon className="mr-1 h-4 w-4" />
                              <span>9:00 AM - 11:00 AM</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <MapPinIcon className="mr-1 h-4 w-4" />
                              <span>Training Room</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <UsersIcon className="mr-1 h-4 w-4" />
                              <span>New Members, Human Development</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="division" className="pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Frontend Development Calendar</CardTitle>
                  <CardDescription>
                    Events and meetings specific to your division
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">
                      Select the Division tab to view your divisions calendar
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="personal" className="pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Calendar</CardTitle>
                  <CardDescription>
                    Your personal schedule and availability
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">My Meetings</h3>
                      <div className="rounded-lg border p-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold">
                              Project Status Update
                            </h4>
                            <Badge variant="outline">Meeting</Badge>
                          </div>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <ClockIcon className="mr-1 h-4 w-4" />
                            <span>11:00 AM - 12:00 PM</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <MapPinIcon className="mr-1 h-4 w-4" />
                            <span>Meeting Room 1</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-medium">My Availability</h3>
                      <div className="rounded-lg border p-4">
                        <div className="space-y-2">
                          <p className="text-sm">
                            You are marked as available during these hours:
                          </p>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <ClockIcon className="mr-1 h-4 w-4" />
                            <span>9:00 AM - 5:00 PM</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-4 md:px-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2023 OrgManager. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
