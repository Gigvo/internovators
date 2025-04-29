"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";

export function MainNavigation() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown when route changes
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [pathname]);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/calendar", label: "Calendar" },
    { href: "/booking", label: "Room Booking" },
    { href: "/feedback", label: "OtiBersuara" },
    { href: "/internal-affairs", label: "Internal Affairs" },
  ];

  return (
    <header className="backdrop-blur-md sticky top-0 w-full z-20">
      <div className="container flex flex-row h-16 items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl z-10"
        >
          <Image
            src={"/oticonnect-logo.png"}
            alt="oti-connect"
            width={250}
            height={125}
          ></Image>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Dropdown Navigation with Hamburger Icon */}
        <div className="md:hidden relative" ref={dropdownRef}>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full hover:bg-background/10"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 rounded-md bg-card border border-border shadow-lg z-50">
              <div className="py-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "block px-4 py-3 text-sm transition-colors hover:bg-black",
                      pathname === item.href
                        ? "bg-black text-white font-medium"
                        : "text-foreground"
                    )}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage
              src="/person-placeholder.jpeg?height=40&width=40"
              alt="User"
            />
            <AvatarFallback className="bg-background text-primary">
              JD
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
