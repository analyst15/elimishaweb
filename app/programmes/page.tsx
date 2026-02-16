"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function ProgrammesPage() {
  const [openMain, setOpenMain] = useState(false);
  const [openTertiary, setOpenTertiary] = useState(false);

  return (
    <section className="min-h-screen bg-gray-50 py-24 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center mb-4">
          Our Programmes
        </h1>

        <p className="text-gray-600 text-center mb-12">
          Explore our education and empowerment programmes.
        </p>

        {/* Dropdown Container */}
        <div className="bg-white rounded-2xl shadow-lg p-6">

          {/* Main Dropdown Button */}
          <button
            onClick={() => setOpenMain(!openMain)}
            className="w-full flex items-center justify-between px-5 py-4 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition"
          >
            Select Programme
            <ChevronDown
              className={`transition ${
                openMain ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Main Dropdown Menu */}
          {openMain && (
            <div className="mt-4 border rounded-xl divide-y">

              {/* Care & Share */}
              <MenuItem title="Care & Share" />

              {/* LEAP */}
              <MenuItem title="LEAP" />

              {/* Secondary Education */}
              <MenuItem title="Secondary Education" />

              {/* Global Scholarships */}
              <MenuItem title="Global Scholarships" />

              {/* Tertiary Education */}
              <div className="p-4">

                {/* Tertiary Button */}
                <button
                  onClick={() => setOpenTertiary(!openTertiary)}
                  className="w-full flex items-center justify-between font-medium text-gray-800 hover:text-orange-500 transition"
                >
                  Tertiary Education

                  <ChevronRight
                    className={`transition ${
                      openTertiary ? "rotate-90" : ""
                    }`}
                  />
                </button>

                {/* Sub Dropdown */}
                {openTertiary && (
                  <div className="mt-3 ml-4 border-l pl-4 space-y-3 text-gray-600">

                    <SubItem title="Vocational Training" />
                    <SubItem title="Local Universities" />
                    <SubItem title="International Scholarships" />

                  </div>
                )}
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}

/* ===============================
   Reusable Components
================================ */

function MenuItem({ title }: { title: string }) {
  return (
    <div className="p-4 font-medium text-gray-800 hover:bg-gray-50 hover:text-orange-500 transition cursor-pointer">
      {title}
    </div>
  );
}

function SubItem({ title }: { title: string }) {
  return (
    <div className="hover:text-orange-500 transition cursor-pointer">
      {title}
    </div>
  );
}

