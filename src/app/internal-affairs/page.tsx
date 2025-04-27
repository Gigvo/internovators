"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircleIcon,
  ClockIcon,
  AlertCircleIcon,
  PlusIcon,
  FilterIcon,
} from "lucide-react";

export default function InternalAffairsPage() {
  const [filter, setFilter] = useState("all");

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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Internal Affairs Dashboard
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Monitor division progress and task completion
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <FilterIcon className="h-4 w-4 text-gray-500" />
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tasks</SelectItem>
                    <SelectItem value="not-started">Not Started</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">24</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Across all divisions
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <Progress value={75} className="h-2" />
                  <span className="text-sm font-medium">75%</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Completed Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">18</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  +3 this week
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                    <div
                      className="h-full rounded-full bg-green-500"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-green-500">
                    75%
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">6</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  -2 from last week
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                    <div
                      className="h-full rounded-full bg-yellow-500"
                      style={{ width: "25%" }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-yellow-500">
                    25%
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Divisions</TabsTrigger>
              <TabsTrigger value="frontend">Frontend Dev</TabsTrigger>
              <TabsTrigger value="resource">Resource Manager</TabsTrigger>
              <TabsTrigger value="human">Human Development</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-6 pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Division Progress Overview</CardTitle>
                  <CardDescription>
                    Task completion status across all divisions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Frontend Development</h3>
                        <span className="text-sm font-medium">80%</span>
                      </div>
                      <Progress value={80} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>8/10 tasks completed</span>
                        <span>2 tasks remaining</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Resource Manager</h3>
                        <span className="text-sm font-medium">60%</span>
                      </div>
                      <Progress value={60} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>3/5 tasks completed</span>
                        <span>2 tasks remaining</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Human Development</h3>
                        <span className="text-sm font-medium">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>7/9 tasks completed</span>
                        <span>2 tasks remaining</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Task Updates</CardTitle>
                  <CardDescription>
                    Latest changes to division tasks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 rounded-lg border p-4">
                      <div className="rounded-full bg-green-100 p-2 dark:bg-green-800/20">
                        <CheckCircleIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">
                            Website Redesign - Phase 1
                          </p>
                          <Badge>Completed</Badge>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Frontend Development
                        </p>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <ClockIcon className="mr-1 h-3 w-3" />
                          <span>Updated 2 hours ago</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 rounded-lg border p-4">
                      <div className="rounded-full bg-yellow-100 p-2 dark:bg-yellow-800/20">
                        <ClockIcon className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">
                            Member Onboarding Process Update
                          </p>
                          <Badge variant="outline">In Progress</Badge>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Human Development
                        </p>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <ClockIcon className="mr-1 h-3 w-3" />
                          <span>Updated 1 day ago</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 rounded-lg border p-4">
                      <div className="rounded-full bg-red-100 p-2 dark:bg-red-800/20">
                        <AlertCircleIcon className="h-4 w-4 text-red-600 dark:text-red-400" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">
                            Quarterly Resource Allocation
                          </p>
                          <Badge variant="outline">Not Started</Badge>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Resource Manager
                        </p>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <ClockIcon className="mr-1 h-3 w-3" />
                          <span>Due in 3 days</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="frontend" className="pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Frontend Development Tasks</CardTitle>
                  <CardDescription>
                    Progress tracking for Frontend Development division
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 rounded-lg border p-4">
                      <div className="rounded-full bg-green-100 p-2 dark:bg-green-800/20">
                        <CheckCircleIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">
                            Website Redesign - Phase 1
                          </p>
                          <Badge>Completed</Badge>
                        </div>
                        <p className="text-sm">
                          Implement new homepage design with responsive layout
                        </p>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <ClockIcon className="mr-1 h-3 w-3" />
                          <span>Completed on May 10, 2023</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 rounded-lg border p-4">
                      <div className="rounded-full bg-green-100 p-2 dark:bg-green-800/20">
                        <CheckCircleIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">
                            User Authentication System
                          </p>
                          <Badge>Completed</Badge>
                        </div>
                        <p className="text-sm">
                          Implement secure login and registration system
                        </p>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <ClockIcon className="mr-1 h-3 w-3" />
                          <span>Completed on May 5, 2023</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 rounded-lg border p-4">
                      <div className="rounded-full bg-yellow-100 p-2 dark:bg-yellow-800/20">
                        <ClockIcon className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">Calendar Integration</p>
                          <Badge variant="outline">In Progress</Badge>
                        </div>
                        <p className="text-sm">
                          Implement interactive calendar with event management
                        </p>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <ClockIcon className="mr-1 h-3 w-3" />
                          <span>Due on May 20, 2023</span>
                        </div>
                        <Progress value={65} className="h-2 mt-2" />
                        <span className="text-xs text-gray-500">
                          65% complete
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="resource" className="pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resource Manager Tasks</CardTitle>
                  <CardDescription>
                    Progress tracking for Resource Manager division
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">
                      Select the Resource Manager tab to view division tasks
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="human" className="pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Human Development Tasks</CardTitle>
                  <CardDescription>
                    Progress tracking for Human Development division
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">
                      Select the Human Development tab to view division tasks
                    </p>
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
