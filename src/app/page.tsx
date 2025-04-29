import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  Users2Icon,
  BookmarkIcon,
  BarChart3Icon,
} from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  return (
    <div
      className="flex flex-col min-h-screen bg-no-repeat bg-cover bg-center bg-[url('/background-oti.webp')]"
      style={{ backgroundImage: "url('/background-oti.png')" }}
    >
      <header className="backdrop-blur-md sticky top-0 w-full ">
        <div className="container flex flex-row h-16 items-center justify-between px-4 md:px-6 ">
          <Link
            href="/"
            className="ml-0 flex items-center gap-2 font-bold text-xl"
          >
            <Image
              src={"/oticonnect-logo.png"}
              alt="oti-connect"
              width={250}
              height={125}
            ></Image>
          </Link>
          <nav className="hidden md:flex gap-6 text-white">
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
            <Link
              href="/profile"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Profile
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
        <section className="w-full py-12 md:py-24 lg:py-32 ">
          <div className="container px-6 md:px-12">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-white text-3xl font-bold tracking-tighter sm:text-5xl">
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
              {/* <div className="mx-auto w-full max-w-[500px] aspect-video bg-gray-200 rounded-xl overflow-hidden dark:bg-gray-800">
                <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                  <span className="text-sm">
                    Organization Dashboard Preview
                  </span>
                </div>
              </div> */}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  Key Features
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Everything you need to manage your organization efficiently
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm bg-primary">
                <Users2Icon className="h-12 w-12 text-black" />
                <h3 className="text-black text-xl font-bold text-center">
                  Division Management
                </h3>
                <p className="text-sm text-gray-500 text-center dark:text-gray-700">
                  Manage divisions, members, and approval workflows
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm bg-primary">
                <CalendarIcon className="h-12 w-12 text-black" />
                <h3 className="text-xl font-bold text-black">Event Calendar</h3>
                <p className="text-sm text-gray-500 text-center dark:text-gray-700">
                  Track organization events, meetings, and trainings
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm bg-primary">
                <BookmarkIcon className="h-12 w-12 text-black" />
                <h3 className="text-xl font-bold text-black">Room Booking</h3>
                <p className="text-sm text-gray-500 text-center dark:text-gray-700">
                  Book and manage basecamp rooms with approval system
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm bg-primary">
                <BarChart3Icon className="h-12 w-12 text-black" />
                <h3 className="text-xl font-bold text-black">
                  Progress Tracking
                </h3>
                <p className="text-sm text-gray-500 text-center dark:text-gray-700">
                  Monitor division tasks and progress for Internal Affairs
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
