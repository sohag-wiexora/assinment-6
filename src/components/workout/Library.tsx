"use client";

import { useEffect, useState } from "react";
import type { Workout } from "@/types/workout";
import { getWorkouts } from "@/lib/api";
import WorkoutCard from "./WorkoutCard";
import WorkoutSkeleton from "./WorkoutSkeleton";

/*
  Home page-er main workout library.

  Ei component client-side data fetch korbe,
  tai user loading state clearly dekhte parbe.
*/
export default function Library() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    /*
      Component mount howar por API call korchi.
    */
    async function loadWorkouts() {
      try {
        setLoading(true);
        setError("");

        const data = await getWorkouts();

        setWorkouts(data);
      } catch (error) {
        /*
          API fail korle user-ke meaningful message dekhabo.
        */
        console.error("Failed to load workouts:", error);

        setError(
          "Workout library load kora jacche na. Please try again.",
        );
      } finally {
        /*
          Success hok ba error hok,
          loading state sesh korte hobe.
        */
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  return (
    <section
      id="library"
      className="fit-container fit-section"
    >
      {/* 
        Library heading area.
      */}
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="fit-eyebrow">Workout Library</p>

          <h2 className="mt-4 text-5xl font-black uppercase leading-none tracking-tight sm:text-6xl">
            The Library
          </h2>
        </div>

        <p className="max-w-md text-sm leading-6 text-neutral-500">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* 
        API loading state.
        12 ta actual card ashar age skeleton show korbe.
      */}
      {loading && (
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <WorkoutSkeleton key={index} />
          ))}
        </div>
      )}

      {/* 
        API error state.
      */}
      {!loading && error && (
        <div className="mt-12 border border-red-900/60 bg-red-950/20 p-8">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* 
        Actual workout cards.
        
        Desktop = 3 columns
        Tablet = 2 columns
        Mobile = 1 column
      */}
      {!loading && !error && (
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
            />
          ))}
        </div>
      )}
    </section>
  );
}