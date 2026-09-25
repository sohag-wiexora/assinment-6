/*
  API data load howar age user-ke blank screen na dekhiye
  ei skeleton cards show korbo.

  Eta Assignment-er loading requirement fulfill korbe.
*/
export default function WorkoutSkeleton() {
  return (
    <div
      className="animate-pulse border border-neutral-800 bg-[#0b0b0b]"
      aria-hidden="true"
    >
      {/* Fake image */}
      <div className="aspect-[4/3] bg-neutral-900" />

      <div className="p-5">
        {/* Fake tags */}
        <div className="flex gap-2">
          <div className="h-5 w-14 bg-neutral-900" />
          <div className="h-5 w-16 bg-neutral-900" />
        </div>

        {/* Fake title */}
        <div className="mt-5 h-6 w-3/4 bg-neutral-900" />

        {/* Fake equipment */}
        <div className="mt-3 h-4 w-1/2 bg-neutral-900" />

        {/* Fake stats */}
        <div className="mt-6 h-4 w-full bg-neutral-900" />
      </div>
    </div>
  );
}