import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import PlanProvider from "@/components/plan/PlanProvider";
import Footer from "@/components/layout/Footer";

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
       n PlanProvider পুরো app-er shared workout state manage korbe.
        Tai Navbar, Details ebong My Plan sobai same data pabe.
      */}
        <PlanProvider>
        {/* 
          Navbar ekhane rakhar karon holo
          eta website-er prottek page-e automatically show korbe.
        */}
        <Navbar />

        {/* 
          children-er moddhe current page-er content render hobe.
        */}
          
        

        {children}
         <Footer />
         </PlanProvider>
      </body>
    </html>
  );
}