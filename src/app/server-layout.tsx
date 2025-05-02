import type { Metadata } from "next";
import RootLayout from "./layout";

export const metadata: Metadata = {
  title: "OTI Connect",
  icons: {
    icon: "/icon/icon.png",
  },
  description:
    "A comprehensive platform for managing divisions, events, meetings, and resources for OmahTI",
};

export default function ServerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootLayout>{children}</RootLayout>;
}
