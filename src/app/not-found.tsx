import Link from "next/link";

/*
  Ei component ta invalid/non-existing route-er jonno
  custom 404 page hisebe kaj korbe.

  Next.js App Router automatically ei page ta use korbe
  jokhon kono valid route khuje pawa jabe na.
*/
export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-20">
      <section className="w-full max-w-3xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
          FitLog / Error
        </p>

        <h1 className="mt-6 text-[clamp(7rem,22vw,15rem)] font-black leading-none tracking-[-0.08em] text-white">
          404
        </h1>

        <h2 className="mt-8 text-2xl font-black uppercase text-white sm:text-3xl">
          Page not found.
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base">
          The workout or page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex h-12 items-center justify-center bg-[#ccff00] px-7 text-xs font-black uppercase tracking-wider text-black"
        >
          Back to workouts
        </Link>
      </section>
    </main>
  );
}