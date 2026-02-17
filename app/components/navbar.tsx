"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [openPrograms, setOpenPrograms] = useState(false);
  const [openTertiary, setOpenTertiary] = useState(false);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center pt-4">
      <nav
        className={`w-full max-w-7xl mx-auto px-4 md:px-6 py-3
        flex items-center justify-between
        transition-all duration-300 rounded-full
        ${scrolled
            ? "bg-white shadow-xl"
            : "bg-white/90 backdrop-blur-md shadow-lg"
          }`}
      >

        {/* Logo */}
        <div className="flex items-center gap-2 md:gap-3">
          <Image
            src="/Logo.svg"
            alt="Elimisha Watoto Logo"
            width={180}
            height={180}
            priority
          />
        </div>

        {/* ================= Desktop Menu ================= */}
        <ul className="hidden md:flex items-center gap-8 font-medium text-gray-700">

          <li>
            <Link href="/" className="text-orange-500">
              Home
            </Link>
          </li>

          <li>
            <Link href="/about" className="hover:text-orange-500 transition">
              About
            </Link>
          </li>

          {/* Programs Dropdown */}
          <li className="relative">

            <div
              className="relative"
              onMouseEnter={() => setOpenPrograms(true)}
              onMouseLeave={() => {
                setOpenPrograms(false);
                setOpenTertiary(false);
              }}
            >

              {/* Button */}
              <button className="flex items-center gap-1 hover:text-orange-500 transition">
                Programs
                <ChevronDown size={16} />
              </button>

              {/* Dropdown */}
              {openPrograms && (
                <div className="absolute left-0 top-full mt-7 bg-white shadow-xl rounded-xl min-w-55 z-50">

                  <ul className="py-2">

                    <DropdownLink href="/programs/care-share" title="Care & Share" />
                    <DropdownLink href="/programs/leap" title="LEAP" />
                    <DropdownLink href="/programs/secondary" title="Secondary Education" />
                    <DropdownLink href="/programs/global" title="Global Scholarships" />

                    {/* Tertiary */}
                    <li
                      className="relative"
                      onMouseEnter={() => setOpenTertiary(true)}
                      onMouseLeave={() => setOpenTertiary(false)}
                    >
                      <button className="flex w-full items-center justify-between px-4 py-2 hover:bg-gray-50 hover:text-orange-500 transition">
                        Tertiary Education
                        <ChevronRight size={16} />
                      </button>

                      {openTertiary && (
                        <div className="absolute left-full top-0 bg-white shadow-xl rounded-xl min-w-[220px]">

                          <ul className="py-2">

                            <DropdownLink
                              href="/programs/tertiary/vocational"
                              title="Vocational Training"
                            />

                            <DropdownLink
                              href="/programs/tertiary/local"
                              title="Local Universities"
                            />

                            <DropdownLink
                              href="/programs/tertiary/international"
                              title="International Scholarships"
                            />

                          </ul>
                        </div>
                      )}
                    </li>

                  </ul>
                </div>
              )}

            </div>
          </li>


          <li>
            <Link href="/contact" className="hover:text-orange-500 transition">
              Contact
            </Link>
          </li>

        </ul>


        {/* ================= Desktop Button ================= */}
        <Link
          href="/contact"
          className="hidden md:flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full font-medium transition group"
        >
          GET IN TOUCH

          <span className="flex items-center justify-center w-7 h-7 bg-white text-orange-500 rounded-full transition group-hover:translate-x-1">
            <ArrowRight size={16} />
          </span>
        </Link>


        {/* ================= Mobile Button ================= */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700"
        >
          {open ? "✕" : "☰"}
        </button>


        {/* ================= Mobile Menu ================= */}
        {open && (
          <div className="absolute top-full left-0 w-full mt-3 bg-white rounded-3xl shadow-xl p-6 md:hidden">

            <ul className="flex flex-col gap-4 font-medium text-gray-700">

              <MobileLink href="/" title="Home" setOpen={setOpen} />
              <MobileLink href="/about" title="About" setOpen={setOpen} />

              {/* Mobile Programs */}
              <li>

                <button
                  onClick={() => setOpenPrograms(!openPrograms)}
                  className="flex w-full justify-between items-center"
                >
                  Programs
                  <ChevronDown
                    size={16}
                    className={`transition ${openPrograms ? "rotate-180" : ""}`}
                  />
                </button>

                {openPrograms && (
                  <ul className="ml-4 mt-2 space-y-2 text-sm">

                    <MobileSubLink href="/programs/care-share" title="Care & Share" setOpen={setOpen} />
                    <MobileSubLink href="/programs/leap" title="LEAP" setOpen={setOpen} />
                    <MobileSubLink href="/programs/secondary" title="Secondary Education" setOpen={setOpen} />
                    <MobileSubLink href="/programs/global" title="Global Scholarships" setOpen={setOpen} />

                    {/* Mobile Tertiary */}
                    <li>

                      <button
                        onClick={() => setOpenTertiary(!openTertiary)}
                        className="flex w-full justify-between items-center"
                      >
                        Tertiary Education
                        <ChevronRight
                          size={14}
                          className={`transition ${openTertiary ? "rotate-90" : ""}`}
                        />
                      </button>

                      {openTertiary && (
                        <ul className="ml-4 mt-1 space-y-1">

                          <MobileSubLink href="/programs/tertiary/vocational" title="Vocational Training" setOpen={setOpen} />
                          <MobileSubLink href="/programs/tertiary/local" title="Local Universities" setOpen={setOpen} />
                          <MobileSubLink href="/programs/tertiary/international" title="International Scholarships" setOpen={setOpen} />

                        </ul>
                      )}

                    </li>

                  </ul>
                )}

              </li>

              <MobileLink href="/contact" title="Contact" setOpen={setOpen} />


              {/* Mobile Button */}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-3 bg-orange-500 text-white py-2 rounded-full mt-3 group"
              >
                Get In Touch

                <span className="flex items-center justify-center w-7 h-7 bg-white text-orange-500 rounded-full transition group-hover:translate-x-1">
                  <ArrowRight size={16} />
                </span>
              </Link>

            </ul>
          </div>
        )}

      </nav>
    </div>
  );
}


/* ================= Helpers ================= */

function DropdownLink({ href, title }: any) {
  return (
    <li>
      <Link
        href={href}
        className="block px-4 py-2 hover:bg-gray-50 hover:text-orange-500 transition"
      >
        {title}
      </Link>
    </li>
  );
}

function MobileLink({ href, title, setOpen }: any) {
  return (
    <li>
      <Link href={href} onClick={() => setOpen(false)}>
        {title}
      </Link>
    </li>
  );
}

function MobileSubLink({ href, title, setOpen }: any) {
  return (
    <li>
      <Link
        href={href}
        onClick={() => setOpen(false)}
        className="text-gray-600 hover:text-orange-500"
      >
        {title}
      </Link>
    </li>
  );
}
