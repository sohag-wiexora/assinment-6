import type { Workout } from "@/types/workout";

/*
  API URL ek jaygay rakhlam.
  Pore API URL change hole project-er
  onno file search kore change korte hobe na.
*/

export const FITLOG_API =
  "https://api.abcz.workers.dev/api/fitlog";

/*
  Home page-er Library-te sob workout anar function.
  Promise<Workout[]> mane:
  ei function future-e Workout object-er array return korbe.
*/

export async function getWorkouts(): Promise<Workout[]> {
  const response = await fetch(FITLOG_API);

  /*
    Server theke successful response na pele
    amra silently empty data dekhabo na.
    Error throw korbo, jeno UI-te proper error state
    handle korte pari.
  */

  if (!response.ok) {
    throw new Error("Failed to fetch FitLog workouts.");
  }

  const data: Workout[] = await response.json();

  return data;
}

/*
  Details page-e specific workout-er data anar function.
  Example:
  /api/fitlog/1
  /api/fitlog/2
  id onujaiye specific workout return korbe.
*/

export async function getWorkoutById(
  id: number,
): Promise<Workout> {
  const response = await fetch(`${FITLOG_API}/${id}`);

  /*
    ID wrong hole ba API error hole
    proper error throw korchi.
  */

  if (!response.ok) {
    throw new Error("Workout not found.");
  }

  const data: Workout = await response.json();

  return data;
}