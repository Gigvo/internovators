import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
// import Navbar from "@/components/navbar";
import "react-day-picker/style.css";
import Footer from "@/components/footer";
import { AuthProvider } from "../contexts/AuthContext";
import { Plus_Jakarta_Sans } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // choose the weights you need
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "OTI Connect",
  icons: {
    icon: "/icon/icon.png",
  },
  description:
    "A comprehensive platform for managing divisions, events, meetings, and resources for OmahTI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
            {/* <Navbar></Navbar> */}
            {children}
            <Footer />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
