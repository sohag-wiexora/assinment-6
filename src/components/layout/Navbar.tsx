"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

/*
  Navbar client component korechi karon
  current URL check kore active navigation link
  alada style-e dekhate hobe.
*/
export default function Navbar() {
  const pathname = usePathname();

  /*
    Current page-er path check korchi.

    "/" hole Workout active.
    "/my-plan" hole My Plan active.
  */
  const isWorkoutActive = pathname === "/";
  const isPlanActive = pathname === "/my-plan";

  /*
    Ekhon counter 0 diye rakhlam.
    Pore localStorage/state setup korar somoy
    ei duita live count diye replace korbo.
  */
  const planCount = 0;
  const savedCount = 0;

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800/80 bg-[#050505]/95 backdrop-blur-md">
      <nav
        className="fit-container flex min-h-[72px] items-center justify-between gap-6"
        aria-label="Main navigation"
      >
        {/* 
          Left side:
          Logo click korle user Home page-e fire jabe.
        */}
        <Link
          href="/"
          className="shrink-0"
          aria-label="FitLog home"
        >
          <Image
            src="/logo.png"
            alt="FitLog"
            width={100}
            height={32}
            priority
            className="h-auto w-[100px] object-contain sm:w-[120px]"
          />
        </Link>

        {/* 
          Middle:
          Main navigation links ekhane rakhlam.
          Desktop-e center position-e thakbe.
        */}
        <div className="hidden items-center gap-2 sm:flex">
          <Link
            href="/"
            className={`px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] transition-colors ${
              isWorkoutActive
                ? "bg-[#ccff00] text-black"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={`px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] transition-colors ${
              isPlanActive
                ? "bg-[#ccff00] text-black"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        {/* 
          Right side:
          Plan ebong Saved badge.

          Duita badge-i My Plan page-e niye jabe.
        */}
        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-full bg-[#ccff00] px-3 py-2 text-[11px] font-black uppercase tracking-[0.08em] text-black transition-transform hover:-translate-y-0.5"
          >
            <span>Plan</span>
            <span>{planCount}</span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-full border border-[#ccff00]/70 px-3 py-2 text-[11px] font-black uppercase tracking-[0.08em] text-[#ccff00] transition-colors hover:bg-[#ccff00] hover:text-black"
          >
            <span>Saved</span>
            <span>{savedCount}</span>
          </Link>
        </div>
      </nav>

      {/* 
        Mobile navigation:
        Small screen-e desktop-er middle navigation hidden thake,
        tai niche compact navigation show korchi.
      */}
      <div className="border-t border-neutral-900 sm:hidden">
        <div className="fit-container grid grid-cols-2">
          <Link
            href="/"
            className={`py-3 text-center text-[11px] font-bold uppercase tracking-[0.12em] ${
              isWorkoutActive
                ? "bg-[#ccff00] text-black"
                : "text-neutral-400"
            }`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={`py-3 text-center text-[11px] font-bold uppercase tracking-[0.12em] ${
              isPlanActive
                ? "bg-[#ccff00] text-black"
                : "text-neutral-400"
            }`}
          >
            My Plan
          </Link>
        </div>
      </div>
    </header>
  );
}