"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Event {
  id: string;
  name: string;
  description: string;
  status: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`);
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

  const handleApply = async (eventId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/events/apply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          body: JSON.stringify({ eventId }),
        }
      );

      if (response.ok) {
        console.log("Applied successfully");
        fetchEvents();
      } else {
        console.error("Failed to apply for event");
      }
    } catch (error) {
      console.error("Error applying for event:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Events</h1>
      <div className="grid gap-6">
        {isLoading ? (
          <p>Loading events...</p>
        ) : (
          events.map((event) => (
            <Card key={event.id}>
              <CardHeader>
                <CardTitle>{event.name}</CardTitle>
                <CardDescription>{event.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Status: {event.status}</p>
                <Button onClick={() => handleApply(event.id)}>Apply</Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
