import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  return (
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
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
