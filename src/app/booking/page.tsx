"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckIcon, ClockIcon, XIcon } from "lucide-react";

// Define the Booking type
interface Booking {
  id: string;
  room: string;
  date: string;
  startTime: string;
  endTime: string;
  purpose: string;
}

export default function BookingPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [room, setRoom] = useState<string | undefined>();
  const [startTime, setStartTime] = useState<string | undefined>();
  const [endTime, setEndTime] = useState<string | undefined>();
  const [purpose, setPurpose] = useState<string | undefined>();
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [pendingBookings, setPendingBookings] = useState<Booking[]>([]); // Use the Booking type here

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setIsAdmin(data.role === "Resource Manager"))
        .catch((err) => console.error("Error fetching user role:", err));
    }
  }, []);

  const fetchPendingBookings = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/booking/pending`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      if (response.ok) {
        const data: Booking[] = await response.json(); // Ensure the response is typed
        setPendingBookings(data);
      } else {
        console.error("Failed to fetch pending bookings");
      }
    } catch (error) {
      console.error("Error fetching pending bookings:", error);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchPendingBookings();
    }
  }, [isAdmin]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const bookingDetails = {
      date,
      room,
      startTime,
      endTime,
      purpose,
      description,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/booking`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingDetails),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Booking successful:", data);
      } else {
        const errorData = await response.json();
        console.error("Booking failed:", errorData);
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproveBooking = async (bookingId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/booking/approve/${bookingId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      if (response.ok) {
        fetchPendingBookings();
      } else {
        console.error("Failed to approve booking");
      }
    } catch (error) {
      console.error("Error approving booking:", error);
    }
  };

  const handleRejectBooking = async (bookingId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/booking/reject/${bookingId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      if (response.ok) {
        fetchPendingBookings();
      } else {
        console.error("Failed to reject booking");
      }
    } catch (error) {
      console.error("Error rejecting booking:", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container py-10 px-4 md:px-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Room Booking</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Book a room in the basecamp for your division meetings and events
            </p>
          </div>

          <Tabs defaultValue="book">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="book">Book a Room</TabsTrigger>
              <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            </TabsList>
            <TabsContent value="book" className="space-y-6 pt-6">
              <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
                <Card>
                  <CardHeader>
                    <CardTitle>Select Date</CardTitle>
                    <CardDescription>
                      Choose a date for your booking
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
                    <CardTitle>Booking Details</CardTitle>
                    <CardDescription>
                      Fill in the details for your room booking
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleBooking} className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Room
                        </label>
                        <Select onValueChange={setRoom}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a room" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="conference-room">
                              Conference Room
                            </SelectItem>
                            <SelectItem value="meeting-room-1">
                              Meeting Room 1
                            </SelectItem>
                            <SelectItem value="meeting-room-2">
                              Meeting Room 2
                            </SelectItem>
                            <SelectItem value="training-room">
                              Training Room
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Start Time
                          </label>
                          <Select onValueChange={setStartTime}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select start time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="09:00">9:00 AM</SelectItem>
                              <SelectItem value="10:00">10:00 AM</SelectItem>
                              <SelectItem value="11:00">11:00 AM</SelectItem>
                              <SelectItem value="12:00">12:00 PM</SelectItem>
                              <SelectItem value="13:00">1:00 PM</SelectItem>
                              <SelectItem value="14:00">2:00 PM</SelectItem>
                              <SelectItem value="15:00">3:00 PM</SelectItem>
                              <SelectItem value="16:00">4:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            End Time
                          </label>
                          <Select onValueChange={setEndTime}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select end time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="10:00">10:00 AM</SelectItem>
                              <SelectItem value="11:00">11:00 AM</SelectItem>
                              <SelectItem value="12:00">12:00 PM</SelectItem>
                              <SelectItem value="13:00">1:00 PM</SelectItem>
                              <SelectItem value="14:00">2:00 PM</SelectItem>
                              <SelectItem value="15:00">3:00 PM</SelectItem>
                              <SelectItem value="16:00">4:00 PM</SelectItem>
                              <SelectItem value="17:00">5:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Purpose
                        </label>
                        <Select onValueChange={setPurpose}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select purpose" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="division-meeting">
                              Division Meeting
                            </SelectItem>
                            <SelectItem value="training">Training</SelectItem>
                            <SelectItem value="event-planning">
                              Event Planning
                            </SelectItem>
                            <SelectItem value="project-work">
                              Project Work
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Description
                        </label>
                        <Textarea
                          placeholder="Provide details about your booking"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? "Submitting..." : "Submit Booking Request"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="bookings" className="space-y-6 pt-6">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Bookings</CardTitle>
                    <CardDescription>
                      Your pending and approved room bookings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="font-medium">Conference Room</p>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <ClockIcon className="mr-1 h-4 w-4" />
                              <span>May 15, 2023 • 10:00 AM - 12:00 PM</span>
                            </div>
                            <p className="text-sm">
                              Frontend Development Team Meeting
                            </p>
                          </div>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-800/20 dark:text-green-400">
                            <CheckIcon className="mr-1 h-3 w-3" />
                            Approved
                          </Badge>
                        </div>
                      </div>
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1"></div>
                          <p className="font-medium">Training Room</p>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <ClockIcon className="mr-1 h-4 w-4" />
                            <span>May 20, 2023 • 2:00 PM - 5:00 PM</span>
                          </div>
                          <p className="text-sm">New Member Onboarding</p>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-800/20 dark:text-yellow-400"
                        >
                          Pending
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Past Bookings</CardTitle>
                    <CardDescription>
                      Your previous room bookings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="font-medium">Meeting Room 1</p>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <ClockIcon className="mr-1 h-4 w-4" />
                              <span>April 28, 2023 • 9:00 AM - 11:00 AM</span>
                            </div>
                            <p className="text-sm">Project Planning Session</p>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-800/20 dark:text-gray-400"
                          >
                            Completed
                          </Badge>
                        </div>
                      </div>
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="font-medium">Conference Room</p>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <ClockIcon className="mr-1 h-4 w-4" />
                              <span>April 15, 2023 • 1:00 PM - 3:00 PM</span>
                            </div>
                            <p className="text-sm">Quarterly Division Review</p>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-800/20 dark:text-red-400"
                          >
                            <XIcon className="mr-1 h-3 w-3" />
                            Cancelled
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
          {isAdmin && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Admin Section</h2>
              <div className="grid gap-6">
                {pendingBookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardHeader>
                      <CardTitle>{booking.room}</CardTitle>
                      <CardDescription>
                        {booking.date} • {booking.startTime} - {booking.endTime}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{booking.purpose}</p>
                      <div className="flex gap-4 mt-4">
                        <Button
                          onClick={() => handleApproveBooking(booking.id)}
                          className="bg-green-500 text-white"
                        >
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleRejectBooking(booking.id)}
                          className="bg-red-500 text-white"
                        >
                          Reject
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
