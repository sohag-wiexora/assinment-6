import Hero from "@/components/workout/Hero";

export default function Home() {
  return (
    <main>
      {/* 
        Home page-er first visual section.
        Hero component alada kore rakhar karon holo
        page.tsx-ke clean ebong maintainable rakha.
      */}
      <Hero />

      {/* 
        Ekhon library section-er placeholder.
        
        Hero-r "Browse Workouts" button-er href:
        #library
        
        Tai ei id-ta ekhane use korchi.
        Pore actual API workout grid ekhane bosbe.
      */}
      <section
        id="library"
        className="fit-container fit-section"
      >
        <p className="fit-eyebrow">Workout Library</p>

        <h2 className="mt-4 text-4xl font-black uppercase tracking-tight sm:text-5xl">
          The Library
        </h2>

        <p className="mt-4 text-sm text-neutral-500">
          Twelve lifts covering every major muscle group.
        </p>

        {/* 
          Eta temporary placeholder.
          Next step-e ekhane actual API theke
          workout cards render korbo.
        */}
        <div className="mt-10 border border-dashed border-neutral-800 p-10 text-center text-sm text-neutral-600">
          Workout cards will appear here.
        </div>
      </section>
    </main>
  );
}