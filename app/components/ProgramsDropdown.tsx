"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function ProgramsDropdown() {
  const [open, setOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => {
        setOpen(false);
        setSubOpen(false);
      }}
    >
      {/* Main Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 font-medium w-full"
      >
        Programs
        <ChevronDown
          size={16}
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute md:left-0 left-0 top-full bg-white shadow-lg rounded-md min-w-[220px] z-50 md:block">

          <ul className="py-2">

            <li>
              <Link
                href="/programs/care-share"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                Care & Share
              </Link>
            </li>

            <li>
              <Link
                href="/programs/leap"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                LEAP
              </Link>
            </li>

            <li>
              <Link
                href="/programs/secondary"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                Secondary Education
              </Link>
            </li>

            <li>
              <Link
                href="/programs/global"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                Global Scholarships
              </Link>
            </li>

            {/* Tertiary */}
            <li className="relative">

              <button
                onClick={() => setSubOpen(!subOpen)}
                className="flex w-full items-center justify-between px-4 py-2 hover:bg-gray-100"
              >
                Tertiary Education
                <ChevronRight
                  size={16}
                  className={`transition ${
                    subOpen ? "rotate-90 md:rotate-0" : ""
                  }`}
                />
              </button>

              {/* Submenu */}
              {subOpen && (
                <div className="md:absolute md:left-full md:top-0 bg-white shadow-lg rounded-md min-w-[220px] md:mt-0 mt-1">

                  <ul className="py-2 border-t md:border-0">

                    <li>
                      <Link
                        href="/programs/tertiary/vocational"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setOpen(false)}
                      >
                        Vocational Training
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="/programs/tertiary/local"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setOpen(false)}
                      >
                        Local Universities
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="/programs/tertiary/international"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setOpen(false)}
                      >
                        International Scholarships
                      </Link>
                    </li>

                  </ul>

                </div>
              )}

            </li>

          </ul>

        </div>
      )}
    </div>
  );
}
