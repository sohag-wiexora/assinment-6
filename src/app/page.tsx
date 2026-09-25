import { getWorkouts } from "@/lib/api";

export default async function Home() {
  /*
    API theke sob workout fetch korchi.

    Ekhon sudhu test korchi je
    amader API layer thik moto kaj korche kina.
  */
  const workouts = await getWorkouts();

  return (
    <main className="fit-container">
      <section className="fit-section">
        <p className="fit-eyebrow">API Test</p>

        <h1 className="mt-6 text-4xl font-bold">
          FitLog Workouts
        </h1>

        <p className="mt-4 text-neutral-400">
          Total workouts: {workouts.length}
        </p>

        <div className="mt-8 space-y-4">
          {workouts.map((workout) => (
            <div
              key={workout.id}
              className="border border-neutral-800 p-5"
            >
              <h2 className="text-xl font-bold">
                {workout.name}
              </h2>

              <p className="mt-2 text-sm text-neutral-400">
                {workout.equipment}
              </p>

              <p className="mt-2 text-sm text-neutral-400">
                {workout.duration} min ·{" "}
                {workout.caloriesBurned} kcal ·{" "}
                ⭐ {workout.rating}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}