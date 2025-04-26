import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  Users2Icon,
  BookmarkIcon,
  BarChart3Icon,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
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
          </nav>
          <div className="flex gap-4">
            <Link href="/signin">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Streamline Your Organization Management
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  A comprehensive platform for managing divisions, events,
                  meetings, and resources for your organization.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button size="lg">Get Started</Button>
                  </Link>
                  <Link href="/signin">
                    <Button size="lg" variant="outline">
                      Sign In
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto w-full max-w-[500px] aspect-video bg-gray-200 rounded-xl overflow-hidden dark:bg-gray-800">
                <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                  <span className="text-sm">
                    Organization Dashboard Preview
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Key Features
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Everything you need to manage your organization efficiently
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Users2Icon className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Division Management</h3>
                <p className="text-sm text-gray-500 text-center dark:text-gray-400">
                  Manage divisions, members, and approval workflows
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <CalendarIcon className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Event Calendar</h3>
                <p className="text-sm text-gray-500 text-center dark:text-gray-400">
                  Track organization events, meetings, and trainings
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <BookmarkIcon className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Room Booking</h3>
                <p className="text-sm text-gray-500 text-center dark:text-gray-400">
                  Book and manage basecamp rooms with approval system
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <BarChart3Icon className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Progress Tracking</h3>
                <p className="text-sm text-gray-500 text-center dark:text-gray-400">
                  Monitor division tasks and progress for Internal Affairs
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
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
