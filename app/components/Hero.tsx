import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen w-full bg-cover bg-center flex items-center"
      style={{
        backgroundImage: "url('/hero.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Glass Card */}
        <div className="max-w-lg sm:max-w-xl bg-white/20 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl mt-32">

          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            ELIMISHA WATOTO <br />
            FOUNDATION
          </h1>

          <p className="text-white/90 mt-3 sm:mt-4 text-sm sm:text-base md:text-lg">
            Educate a Child, Transform a Nation
          </p>

          <Link
            href="/about"
            className="inline-flex items-center gap-2 mt-5 sm:mt-6 bg-orange-500 hover:bg-orange-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium transition"
          >
            Learn More →
          </Link>

        </div>

      </div>
    </section>
  );
}
