/*
  FitLog API theke je workout object ashbe,
  tar exact structure ekhane define korchi.
  Eta korar karon holo TypeScript jeno amader
  wrong property name likhte na dey ebong
  VS Code proper autocomplete/suggestion dey.
*/

export interface Workout {
  id: number;

  name: string;

  image: string;

  /*
    Ekta workout-er multiple muscle group thakte pare.
    Example: ["Chest", "Arms"]
  */

  muscleGroups: string[];

  equipment: string;

  difficulty: string;

  duration: number;

  caloriesBurned: number;

  sets: number;

  reps: string;

  rating: number;

  description: string;

  /*
    Workout details page-e ei 4 ta instruction
    ordered list hisebe show korbo.
  */

  instructions: string[];
}