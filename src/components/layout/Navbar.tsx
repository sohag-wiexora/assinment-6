"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { usePlan } from "@/components/plan/PlanProvider";

/*
  Navbar application-er shared plan state use korbe.

  Tai workout add/save korle navbar counter-o
  automatically update hobe.
*/
export default function Navbar() {
  const pathname = usePathname();

  const { plan, saved } = usePlan();

  /*
    Current page check kore active navigation link
    আলাদা styling dekhano hocche.
  */
  const isWorkoutPage =
    pathname === "/" || pathname.startsWith("/workout");

  const isPlanPage = pathname.startsWith("/my-plan");

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-900 bg-[#050505]/95 backdrop-blur-md">
      <div className="mx-auto flex min-h-20 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* =========================
            LEFT — LOGO
           ========================= */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3"
        >
          <Image
            src="/logo.png"
            alt="FitLog logo"
            width={42}
            height={42}
            className="h-9 w-9 object-contain sm:h-10 sm:w-10"
          />

          <span className="hidden text-lg font-black uppercase tracking-[0.08em] text-white sm:block">
            FITLOG
          </span>
        </Link>

        {/* =========================
            CENTER — NAVIGATION
           ========================= */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className={`px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] transition-colors sm:px-4 ${
              isWorkoutPage
                ? "bg-[#ccff00] text-black"
                : "text-neutral-500 hover:text-white"
            }`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={`px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] transition-colors sm:px-4 ${
              isPlanPage
                ? "bg-[#ccff00] text-black"
                : "text-neutral-500 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* =========================
            RIGHT — LIVE COUNTERS
           ========================= */}
        <div className="flex shrink-0 items-center gap-2">
          {/* 
            Plan badge:
            Today's Plan-er total workout count show korbe.
            Badge click korle My Plan page-e jabe.
          */}
          <Link
            href="/my-plan"
            className="rounded-full bg-[#ccff00] px-3 py-2 text-[9px] font-black uppercase tracking-[0.08em] text-black transition-transform hover:scale-105 sm:px-4"
          >
            Plan {plan.length}
          </Link>

          {/* 
            Saved badge:
            Saved workout-er live count show korbe.
            Requirement onujayi outline style use korchi.
          */}
          <Link
            href="/my-plan"
            className="rounded-full border border-neutral-600 px-3 py-2 text-[9px] font-black uppercase tracking-[0.08em] text-neutral-300 transition-colors hover:border-[#ccff00] hover:text-[#ccff00] sm:px-4"
          >
            Saved {saved.length}
          </Link>
        </div>
      </div>
    </header>
  );
}