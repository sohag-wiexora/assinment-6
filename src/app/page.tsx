import Hero from "@/components/workout/Hero";
import Library from "@/components/workout/Library";

export default function Home() {
  return (
    <main>
      {/* Hero section homepage-er main introduction */}
      <Hero />

      {/* API theke workout niye library-te cards show korbe */}
      <Library />
    </main>
  );
}