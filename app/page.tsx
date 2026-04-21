import { HomeBackgroundBagua } from "@/components/home/home-background-bagua";
import { HomeHero } from "@/components/home/home-hero";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(130,149,255,0.16),transparent_28%),radial-gradient(circle_at_72%_24%,rgba(255,209,138,0.12),transparent_20%),linear-gradient(180deg,rgba(10,13,22,0.18),rgba(5,7,13,0.06))]" />
      <HomeBackgroundBagua variant="home" />
      <HomeHero />
    </main>
  );
}
