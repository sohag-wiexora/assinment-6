import type { Metadata } from "next";
import "./globals.css";

/*
  Ei metadata browser tab ebong search engine-er jonno use hobe.
  Assignment-er project name-ke ekhanei centralize korchi.
*/
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
      <body>{children}</body>
    </html>
  );
}