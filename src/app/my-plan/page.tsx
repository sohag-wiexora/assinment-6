"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { usePlan } from "@/components/plan/PlanProvider";
import type { Workout } from "@/types/workout";

/*
  akhane My Plan page-er main kaj holo:
  1. Today's Plan show kora
  2. Saved workout show kora
  3. Plan-er live metrics calculate kora
  4. Workout remove kora
  5. Workout done mark kora
*/

type Tab = "plan" | "saved";

export default function MyPlanPage() {
  const {
    plan,
    saved,
    removeFromPlan,
    removeFromSaved,
  } = usePlan();

  /*
    akhane ami Default tab Today's Plan rakhci.
  */
  const [activeTab, setActiveTab] = useState<Tab>("plan");

  /*
    Toast message-er state.
    Button click korar por short notification show korbo.
  */
  const [toast, setToast] = useState("");

  /*
    Toast show korar reusable function.
    2.5 second por automatically hide hoye jabe.
  */
const showToast = (message: string) => {
  /*
    akhane Button click korle short toast notification show korchi.
    User-ke action successful hoyeche kina quickly bujhate help korbe.
  */
  setToast(message);

  /*
    2.5 second por toast automatically hide hoye jabe.
  */
  window.setTimeout(() => {
    setToast("");
  }, 2500);
};

  /*
    akhane ami Current Today's Plan theke total exercise count,
    total duration and total calories calculate korchi.
  */
  const totalExercises = plan.length;

  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0,
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0,
  );

  /*
    Active tab onujayi current list select korchi.
  */
  const currentWorkouts = activeTab === "plan" ? plan : saved;

  /*
    akhane ata holo Plan-er workout remove korar action.
  */
  const handleRemoveFromPlan = (workoutId: number) => {
    removeFromPlan(workoutId);
    showToast("Removed from today's plan");
  };

  /*
    ata holo Saved workout remove korar action.
  */
  const handleRemoveFromSaved = (workoutId: number) => {
    removeFromSaved(workoutId);
    showToast("Removed from saved");
  };

  /*
    Akhane "Mark as Done" click korle workout-ke
    Today's Plan theke remove kore dicchi.
    Assignment requirement onujayi toast-o show korchi.
  */
  const handleMarkAsDone = (workoutId: number) => {
    removeFromPlan(workoutId);
    showToast("Workout marked as done");
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* 
        Page heading section.
      */}
      <section className="fit-container fit-section">
        <div className="max-w-4xl">
          <p className="fit-eyebrow">YOUR WORKOUT LOG</p>

          <h1 className="mt-4 text-6xl font-black uppercase leading-none tracking-tight sm:text-7xl lg:text-8xl">
            My Plan
          </h1>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-neutral-500 sm:text-base">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Akhane
          Metrics Summary:
          Exercises / Minutes / Calories
          Egulo plan-er sathe live update hobe.
        */}
        <div className="mt-12 grid gap-px border border-neutral-800 bg-neutral-800 sm:grid-cols-3">
          <MetricCard
            label="Exercises"
            value={totalExercises}
          />

          <MetricCard
            label="Minutes"
            value={totalMinutes}
          />

          <MetricCard
            label="Calories"
            value={totalCalories}
          />
        </div>
      </section>

      {/* 
        Main workout list area.
      */}
      <section className="fit-container pb-24">
        {/* 
          Two tabs:
          Today's Plan
          Saved
        */}
        <div className="flex border-b border-neutral-800">
          <button
            type="button"
            onClick={() => setActiveTab("plan")}
            className={`border-b-2 px-5 py-4 text-xs font-bold uppercase tracking-[0.16em] transition ${
              activeTab === "plan"
                ? "border-[#ccff00] text-[#ccff00]"
                : "border-transparent text-neutral-500 hover:text-white"
            }`}
          >
            Today&apos;s Plan {plan.length}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("saved")}
            className={`border-b-2 px-5 py-4 text-xs font-bold uppercase tracking-[0.16em] transition ${
              activeTab === "saved"
                ? "border-[#ccff00] text-[#ccff00]"
                : "border-transparent text-neutral-500 hover:text-white"
            }`}
          >
            Saved {saved.length}
          </button>
        </div>

        {/* Akhane
          Current tab-e kon workout ache
          seta ekhane render korbo.
        */}
        {currentWorkouts.length === 0 ? (
          <EmptyState activeTab={activeTab} />
        ) : (
          <div className="mt-8 space-y-4">
            {currentWorkouts.map((workout) => (
              <PlanWorkoutCard
                key={workout.id}
                workout={workout}
                isSavedTab={activeTab === "saved"}
                onRemove={
                  activeTab === "plan"
                    ? handleRemoveFromPlan
                    : handleRemoveFromSaved
                }
                onDone={handleMarkAsDone}
              />
            ))}
          </div>
        )}
      </section>

      {/* 
        Toast notification.
        Kono action hole screen-er niche notification show hobe.
      */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 border border-[#ccff00]/40 bg-[#ccff00] px-5 py-3 text-xs font-black uppercase tracking-[0.12em] text-black shadow-2xl">
          {toast}
        </div>
      )}
    </main>
  );
}

