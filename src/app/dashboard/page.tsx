"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import ProtectedRoute from "@/components/ProtectedRoute";

interface Event {
  id: string;
  name: string;
  date?: string;
}

export default function Dashboard() {
  const [events, setEvents] = useState<Event[]>([]); // Use Event[] for the state

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get<Event[]>("/events"); // Expect an array of Event
        setEvents(response.data);
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
          {events.map((event: Event) => (
            <li key={event.id} className="mb-2">
              {event.name || "Unnamed Event"}
            </li>
          ))}
        </ul>
      </div>
    </ProtectedRoute>
  );
}
