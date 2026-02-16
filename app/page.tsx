import Image from "next/image";
import Hero from "./components/Hero";
import QuoteSection from "./components/QuoteSection";
import VideoSection from "./components/VideoSection";
import ImpactSection from "./components/ImpactSection";
import Pillars from "./components/Pillars";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="min-h-screen w-full">
      <Hero />
      <QuoteSection />
      <VideoSection />
      <ImpactSection />
      <Pillars />
      </main>
    </div>
  );
}
