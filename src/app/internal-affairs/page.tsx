"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // For redirection
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusIcon, FilterIcon } from "lucide-react";
// import { MainNavigation } from "@/components/layout/main-navigation";

interface Task {
  id: number;
  title: string;
  division: string;
  status: string;
  progress: number;
  updatedAt: string;
}

export default function InternalAffairsPage() {
  const [filter, setFilter] = useState("all");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDivision, setNewTaskDivision] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userDivision, setUserDivision] = useState<string | null>(null); // Store user's division
  const router = useRouter();

  const fetchUserDivision = async () => {
    try {
      const response = await fetch("/api/profile"); // Fetch user profile
      if (response.ok) {
        const data = await response.json();
        setUserDivision(data.mainDivision); // Assuming `mainDivision` contains the user's division
      } else {
        console.error("Failed to fetch user division");
      }
    } catch (error) {
      console.error("Error fetching user division:", error);
    }
  };

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/tasks?filter=${filter}`);
      if (response.ok) {
        const data: Task[] = await response.json();
        setTasks(data);
      } else {
        console.error("Failed to fetch tasks");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTask = async () => {
    if (!newTaskTitle || !newTaskDivision) return;

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTaskTitle,
          division: newTaskDivision,
        }),
      });

      if (response.ok) {
        const newTask: Task = await response.json();
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setNewTaskTitle("");
        setNewTaskDivision("");
      } else {
        console.error("Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  useEffect(() => {
    fetchUserDivision();
  }, []);

  useEffect(() => {
    if (userDivision && userDivision !== "Internal Affairs") {
      router.push("/unauthorized"); // Redirect if the user is not in the Internal Affairs division
    }
  }, [userDivision]);

  useEffect(() => {
    if (userDivision === "Internal Affairs") {
      fetchTasks();
    }
  }, [filter, userDivision]);

  if (userDivision === null) {
    return <p>Loading...</p>; // Show a loading state while fetching user division
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* <MainNavigation></MainNavigation> */}
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
              <Button onClick={handleAddTask}>
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {isLoading ? (
              <p>Loading tasks...</p>
            ) : (
              tasks.map((task) => (
                <Card key={task.id}>
                  <CardHeader>
                    <CardTitle>{task.title}</CardTitle>
                    <CardDescription>{task.division}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Status: {task.status}</p>
                    <Progress value={task.progress} className="h-2 mt-2" />
                    <p className="text-xs text-gray-500 mt-2">
                      Last updated: {new Date(task.updatedAt).toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
