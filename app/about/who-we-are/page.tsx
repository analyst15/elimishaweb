import Image from "next/image";

export default function WhoWeArePage() {
  return (
    <main className="bg-white px-4 md:px-10 lg:px-20">

      <div className="max-w-7xl mx-auto">

        {/* Section */}
        <section className="grid gap-12 items-center lg:grid-cols-2">

          {/* Text */}
          <div className="lg:py-32 py-30">

            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Who We Are
            </h1>

            <div className="space-y-6 text-gray-700 leading-relaxed text-base md:text-lg">

              <p>
                Elimisha Watoto Foundation is a community-driven education
                organization committed to expanding access to quality
                education and training for economically disadvantaged learners.
              </p>

              <p>
                We identify bright, deserving students facing financial
                barriers and walk with them through structured academic
                sponsorship, mentorship, psychosocial support, and career
                guidance. Our approach is holistic — we do not only fund
                education; we nurture character, resilience, and long-term
                self-reliance.
              </p>

              <p>
                We are a purpose-driven, impact-focused institution operating
                with integrity, accountability, safeguarding, inclusivity, and
                excellence at the core of everything we do.
              </p>

            </div>

          </div>

          {/* Image */}
          <div className="relative w-full lg:mt-36 h-75 sm:h-100 lg:h-125 rounded-2xl overflow-hidden shadow-lg">

            <Image
              src="/about-bg.jpg"
              alt="Elimisha Watoto Students"
              fill
              className="object-cover"
              priority
            />

          </div>

        </section>

      </div>

    </main>
  );
}
