"use client";

import { useEffect, useRef, useState } from "react";

export default function ImpactSection() {
  return (
    <section
      className="relative w-full py-24 bg-cover bg-center"
      style={{
        backgroundImage: "url('/impact-bg.jpg')", // change if needed
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="bg-green-800/70 backdrop-blur-md rounded-2xl p-6 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-white">

          <h2 className="text-3xl md:text-4xl font-bold uppercase">
            Our Impact at a Glance
          </h2>

          <p className="max-w-xl text-sm md:text-base text-gray-100">
            We believe in transparency and measurable impact. Below is a snapshot
            of the lives we are currently supporting through our education and
            care initiatives.
          </p>

        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <StatCard value={1250} suffix="+" label="Students Supported" />

          <StatCard value={320} suffix="+" label="Scholarships Awarded" />

          <StatCard value={45} suffix="+" label="Partner Institutions" />

          <StatCard value={180} suffix="+" label="Care & Share Programme" />

        </div>

      </div>
    </section>
  );
}


/* Animated Counter Card */
function StatCard({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  /* Observe visibility */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  /* Counter animation */
  useEffect(() => {
    if (!visible) return;

    let start = 0;
    const duration = 1400;
    const step = 20;
    const increment = value / (duration / step);

    const timer = setInterval(() => {
      start += increment;

      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);

    return () => clearInterval(timer);
  }, [visible, value]);

  return (
    <div
      ref={ref}
      className={`
        bg-green-900/70 backdrop-blur-md
        border-2 border-orange-400
        rounded-2xl p-8 text-center text-white shadow-xl

        transform transition-all duration-700 ease-out

        ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }

        hover:scale-105
      `}
    >
      <h3 className="text-4xl md:text-5xl font-bold">
        {count.toLocaleString()}
        {suffix}
      </h3>

      <p className="mt-3 text-sm md:text-base text-gray-200">
        {label}
      </p>
    </div>
  );
}

