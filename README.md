from pathlib import Path

readme = r"""# FitLog — Workout Library & Personal Plan

FitLog is a responsive workout-library web application built with Next.js and TypeScript. Users can browse workouts from the FitLog API, view workout details, add workouts to Today's Plan, save workouts for later, and manage their personal workout plan.

## Features

- Browse workout library from the FitLog API
- Loading skeleton while workout data is being fetched
- API error state with a clear user message
- Sort workouts by:
  - Duration
  - Calories
  - Rating
- Responsive workout-card grid
- Dynamic workout details page
- Workout image, description, muscle groups, equipment, difficulty, sets, reps, duration, calories, rating, and instructions
- Add a workout to Today's Plan
- Maximum of 5 workouts in Today's Plan
- Prevent duplicate workouts in Today's Plan
- Save workouts for later
- Prevent duplicate saved workouts
- My Plan page with:
  - Today's Plan
  - Saved workouts
  - Exercise count
  - Total minutes
  - Total calories
  - View Details
  - Mark as Done
  - Remove actions
- Toast notifications for user actions
- Plan and saved-workout data persisted with `localStorage`
- Responsive layout for mobile, tablet, and desktop
- TypeScript types for workout data
- Reusable components
- Server-rendered workout details with client-side interactive actions
- Custom not-found handling for invalid workout routes

## Tech Stack

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- Next.js App Router
- Next Image
- FitLog REST API
- Browser `localStorage`
