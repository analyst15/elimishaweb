import Image from "next/image";

export default function MissionVisionPage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-20 px-4 md:px-8">

      <div className="max-w-6xl mx-auto space-y-20">

        {/* ================= HERO ================= */}
        <section className="text-center space-y-4">

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Our Mission & Vision
          </h1>

          <p className="max-w-3xl mx-auto text-gray-600 text-lg">
            Guiding our commitment to empower learners and transform communities
            through education.
          </p>

        </section>


        {/* ================= CONTENT ================= */}
        <section className="grid md:grid-cols-2 gap-12 items-center">

          {/* Text */}
          <div className="space-y-8">

            {/* Mission */}
            <div className="space-y-3">

              <h2 className="text-2xl font-semibold text-orange-500">
                Our Mission
              </h2>

              <p className="text-gray-700 leading-relaxed">
                To expand access to quality education and holistic support for
                economically disadvantaged learners, empowering them to reach
                their full potential and become responsible, self-reliant
                members of society.
              </p>

            </div>


            {/* Vision */}
            <div className="space-y-3">

              <h2 className="text-2xl font-semibold text-orange-500">
                Our Vision
              </h2>

              <p className="text-gray-700 leading-relaxed">
                A world where every child and young person, regardless of their
                background, has equal opportunity to learn, grow, and lead
                meaningful lives.
              </p>

            </div>


            {/* Values */}
            <div className="space-y-3">

              <h2 className="text-2xl font-semibold text-orange-500">
                Our Core Values
              </h2>

              <ul className="list-disc pl-5 text-gray-700 space-y-1">

                <li>Integrity & Accountability</li>
                <li>Inclusivity & Respect</li>
                <li>Excellence in Service</li>
                <li>Child Protection & Safeguarding</li>
                <li>Community Empowerment</li>

              </ul>

            </div>

          </div>


          {/* Image */}
          <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-lg">

            <Image
              src="/mission-vision.jpg" // put image in /public
              alt="Mission and Vision"
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
