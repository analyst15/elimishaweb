import Image from "next/image";

export default function OurTeamPage() {
  return (
    <main className="bg-white">

      {/* ================= Hero Section ================= */}
      <section className="bg-gray-50 py-24 text-center px-4">

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Our Team
        </h1>

        <p className="max-w-3xl mx-auto text-gray-600 text-lg">
          Meet the passionate people behind Elimisha Watoto Foundation,
          committed to transforming lives through education and care.
        </p>

      </section>


      {/* ================= Team Section ================= */}
      <section className="py-24 px-4">

        <div className="max-w-7xl mx-auto">

          {/* Section Title */}
          <div className="text-center mb-16">

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Leadership & Staff
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team brings together experience, dedication, and a shared
              vision for empowering children and families.
            </p>

          </div>


          {/* Team Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">


            {/* Member */}
            <TeamCard
              name="Purity Mutiga"
              role="Head of Administration"
              image="/team/Purity-Mutiga.jpg"
            />

            <TeamCard
              name="Marsha Sitati"
              role="Head Liaison Officer"
              image="/team/Marsha-Sitati.jpg"
            />

            <TeamCard
              name="Elizabeth Mwania"
              role="Administration Officer"
              image="/team/Elizabeth-Mwania.jpg"
            />

            <TeamCard
              name="Susan Muriuki"
              role="Finance Officer"
              image="/team/Susan-Muriuki.jpg"
            />

            <TeamCard
              name="Princeton Nyanja"
              role="Liaison Officer"
              image="/team/Princeton-Nyanja.jpg"
            />

            <TeamCard
              name="Lucy Mueni"
              role="Liaison Officer"
              image="/team/Lucy-Mueni.jpg"
            />

            <TeamCard
              name="Ashley Otieno"
              role="Liaison Officer"
              image="/team/Ashley-Otieno.jpg"
            />

            <TeamCard
              name="Warren Bahati"
              role="Liaison Officer"
              image="/team/Warren-Bahati.jpg"
            />

            <TeamCard
              name="Wendy Achieng"
              role="Liaison Officer"
              image="/team/Wendy-Achieng.jpg"
            />

            <TeamCard
              name="Wanjiru Wakaba"
              role="Communications & Media Lead"
              image="/team/Wanjiru-Wakaba-2.jpg"
            />

            <TeamCard
              name="Susan Wambui"
              role="Administration Officer - Tertiary"
              image="/team/Susan-Wambui.jpg"
            />

          </div>

        </div>

      </section>

    </main>
  );
}


/* ================= Team Card Component ================= */

function TeamCard({
  name,
  role,
  image,
}: {
  name: string;
  role: string;
  image: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition">

      {/* Image */}
      <div className="relative h-72 overflow-hidden">

        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition duration-300"
        />

      </div>


      {/* Info */}
      <div className="p-5 text-center">

        <h3 className="font-semibold text-lg text-gray-900">
          {name}
        </h3>

        <p className="text-sm text-gray-600 mt-1">
          {role}
        </p>

      </div>

    </div>
  );
}
