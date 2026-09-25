export default function Home() {
  return (
    <main className="fit-container">
      <section className="fit-section">
        {/* 
          Eta temporary content.
          Navbar thik moto render hocche kina
          age test korchi.
        */}
        <p className="fit-eyebrow">Workout Library</p>

        <h1 className="fit-display-title mt-6">
          Train With Intent.
          <br />
          Log Every Set.
        </h1>

        <p className="mt-8 max-w-2xl text-sm leading-7 text-neutral-400">
          FitLog is a dark, no-nonsense gym companion: pick a lift,
          lock it into today&apos;s plan, and watch the week&apos;s work
          add up.
        </p>

        <button
          type="button"
          className="fit-primary-button mt-8"
        >
          Browse Workouts
        </button>
      </section>
    </main>
  );
}