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
          <div className="relative w-full lg:mt-16 h-75 sm:h-100 lg:h-125 rounded-2xl overflow-hidden shadow-lg">

            <Image
              src="/about-bg.jpg"
              alt="Elimisha Watoto Students"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>
        {/* ================= Mission & Vision ================= */}
<section className="mt-24 py-20 px-4 ">

  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

    {/* Text Content */}
    <div className="space-y-10">

      {/* Mission */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Our Mission
        </h2>

        <p className="text-gray-700 leading-relaxed text-base md:text-lg">
            To provide access to quality education to economically disadvantaged learners through scholarships.
        </p>
      </div>

      {/* Vision */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Our Vision
        </h2>

        <p className="text-gray-700 leading-relaxed text-base md:text-lg">
            Well-rounded education for an empowered generation.
        </p>
      </div>

      {/* Values */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Our Core Values
        </h2>

        <ul className="list-disc pl-5 text-gray-700 space-y-2 text-base md:text-lg">

          <li>Honesty</li>
          <li>Accountability</li>
          <li>Transparency</li>
          <li>Integrity</li>
          <li>Innovation</li>

        </ul>
      </div>

    </div>


    {/* Image (Optional) */}
    <div className="relative h-105 rounded-3xl overflow-hidden shadow-xl">

      <img
        src="/mission-vision.png"
        alt="Mission and Vision"
        className="w-full h-full object-cover"
      />

    </div>

  </div>

</section>


      </div>

    </main>
  );
}
