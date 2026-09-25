"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import type { Workout } from "@/types/workout";

/*
  Ei context-er maddhome puro application-er
  Today's Plan ebong Saved workout-er data share korbo.
*/

interface PlanContextType {
  plan: Workout[];
  saved: Workout[];

  addToPlan: (workout: Workout) => void;
  removeFromPlan: (workoutId: number) => void;

  saveWorkout: (workout: Workout) => void;
  removeFromSaved: (workoutId: number) => void;

  isInPlan: (workoutId: number) => boolean;
  isSaved: (workoutId: number) => boolean;
}

const PlanContext = createContext<PlanContextType | undefined>(
  undefined,
);

const PLAN_STORAGE_KEY = "fitlog-plan";
const SAVED_STORAGE_KEY = "fitlog-saved";

export default function PlanProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);

  /*
    Ei ref diye bujhbo localStorage theke initial data
    already load kora hoyeche kina.

    Ref use korar karon:
    Ekhane extra render trigger korar dorkar nei.
  */
  const storageLoaded = useRef(false);

  /*
    Browser render howar por localStorage theke
    previous Plan ebong Saved data load korchi.

    setTimeout use korchi jate effect-er body-te
    directly setState na hoy.
  */
  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const storedPlan = localStorage.getItem(
          PLAN_STORAGE_KEY,
        );

        const storedSaved = localStorage.getItem(
          SAVED_STORAGE_KEY,
        );

        /*
          Stored Plan valid array hole state-e load korchi.
        */
        if (storedPlan) {
          const parsedPlan: unknown = JSON.parse(storedPlan);

          if (Array.isArray(parsedPlan)) {
            setPlan(parsedPlan as Workout[]);
          }
        }

        /*
          Stored Saved data valid array hole state-e load korchi.
        */
        if (storedSaved) {
          const parsedSaved: unknown = JSON.parse(storedSaved);

          if (Array.isArray(parsedSaved)) {
            setSaved(parsedSaved as Workout[]);
          }
        }

        /*
          Ekhon theke state change hole localStorage update
          kora safe.
        */
        storageLoaded.current = true;
      } catch (error) {
        /*
          Corrupt localStorage data hole app crash korbe na.
        */
        console.error(
          "Failed to load FitLog localStorage data:",
          error,
        );

        storageLoaded.current = true;
      }
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  /*
    Plan change hole localStorage update korchi.

    Initial empty state diye jeno existing localStorage
    overwrite na hoy, tai storageLoaded check korchi.
  */
  useEffect(() => {
    if (!storageLoaded.current) {
      return;
    }

    localStorage.setItem(
      PLAN_STORAGE_KEY,
      JSON.stringify(plan),
    );
  }, [plan]);

  /*
    Saved list change hole localStorage update korchi.
  */
  useEffect(() => {
    if (!storageLoaded.current) {
      return;
    }

    localStorage.setItem(
      SAVED_STORAGE_KEY,
      JSON.stringify(saved),
    );
  }, [saved]);

  /*
    Today's Plan-e workout add korchi.

    Requirement onujayi maximum 5 ta workout.
    Same workout duplicate hobe na.
  */
  const addToPlan = useCallback((workout: Workout) => {
    setPlan((currentPlan) => {
      if (currentPlan.length >= 5) {
        return currentPlan;
      }

      const alreadyExists = currentPlan.some(
        (item) => item.id === workout.id,
      );

      if (alreadyExists) {
        return currentPlan;
      }

      return [...currentPlan, workout];
    });
  }, []);

  /*
    Today's Plan theke workout remove korchi.
  */
  const removeFromPlan = useCallback((workoutId: number) => {
    setPlan((currentPlan) =>
      currentPlan.filter((item) => item.id !== workoutId),
    );
  }, []);

  /*
    Workout Saved list-e add korchi.
    Duplicate save allow korchi na.
  */
  const saveWorkout = useCallback((workout: Workout) => {
    setSaved((currentSaved) => {
      const alreadyExists = currentSaved.some(
        (item) => item.id === workout.id,
      );

      if (alreadyExists) {
        return currentSaved;
      }

      return [...currentSaved, workout];
    });
  }, []);

  /*
    Saved list theke workout remove korchi.
  */
  const removeFromSaved = useCallback((workoutId: number) => {
    setSaved((currentSaved) =>
      currentSaved.filter((item) => item.id !== workoutId),
    );
  }, []);

  /*
    Workout currently Plan-e ache kina check korchi.
  */
  const isInPlan = useCallback(
    (workoutId: number) =>
      plan.some((item) => item.id === workoutId),
    [plan],
  );

  /*
    Workout currently Saved-e ache kina check korchi.
  */
  const isSaved = useCallback(
    (workoutId: number) =>
      saved.some((item) => item.id === workoutId),
    [saved],
  );

  /*
    Context-er shared value memoize korchi.
  */
  const value = useMemo(
    () => ({
      plan,
      saved,
      addToPlan,
      removeFromPlan,
      saveWorkout,
      removeFromSaved,
      isInPlan,
      isSaved,
    }),
    [
      plan,
      saved,
      addToPlan,
      removeFromPlan,
      saveWorkout,
      removeFromSaved,
      isInPlan,
      isSaved,
    ],
  );

  return (
    <PlanContext.Provider value={value}>
      {children}
    </PlanContext.Provider>
  );
}

/*
  Custom hook.

  Components-er moddhe easily PlanContext access korar jonno
  usePlan() use korbo.
*/
export function usePlan() {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error(
      "usePlan must be used inside PlanProvider",
    );
  }

  return context;
}