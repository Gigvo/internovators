import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
// import Navbar from "@/components/navbar";
import "react-day-picker/style.css";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
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
      </body>
    </html>
  );
}
