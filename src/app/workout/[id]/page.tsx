import Image from "next/image";
import Link from "next/link";
import WorkoutActions from "@/components/workout/WorkoutActions";

interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

interface WorkoutDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

/*
  Workout details page.
  User library theke kon workout-e click koreche,
  URL-er [id] diye oi workout-er data API theke niye ashbo.
*/

export default async function WorkoutDetailsPage({
  params,
}: WorkoutDetailsPageProps) {
  const { id } = await params;

  /*
    akhane Dynamic ID diye single workout API call korchi.
  */
  const response = await fetch(
    `https://api.abcz.workers.dev/api/fitlog/${id}`,
    {
      cache: "no-store",
    },
  );

  /*
    Invalid ID hole Next.js-er not-found page-e pathabo.
  */
 
  if (!response.ok) {
    return (
      <main className="fit-container fit-section">
        <div className="border border-neutral-800 p-10 text-center">
          <p className="fit-eyebrow">Workout Not Found</p>

          <h1 className="mt-4 text-4xl font-black uppercase">
            This workout does not exist.
          </h1>

          <Link
            href="/"
            className="fit-primary-button mt-8"
          >
            Back to workouts
          </Link>
        </div>
      </main>
    );
  }

  const workout: Workout = await response.json();

  return (
    <main className="fit-container fit-section">
     
      {/* 
        Back link:
        User easily library-te fire aste parbe.
      */}

      <Link
        href="/"
        className="mb-8 inline-flex text-xs font-bold uppercase tracking-[0.12em] text-neutral-500 transition-colors hover:text-[#ccff00]"
      >
        ← Back to library
      </Link>

      {/* 
        Main details layout:
        Desktop-e left image + right information.
        Mobile-e automatically one column hobe.
      */}

      <section className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:gap-12">
       
        {/*LEFT — WORKOUT IMAGE */}

        <div className="relative min-h-[420px] overflow-hidden border border-neutral-800 bg-[#0b0b0b] sm:min-h-[560px]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/*RIGHT — WORKOUT CONTENT */}

        <div className="flex flex-col justify-center">
          <p className="fit-eyebrow">
            Workout Details
          </p>

          {/* Workout title */}

          <h1 className="mt-5 text-5xl font-black uppercase leading-[0.92] tracking-tight sm:text-6xl">
            {workout.name}
          </h1>

          {/* Description */}

          <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-400">
            {workout.description}
          </p>

          {/* Muscle group tags */}

          <div className="mt-7 flex flex-wrap gap-2">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="border border-[#ccff00]/50 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#ccff00]"
              >
                {muscle}
              </span>
            ))}
          </div>

          {/*KEY SPECS */}

          <div className="mt-8 border-y border-neutral-800">
            <SpecRow
              label="Equipment"
              value={workout.equipment}
            />

            <SpecRow
              label="Difficulty"
              value={workout.difficulty}
            />

            <SpecRow
              label="Sets"
              value={String(workout.sets)}
            />

            <SpecRow
              label="Reps"
              value={workout.reps}
            />

            <SpecRow
              label="Duration"
              value={`${workout.duration} min`}
            />

            <SpecRow
              label="Calories"
              value={`${workout.caloriesBurned} kcal`}
            />

            <SpecRow
              label="Rating"
              value={`★ ${workout.rating}`}
            />
          </div>
        </div>
      </section>

      {/* 
          INSTRUCTIONS
     */}

      <section className="mt-16 max-w-4xl">
        <p className="fit-eyebrow">Instructions</p>

        <h2 className="mt-4 text-4xl font-black uppercase tracking-tight">
          How To Perform
        </h2>

        <ol className="mt-8 space-y-4">
          {workout.instructions.map((instruction, index) => (
            <li
              key={instruction}
              className="flex gap-5 border-b border-neutral-900 pb-5"
            >
              {/* Step number */}
              <span className="shrink-0 text-lg font-black text-[#ccff00]">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Step text */}
              <p className="text-sm leading-7 text-neutral-400">
                {instruction}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/*
          ACTION BUTTONS:
          
  akhane Interactive buttons client component-er moddhe rakha hoyeche.
  Tai server-rendered workout details clean thakche.
*/}

<WorkoutActions workout={workout} />
    </main>
  );
}

/*
  Reusable specification row.
  akhane Same design repeatedly use korar jonno
  alada component function banano holo.
*/
function SpecRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-6 border-b border-neutral-900 py-4 last:border-b-0">
      <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-600">
        {label}
      </span>

      <span className="text-right text-sm font-semibold text-neutral-200">
        {value}
      </span>
    </div>
  );
}