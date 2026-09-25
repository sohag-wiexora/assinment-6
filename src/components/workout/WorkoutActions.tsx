"use client";

import { useEffect, useRef, useState } from "react";

import type { Workout } from "@/types/workout";

import { usePlan } from "@/components/plan/PlanProvider";

import Toast from "@/components/ui/Toast";

interface WorkoutActionsProps {
  workout: Workout;
}

/*
  Detail page-er Add / Save button-er complete interaction
  ekhane manage korbo.

  Main details page server component thakbe,
  shudhu interactive part client component hobe.
*/

export default function WorkoutActions({
  workout,
}: WorkoutActionsProps) {
  const {
    addToPlan,
    saveWorkout,
    isInPlan,
    isSaved,
  } = usePlan();

  const [toastMessage, setToastMessage] = useState("");

  /*
    Browser-er window.setTimeout number return kore.
    Tai ref-er type number | null rakha hoyeche.
  */
  const toastTimerRef = useRef<number | null>(null);

  /*
    Component unmount hole pending toast timer cleanup korbo.
  */
  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  /*
    Toast dekhানোর reusable helper.

    Notun toast ashle previous timer clear kore
    notun 2.5 second timer start korbe.
  */
  const showToast = (message: string) => {
    setToastMessage(message);

    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage("");
      toastTimerRef.current = null;
    }, 2500);
  };

  /*
    Today's Plan-e workout add korchi.

    PlanProvider duplicate ebong 5-item limit
    automatically handle korbe.
  */
  const handleAddToPlan = () => {
    if (isInPlan(workout.id)) {
      showToast("Already in today's plan");
      return;
    }

    addToPlan(workout);
    showToast("Added to today's plan");
  };

  /*
    Workout Saved list-e add korchi.
  */
  const handleSave = () => {
    if (isSaved(workout.id)) {
      showToast("Already saved");
      return;
    }

    saveWorkout(workout);
    showToast("Saved for later");
  };

  return (
    <>
      <section className="mt-12 flex flex-col gap-3 sm:flex-row">
        {/* Add to today's plan button */}
        <button
          type="button"
          onClick={handleAddToPlan}
          disabled={isInPlan(workout.id)}
          className="fit-primary-button disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span>
            {isInPlan(workout.id)
              ? "✓ Already in plan"
              : "＋ Add to today's plan"}
          </span>
        </button>

        {/* Save for later button */}
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaved(workout.id)}
          className="inline-flex min-h-12 items-center justify-center border border-neutral-700 px-6 text-xs font-black uppercase tracking-[0.1em] text-white transition-colors hover:border-[#ccff00] hover:text-[#ccff00] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span>
            {isSaved(workout.id)
              ? "✓ Saved"
              : "☆ Save for later"}
          </span>
        </button>
      </section>

      {/* Success / information toast */}
      {toastMessage && <Toast message={toastMessage} />}
    </>
  );
}