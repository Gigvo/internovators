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
  weight: ["400", "500", "700"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null); // Store user role
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setIsAuthenticated(!!token);

    if (token) {
      // Fetch user role from the backend
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setUserRole(data.role))
        .catch((err) => console.error("Error fetching user role:", err));
    }
  }, []);

  useEffect(() => {
    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsAuthenticated(false);
    setUserRole(null);
    router.push("/signin");
  };

  const handleGoogleSignIn = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
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
                  {isAuthenticated ? (
                    <>
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
                      {userRole === "Division Head" ||
                      userRole === "CEO" ||
                      userRole === "CFO" ||
                      userRole === "Internal Affairs" ? (
                        <Link
                          href="/internal-affairs"
                          className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition"
                        >
                          Internal Affairs
                        </Link>
                      ) : null}
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
                      <button
                        onClick={handleGoogleSignIn}
                        className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition"
                      >
                        Sign In
                      </button>
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
