"use client";

import { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
// import { MainNavigation } from "@/components/layout/main-navigation";

interface Event {
  id: number;
  date: string;
  type: string;
  title: string;
  time: string;
  location: string;
  audience: string;
  description?: string;
}

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [eventType, setEventType] = useState<string>("all");
  const [division, setDivision] = useState<string>("all");
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchEvents = async () => {
    if (!date) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/calendar?date=${
          date.toISOString().split("T")[0]
        }&type=${eventType}&division=${division}` // Use the environment variable
      );
      if (response.ok) {
        const data: Event[] = await response.json();
        setEvents(data);
      } else {
        console.error("Failed to fetch events");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [date, eventType, division]);

  return (
    <div className="flex min-h-screen flex-col">
      {/* <MainNavigation></MainNavigation> */}
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
                        <Select
                          defaultValue="all"
                          onValueChange={(value) => setEventType(value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Events</SelectItem>
                            <SelectItem value="mandatory">Mandatory</SelectItem>
                            <SelectItem value="division">Division</SelectItem>
                            <SelectItem value="training">Training</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">
                          Division
                        </label>
                        <Select
                          defaultValue="all"
                          onValueChange={(value) => setDivision(value)}
                        >
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
                    {isLoading ? (
                      <p>Loading events...</p>
                    ) : events.length > 0 ? (
                      <div className="space-y-6">
                        {events.map((event) => (
                          <div
                            key={event.id}
                            className="rounded-lg border p-4 bg-primary/5"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold">{event.title}</h4>
                                <Badge>{event.type}</Badge>
                              </div>
                              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <ClockIcon className="mr-1 h-4 w-4" />
                                <span>{event.time}</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <MapPinIcon className="mr-1 h-4 w-4" />
                                <span>{event.location}</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <UsersIcon className="mr-1 h-4 w-4" />
                                <span>{event.audience}</span>
                              </div>
                              {event.description && (
                                <p className="text-sm mt-2">
                                  {event.description}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>No events found for the selected date.</p>
                    )}
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
    </div>
  );
}
