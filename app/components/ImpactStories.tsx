"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const stories = [
  {
    id: 1,
    name: "Peter Mwangi",
    image: "/impact-stories/student1.png",
    message:
      "Elimisha Watoto Foundation has given me an opportunity to gain an education and set me on a successful path in the future.",
  },
  {
    id: 2,
    name: "Mary Wanjiku",
    image: "/impact-stories/student1.png",
    message:
      "Through their support, I was able to complete my studies and pursue my dreams with confidence.",
  },
  {
    id: 3,
    name: "James Otieno",
    image: "/impact-stories/student1.png",
    message:
      "The foundation believed in me when no one else did. Today, I am proud of who I am becoming.",
  },
];

export default function ImpactStories() {
  const [current, setCurrent] = useState(0);

  /* Auto slide */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) =>
        prev === stories.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-white py-20 px-4">

      <div className="max-w-5xl mx-auto text-center">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold mb-12">
          Impact Stories
        </h2>

        {/* Slider Card */}
        <div className="relative overflow-hidden">

          {stories.map((story, index) => (
            <div
              key={story.id}
              className={`transition-all duration-700 ease-in-out
                ${
                  index === current
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10 absolute inset-0"
                }
              `}
            >
              <div className="bg-gray-50 rounded-2xl shadow-lg p-8 md:p-12 flex flex-col md:flex-row items-center gap-6">

                {/* Avatar */}
                <div className="w-20 h-20 relative shrink-0">
                  <Image
                    src={story.image}
                    alt={story.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>

                {/* Text */}
                <div className="text-center md:text-left">

                  <p className="text-lg italic text-gray-700 mb-4">
                    “{story.message}”
                  </p>

                  <h4 className="font-semibold text-primary">
                    — {story.name}
                  </h4>

                </div>

              </div>
            </div>
          ))}

        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-6">

          {stories.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-3 w-3 rounded-full transition
                ${
                  index === current
                    ? "bg-primary"
                    : "bg-gray-300"
                }
              `}
            />
          ))}

        </div>

      </div>

    </section>
  );
}
