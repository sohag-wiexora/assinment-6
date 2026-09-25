import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description:
    "FitLog is a dark, no-nonsense workout library for planning and tracking your training.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* 
          Navbar ekhane rakhar karon holo
          eta website-er prottek page-e automatically show korbe.
        */}
        <Navbar />

        {/* 
          children-er moddhe current page-er content render hobe.
        */}
        {children}
      </body>
    </html>
  );
}