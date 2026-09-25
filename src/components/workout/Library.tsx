"use client";

import { useEffect, useMemo, useState } from "react";

import type { Workout } from "@/types/workout";

import { getWorkouts } from "@/lib/api";

import WorkoutCard from "./WorkoutCard";

import WorkoutSkeleton from "./WorkoutSkeleton";

/*
  Home page-er main workout library.

  Ei component:
  1. API theke workout load kore
  2. Loading state dekhay
  3. Workout sort kore
  4. Responsive card grid render kore
*/

export default function Library() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /*
    Sort dropdown-er current value ekhane rakha hocche.

    Duration-ke default rakha hoyeche,
    karon Assignment-e default Duration bola ache.
  */
  const [sortBy, setSortBy] = useState<
    "duration" | "calories" | "rating"
  >("duration");

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

  /*
    Current sort option onujayi workout list sort korchi.

    Original API array directly mutate na kore
    [...workouts] diye ekta copy niye kaj korchi.

    Eta important, karon React state-er original array
    accidentally modify kora uchit na.
  */
  const sortedWorkouts = useMemo(() => {
    return [...workouts].sort((a, b) => {
      if (sortBy === "duration") {
        return a.duration - b.duration;
      }

      if (sortBy === "calories") {
        return a.caloriesBurned - b.caloriesBurned;
      }

      /*
        Rating-er khetre highest rating age dekhabo.
      */
      return b.rating - a.rating;
    });
  }, [workouts, sortBy]);

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
          <p className="fit-eyebrow">
            Workout Library
          </p>

          <h2 className="mt-4 text-5xl font-black uppercase leading-none tracking-tight sm:text-6xl">
            The Library
          </h2>
        </div>

        <p className="max-w-md text-sm leading-6 text-neutral-500">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/*
        Sort dropdown.

        Loading-er somoy dropdown na dekhai,
        karon tokhon ekhono workout data load hoyni.
      */}
      {!loading && !error && (
        <div className="mt-8 flex justify-start md:justify-end">
          <label className="flex items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-[0.12em] text-neutral-600">
              Sort By
            </span>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(
                    event.target.value as
                      | "duration"
                      | "calories"
                      | "rating",
                  )
                }
                className="h-11 min-w-40 appearance-none border border-neutral-800 bg-[#080808] px-4 pr-10 text-[10px] font-black uppercase tracking-[0.1em] text-neutral-300 outline-none transition-colors hover:border-neutral-600 focus:border-[#ccff00]"
                aria-label="Sort workouts"
              >
                <option value="duration">
                  Duration
                </option>

                <option value="calories">
                  Calories
                </option>

                <option value="rating">
                  Rating
                </option>
              </select>

              {/*
                Native select-er default arrow-er bodole
                simple chevron icon use korchi,
                jeno Figma-style UI-r sathe match kore.
              */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500"
              >
                ↓
              </span>
            </div>
          </label>
        </div>
      )}

      {/*
        API loading state.

        Actual card ashar age skeleton show korbe,
        tai user blank screen dekhbe na.
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
          <p className="text-sm text-red-400">
            {error}
          </p>
        </div>
      )}

      {/*
        Actual workout cards.

        Desktop = 3 columns
        Tablet = 2 columns
        Mobile = 1 column

        sortedWorkouts use korchi,
        tai dropdown change korlei card order change hobe.
      */}
      {!loading && !error && (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sortedWorkouts.map((workout) => (
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