/*
  Reusable metric card component.
*/
function MetricCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="bg-[#080808] p-6 sm:p-8">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">
        {label}
      </p>

      <p className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
        {value}
      </p>
    </div>
  );
}

/*
  Empty state component.
  Jokhon Today's Plan ba Saved list empty thakbe,
  tokhon ei section show korbe.
*/
function EmptyState({ activeTab }: { activeTab: Tab }) {
  return (
    <div className="mt-8 border border-neutral-800 bg-[#050505] px-6 py-20 text-center sm:px-10">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ccff00]">
        Nothing Here Yet
      </p>

      <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-neutral-500">
        {activeTab === "plan"
          ? "Browse the library and add a lift to get today moving."
          : "Save a workout from the library and it will appear here."}
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex min-h-12 items-center justify-center bg-[#ccff00] px-7 text-xs font-black uppercase tracking-[0.12em] text-black transition hover:bg-white"
      >
        Go to workouts
      </Link>
    </div>
  );
}

/*
  Individual workout card.

  Ei card-e ami:
  - thumbnail
  - title
  - equipment
  - duration
  - calories
  - rating
  - View Details
  - Mark as Done
  - Remove X
  show korbo.
*/
function PlanWorkoutCard({
  workout,
  isSavedTab,
  onRemove,
  onDone,
}: {
  workout: Workout;
  isSavedTab: boolean;
  onRemove: (workoutId: number) => void;
  onDone: (workoutId: number) => void;
}) {
  return (
    <article className="border border-neutral-800 bg-[#070707] p-4 transition hover:border-neutral-700 sm:p-5">
      <div className="flex flex-col gap-5 md:flex-row md:items-center">
       {/*
        Akhane Next.js Image component use korchi jate
        image automatically optimize hoy ebong
        unnecessary img warning na thake.
      */}
        <div className="h-48 w-full shrink-0 overflow-hidden bg-neutral-900 md:h-32 md:w-48">
          <Image
          src={workout.image}
          alt={workout.name}
          width={640}
          height={480}
          className="h-full w-full object-cover"
          />
        </div>

        {/* 
          Workout information.
        */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap gap-2">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="border border-neutral-700 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-neutral-400"
              >
                {muscle}
              </span>
            ))}
          </div>

          <h2 className="mt-3 text-xl font-black uppercase leading-tight tracking-tight sm:text-2xl">
            {workout.name}
          </h2>

          <p className="mt-2 text-sm text-neutral-500">
            {workout.equipment}
          </p>

          {/* 
            Stats row.
          */}
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-bold uppercase tracking-[0.08em] text-neutral-400">
            <span>◷ {workout.duration} min</span>

            <span>🔥 {workout.caloriesBurned} kcal</span>

            <span>★ {workout.rating}</span>
          </div>
        </div>

        {/* 
          Action buttons.
        */}
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row md:flex-col">
          <Link
            href={`/workout/${workout.id}`}
            className="inline-flex min-h-11 items-center justify-center border border-neutral-700 px-5 text-[10px] font-black uppercase tracking-[0.12em] text-white transition hover:border-[#ccff00] hover:text-[#ccff00]"
          >
            View Details
          </Link>

          {!isSavedTab && (
            <button
              type="button"
              onClick={() => onDone(workout.id)}
              className="inline-flex min-h-11 items-center justify-center bg-[#ccff00] px-5 text-[10px] font-black uppercase tracking-[0.12em] text-black transition hover:bg-white"
            >
              ✓ Mark as Done
            </button>
          )}

          <button
            type="button"
            onClick={() => onRemove(workout.id)}
            aria-label={`Remove ${workout.name}`}
            className="inline-flex min-h-11 items-center justify-center border border-red-900/60 px-5 text-[10px] font-black uppercase tracking-[0.12em] text-red-400 transition hover:border-red-500 hover:text-red-300"
          >
            ✕ Remove
          </button>
        </div>
      </div>
    </article>
  );
}