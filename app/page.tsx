import Image from "next/image";
import Navbar from "./components/navbar";
import Hero from "./components/Hero";
import QuoteSection from "./components/QuoteSection";
import VideoSection from "./components/VideoSection";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="min-h-screen w-full">
      <div className="absolute top-0 w-full z-50 px-4 pt-4 sm:pt-6">
        <Navbar />
      </div>
      <Hero />
      <QuoteSection />
      <VideoSection />
      </main>
    </div>
  );
}
