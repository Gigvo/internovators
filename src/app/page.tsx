import Link from "next/link";
import { Button } from "@/components/ui/button";
// import {
//   CalendarIcon,
//   Users2Icon,
//   BookmarkIcon,
//   BarChart3Icon,
// } from "lucide-react";
// import Image from "next/image";
import { MainNavigation } from "@/components/layout/main-navigation";

export default function HomePage() {
  return (
    <div
      className="flex flex-col min-h-screen bg-no-repeat bg-cover bg-center bg-[url('/background-oti.webp')]"
      style={{ backgroundImage: "url('/background-oti.webp')" }}
    >
      {/* <header className="backdrop-blur-md sticky top-0 w-full ">
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
        
      </header> */}
      <MainNavigation></MainNavigation>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 ">
          <div className="container px-6 md:px-12">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-white text-3xl font-bold tracking-tighter sm:text-5xl">
                  Streamline OmahTI, all in One Place
                </h1>

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
      </main>
    </div>
  );
}
