import Image from "next/image";

export default function WhoWeArePage() {
  return (
    <main className="bg-white w-full overflow-x-hidden">

      <div className="max-w-7xl mx-auto">

        {/* Section */}
        <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden bg-white">

          {/* Centered Content */}
          <div className="relative max-w-7xl mx-auto px-4 py-12">

            <div className="grid md:grid-cols-2 gap-12 items-center">

              {/* Text */}
              <div className="space-y-6 text-gray-900">

                <h2 className="text-3xl md:text-4xl font-bold">
                  OUR JOURNEY
                </h2>

                <p className="text-lg">
                  Our growth has been deliberate and strategic.
                </p>

                <ul className="list-disc ml-6 space-y-3 text-lg">
                  <li>From sponsoring a handful of learners to supporting hundreds across different education levels.</li>
                  <li>From informal support systems to structured departments with data-driven tools and accountability frameworks.</li>
                  <li>From local interventions to global education pathways.</li>
                </ul>

                <p className="text-lg">
                  We have strengthened institutional capacity, built partnerships, formalized processes, and embedded transparency at every level of delivery.
                </p>

                <p className="text-lg font-medium">
                  Our journey continues to evolve as we expand access, improve student outcomes, and strengthen sustainability through partnerships and alumni engagement.
                </p>

              </div>

              {/* Image */}
              <div className="overflow-hidden rounded-3xl shadow-xl">
                <img
                  src="/about-bg.jpg"
                  alt="Students group photo"
                  className="w-full h-105 object-cover transition hover:scale-105"
                />
              </div>

            </div>

          </div>

        </section>
        {/* ================= Mission & Vision ================= */}
        <section className="mt-24 py-10 px-4 ">

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
        {/* ================= Our Story ================= */}
        <section className="px-4 pb-10 bg-white">

          <div className="max-w-7xl mx-auto">

            {/* Header */}
            <div className="text-center mb-14">

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Story
              </h2>

              <p className="text-gray-600 max-w-2xl mx-auto">
                How our journey began and continues to transform lives.
              </p>

            </div>


            {/* Content */}
            <div className="grid gap-12 md:grid-cols-2 items-start">
              {/* Images Side */}
              <div className="grid grid-cols-2 gap-4">

                {/* Image 1 */}
                <div className="overflow-hidden rounded-2xl shadow-md">
                  <img
                    src="/story/story-1.png"
                    alt="Students learning"
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>

                {/* Image 2 */}
                <div className="overflow-hidden rounded-2xl shadow-md">
                  <img
                    src="/story/story-2.png"
                    alt="Mentorship program"
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>

                {/* Image 3 */}
                <div className="overflow-hidden rounded-2xl shadow-md col-span-2">
                  <img
                    src="/story/story-3.png"
                    alt="Community engagement"
                    className="w-full h-64 object-cover hover:scale-105 transition duration-500"
                  />
                </div>

              </div>

              {/* Text Side */}
              <div className="space-y-6 text-gray-700 leading-relaxed text-lg">

                <p>
                  Elimisha Watoto was founded on a simple but powerful conviction:
                  education remains the most sustainable pathway out of poverty.
                </p>

                <p>
                  What began as support for a small number of students has steadily
                  grown into a structured foundation serving learners across
                  primary, secondary, tertiary, and career transition pathways.
                </p>

                <p>
                  As the needs of our students expanded, so did our model. We moved
                  beyond school fees support to include mentorship, psychosocial
                  care, parental engagement, food support, vocational pathways,
                  and international education opportunities.
                </p>

                <p className="font-medium text-gray-900">
                  Today, Elimisha stands as a silent but transformative force —
                  focused less on visibility and more on measurable impact.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* ================= Our Journey (Full Width) ================= */}
        <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden bg-teal-400">

          {/* Background Pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-15">
            <div className="absolute -top-40 -left-40 w-130 h-130 bg-white rounded-full" />
            <div className="absolute top-1/3 -right-48 w-155 h-155 bg-white rounded-full" />
            <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-white rounded-full" />
          </div>

          {/* Centered Content */}
          <div className="relative max-w-7xl mx-auto px-4 py-24">

            <div className="grid md:grid-cols-2 gap-12 items-center">

              {/* Text */}
              <div className="space-y-6 text-gray-900">

                <h2 className="text-3xl md:text-4xl font-bold">
                  OUR JOURNEY
                </h2>

                <p className="text-lg">
                  Our growth has been deliberate and strategic.
                </p>

                <ul className="list-disc ml-6 space-y-3 text-lg">
                  <li>From sponsoring a handful of learners to supporting hundreds across different education levels.</li>
                  <li>From informal support systems to structured departments with data-driven tools and accountability frameworks.</li>
                  <li>From local interventions to global education pathways.</li>
                </ul>

                <p className="text-lg">
                  We have strengthened institutional capacity, built partnerships, formalized processes, and embedded transparency at every level of delivery.
                </p>

                <p className="text-lg font-medium">
                  Our journey continues to evolve as we expand access, improve student outcomes, and strengthen sustainability through partnerships and alumni engagement.
                </p>

              </div>

              {/* Image */}
              <div className="overflow-hidden rounded-3xl shadow-xl">
                <img
                  src="/journey-1.png"
                  alt="Students group photo"
                  className="w-full h-105 object-cover transition hover:scale-105"
                />
              </div>

            </div>

          </div>

        </section>
      </div>

    </main>
  );
}
