import Image from "next/image";
import Link from "next/link";

/*
  Footer-er moddhe brand identity ebong copyright information
  rakha hocche, jeno shob page-e same footer reuse kora jay.
*/
export default function Footer() {
  return (
    <footer className="border-t border-neutral-900 bg-[#050505]">
      <div className="mx-auto flex min-h-32 max-w-[1440px] flex-col items-start justify-between gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-center lg:px-8">
        {/* =========================
            LEFT — BRAND
           ========================= */}

        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <Image
            src="/logo.png"
            alt="FitLog logo"
            width={38}
            height={38}
            className="h-8 w-8 object-contain"
          />

          <span className="text-sm font-black uppercase tracking-[0.14em] text-white">
            FITLOG
          </span>
        </Link>

        {/* =========================
            RIGHT — COPYRIGHT
           ========================= */}

        <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-neutral-600 md:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}