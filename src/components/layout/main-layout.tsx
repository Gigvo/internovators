import type React from "react";
import Link from "next/link";
import { MainNavigation } from "./main-navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border bg-primary sticky top-0 z-40">
        <MainNavigation />
      </header>
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <footer className="border-t border-border py-6 bg-primary hidden md:block">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-4 md:px-6">
          <p className="text-sm text-muted-foreground">
            © 2023 OrgManager. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground hover:text-accent"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground hover:text-accent"
            >
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
