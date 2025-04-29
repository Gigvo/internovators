"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function MainNavigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/calendar", label: "Calendar" },
    { href: "/booking", label: "Room Booking" },
    { href: "/feedback", label: "OtiBersuara" },
    { href: "/internal-affairs", label: "Internal Affairs" },
  ];

  return (
    <div className="container flex h-16 items-center justify-between px-4 md:px-6">
      <Link href="/" className="flex items-center gap-2 font-bold text-xl z-10">
        <span className="text-accent">OrgManager</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-accent",
              pathname === item.href ? "text-accent" : "text-muted-foreground"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Mobile Navigation */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" className="mr-2">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[80%] sm:w-[350px] pt-10">
          <div className="flex flex-col gap-6 mt-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-base font-medium transition-colors hover:text-accent flex items-center",
                  pathname === item.href
                    ? "text-accent"
                    : "text-muted-foreground"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Alternative Mobile Navigation - Bottom Tab Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-primary border-t border-border md:hidden z-50">
        <div className="grid grid-cols-5 h-16">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center text-xs font-medium transition-colors",
                pathname === item.href
                  ? "text-accent border-t-2 border-accent"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
          <AvatarFallback className="bg-accent/20 text-accent">
            JD
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
