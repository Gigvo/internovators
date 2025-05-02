"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import "react-day-picker/style.css";
import Footer from "@/components/footer";
import { AuthProvider } from "../contexts/AuthContext";
import { Plus_Jakarta_Sans } from "next/font/google";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // choose the weights you need
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated (e.g., by checking for a token in localStorage)
    const token = localStorage.getItem("jwt");
    setIsAuthenticated(!!token);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsAuthenticated(false);
    router.push("/signin");
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${plusJakartaSans.variable}`}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <nav className="bg-gray-100 dark:bg-gray-800 p-4 shadow-md">
              <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold text-primary">
                  OTI Connect
                </Link>
                <div className="flex items-center gap-6">
                  <Link
                    href="/calendar"
                    className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition"
                  >
                    Calendar
                  </Link>
                  <Link
                    href="/booking"
                    className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition"
                  >
                    Booking
                  </Link>
                  <Link
                    href="/feedback"
                    className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition"
                  >
                    Feedback
                  </Link>
                  <Link
                    href="/internal-affairs"
                    className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition"
                  >
                    Internal Affairs
                  </Link>
                  {isAuthenticated ? (
                    <>
                      <Link
                        href="/profile"
                        className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="text-red-500 hover:underline"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/signin"
                        className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/signup"
                        className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </nav>
            {children}
            <Footer />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
