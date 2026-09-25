import Image from "next/image";
import Link from "next/link";

/*
  Home page-er top hero section.
  
  Ei component-er main kaj holo:
  - FitLog-er main message show kora
  - User-ke workout library-te niye jawa
  - Figma-r right side-er banner image show kora
*/
export default function Hero() {
  return (
    <section className="border-b border-neutral-900">
      <div className="fit-container grid min-h-[calc(100vh-72px)] items-center gap-10 py-14 md:grid-cols-[1.05fr_0.95fr] md:py-20 lg:gap-16">
        {/* 
          Left side:
          Hero-r text content ekhane thakbe.
        */}
        <div className="max-w-3xl">
          {/* 
            Small eyebrow text.
            Requirement-e exact "WORKOUT LIBRARY" deya ache.
          */}
          <p className="fit-eyebrow">Workout Library</p>

          {/* 
            Main hero heading.
            Uppercase design use korchi jeno Figma-r
            bold display heading-er sathe match kore.
          */}
          <h1 className="fit-display-title mt-6">
            Train With Intent.
            <br />
            Log Every Set.
          </h1>

          {/* 
            Short description:
            User-ke FitLog ki kaj kore seta immediately bujhate.
          */}
          <p className="mt-8 max-w-xl text-base leading-7 text-neutral-400 sm:text-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift,
            lock it into today&apos;s plan, and watch the week&apos;s
            work add up.
          </p>

          {/* 
            CTA:
            Eta kono new route-e jabe na.
            Same Home page-er #library section-e scroll korbe.
          */}
          <Link
            href="#library"
            className="fit-primary-button mt-8"
          >
            <span>Browse Workouts</span>

            {/* 
              Simple arrow icon.
              Extra icon library install na kore Unicode arrow use korchi.
            */}
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* 
          Right side:
          User-provided banner image ekhane use korchi.
        */}
        <div className="relative overflow-hidden border border-neutral-800 bg-[#0b0b0b]">
          <Image
            src="/banner.png"
            alt="FitLog workout training banner"
            width={1200}
            height={900}
            priority
            className="h-auto w-full object-cover"
          />

          {/* 
            Image-er niche subtle lime accent line.
            Eta overall FitLog visual language-er sathe match korbe.
          */}
          <div
            className="h-1 w-full bg-[#ccff00]"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}