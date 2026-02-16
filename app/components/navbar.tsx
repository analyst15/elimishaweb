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
  const [openProgrammes, setOpenProgrammes] = useState(false);
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
        className={`w-full max-w-7xl
    mx-auto px-4 md:px-6 py-3
    flex items-center justify-between
    transition-all duration-300 rounded-full

    ${scrolled
            ? "bg-white shadow-xl"
            : "bg-white/90 backdrop-blur-md shadow-lg"
          }
  `}
      >


        {/* Logo */}
        <div className="flex items-center gap-2 md:gap-3">
          <Image
            src="/Logo.svg"
            alt="Elimisha Watoto Logo"
            width={200}
            height={200}
            priority
          />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 font-medium text-gray-700">

          {/* Home */}
          <li>
            <Link href="/" className="text-orange-500">
              Home
            </Link>
          </li>

          {/* About */}
          <li>
            <Link href="/about" className="hover:text-orange-500 transition">
              About
            </Link>
          </li>

          {/* Programmes Dropdown */}
          <li className="relative">

            <button
              onClick={() => setOpenProgrammes(!openProgrammes)}
              className="flex items-center gap-1 hover:text-orange-500 transition"
            >
              Programmes
              <ChevronDown
                size={16}
                className={`transition ${openProgrammes ? "rotate-180" : ""
                  }`}
              />

            </button>

            {/* Dropdown */}
            {openProgrammes && (
              <div className="absolute top-full left-0 mt-3 w-60 bg-white rounded-xl shadow-xl border z-50">

                <DropdownItem title="Care & Share" />
                <DropdownItem title="LEAP" />
                <DropdownItem title="Secondary Education" />
                <DropdownItem title="Global Scholarships" />

                {/* Tertiary */}
                {/* Tertiary Education (Side Submenu) */}
                <div
                  className="relative group"
                  onMouseEnter={() => setOpenTertiary(true)}
                  onMouseLeave={() => setOpenTertiary(false)}
                >
                  <button
                    className="w-full flex items-center justify-between px-4 py-2 font-medium hover:bg-gray-50 hover:text-orange-500 transition"
                  >
                    Tertiary Education

                    <ChevronRight
                      size={16}
                      className="transition group-hover:translate-x-0.5"
                    />
                  </button>

                  {/* Side Submenu */}
                  {openTertiary && (
                    <div className="absolute top-0 left-full ml-2 px-5 w-56 bg-white rounded-xl shadow-xl border z-50">

                      <SubMenuItem title="Vocational Training" />
                      <SubMenuItem title="Local Universities" />
                      <SubMenuItem title="International Scholarships" />

                    </div>
                  )}
                </div>


              </div>
            )}

          </li>

          {/* Contact */}
          <li>
            <Link href="/contact" className="hover:text-orange-500 transition">
              Contact
            </Link>
          </li>

        </ul>


        {/* Desktop Button */}
        {/* Desktop Button */}
        {/* Desktop Button */}
        <Link
          href="/contact"
          className="hidden md:flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full font-medium transition group"
        >
          GET IN TOUCH

          {/* Icon Circle */}
          <span className="flex items-center justify-center w-7 h-7 bg-white text-orange-500 rounded-full transition group-hover:translate-x-1">
            <ArrowRight size={16} />
          </span>
        </Link>



        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700"
        >
          {open ? (
            // Close Icon
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Hamburger
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* Mobile Menu */}
        {open && (
          <div className="absolute top-full left-0 w-full mt-3 bg-white rounded-3xl shadow-xl p-6 md:hidden">

            <ul className="flex flex-col gap-5 text-gray-700 font-medium">

              <li>
                <Link href="/" onClick={() => setOpen(false)}>
                  Home
                </Link>
              </li>

              <li>
                <Link href="/about" onClick={() => setOpen(false)}>
                  About
                </Link>
              </li>

              <li>
                <Link href="/contact" onClick={() => setOpen(false)}>
                  Contact
                </Link>
              </li>

              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-3 bg-orange-500 text-white py-2 rounded-full mt-2 font-medium group"
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
function DropdownItem({ title }: { title: string }) {
  return (
    <div className="px-4 py-2 hover:bg-gray-50 hover:text-orange-500 cursor-pointer transition">
      {title}
    </div>
  );
}

function SubMenuItem({ title }: { title: string }) {
  return (
    <div className="hover:text-orange-500 cursor-pointer transition">
      {title}
    </div>
  );
}
