import Image from "next/image";
import Link from "next/link";
import type { Workout } from "@/types/workout";

interface WorkoutCardProps {
  workout: Workout;
}

/*
  Ekta single workout-er complete card.
  Library-te onek gula workout thakbe,
  tai card design-ta reusable component banacchi.
*/

export default function WorkoutCard({
  workout,
}: WorkoutCardProps) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block border border-neutral-800 bg-[#0b0b0b] transition-colors duration-200 hover:border-[#ccff00]/60"
    >
      {/* 
        Workout image area.
        Fixed aspect ratio use korchi jeno
        sob card-er image same size thake.
      */}

      <div className="relative aspect-[4/3] overflow-hidden bg-[#111]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* 
          Image-er upor subtle dark overlay.
          Text readability ebong Figma-r dark visual maintain korar jonno.
        */}

        <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/0" />
      </div>

      {/* 
        Card-er text/content section.
      */}

      <div className="p-5">
        
        {/* 
          Muscle group/category tags.
          API-te muscleGroups array hisebe ache.
        */}

        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="border border-[#ccff00]/40 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#ccff00]"
            >
              {muscle}
            </span>
          ))}
        </div>

        {/* Workout name */}

        <h3 className="mt-4 text-xl font-black uppercase leading-none tracking-tight text-white">
          {workout.name}
        </h3>

        {/* Equipment */}

        <p className="mt-3 text-sm text-neutral-500">
          {workout.equipment}
        </p>

        {/* 
          Stats row:
          duration / calories / rating
        */}

        <div className="mt-5 flex items-center gap-4 border-t border-neutral-900 pt-4 text-xs text-neutral-400">
          <span>{workout.duration} min</span>

          <span>{workout.caloriesBurned} kcal</span>

          <span className="ml-auto text-[#ccff00]">
            ★ {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}