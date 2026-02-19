import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="w-full">

      {/* Hero Section */}
      <section className="relative w-full h-[100vh] min-h-[500px] flex items-center justify-center">

        {/* Background Image */}
        <Image
          src="/about-bg.jpg" // 👉 Replace with your image path
          alt="About Us Background"
          fill
          priority
          className="object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content Box */}
        <div className="relative z-10 max-w-5xl mx-auto px-6">

          <div className="bg-black/60 backdrop-blur-md rounded-2xl p-8 md:p-12 text-center">

            {/* Title */}
            <h1 className="text-white text-3xl md:text-5xl font-bold mb-6">
              ABOUT US
            </h1>

            {/* Description */}
            <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
              Elimisha Watoto Foundation is a community-driven education
              organization committed to expanding access to quality education
              and training for economically disadvantaged learners.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}
