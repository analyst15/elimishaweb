import Image from "next/image";
import Contact from "../components/Contact";

export default function ContactPage() {
  return (
    <div className="w-full">

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen w-full">

        {/* Background Image */}
        <Image
          src="/contact-bg.jpg"
          alt="Contact Background"
          fill
          priority
          className="object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-32 text-center text-white">

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight my-20">
            LET&apos;S CONNECT AND HELP EDUCATE <br />
            THE FUTURE GENERATION
          </h1>

          {/* Quote */}
          <p className="max-w-2xl mx-auto text-gray-200 mb-20">
            “When you educate one mind, you empower a lifetime,
            and change generations.”
          </p>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <ContactCard
              icon="📱"
              title="Phone number:"
              text="+254 753 343 152"
            />

            <ContactCard
              icon="📍"
              title="Our location"
              text="3rd Floor, Woodvale Place, Westlands, Nairobi"
            />

            <ContactCard
              icon="✉️"
              title="Email address:"
              text="info@elimishawatoto.org"
            />

          </div>
        </div>
      </section>


      {/* ================= CONTACT FORM SECTION ================= */}
      <section className="w-full bg-white">
        <Contact />
      </section>

    </div>
  );
}

/* ----------------------------
   Card Component
-----------------------------*/

function ContactCard({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div
      className="
        bg-white/15 backdrop-blur-xl
        rounded-2xl p-6
        flex items-center gap-4
        shadow-xl
        border border-white/20
      "
    >
      {/* Icon */}
      <div
        className="
          w-14 h-14
          rounded-full
          bg-white
          flex items-center justify-center
          text-2xl
          text-black
          shrink-0
        "
      >
        {icon}
      </div>

      {/* Text */}
      <div className="text-left">
        <h3 className="font-semibold text-lg mb-1">
          {title}
        </h3>

        <p className="text-gray-200 text-sm leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
}
