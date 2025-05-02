"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

interface Event {
  id: string;
  name: string;
  date?: string;
}

export default function Dashboard() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/events`
        );
        if (response.ok) {
          const data: Event[] = await response.json();
          setEvents(data);
        } else {
          console.error("Failed to fetch events");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <ProtectedRoute>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <ul>
          {events.map((event) => (
            <li key={event.id} className="mb-2">
              {event.name || "Unnamed Event"}
            </li>
          ))}
        </ul>
      </div>
    </ProtectedRoute>
  );
}
