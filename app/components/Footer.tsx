"use client";

import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";


export default function Footer() {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 mb-14">

          {/* Logo */}
          <div className="flex items-center gap-4">
            <Image
              src="/Logo.svg"
              alt="Elimisha Watoto Foundation"
              width={250}
              height={250}
              priority
            />
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            
            <SocialLink href="#" icon={<FaFacebookF size={20} />} />
            <SocialLink href="#" icon={<FaInstagram size={20} />} />
            <SocialLink href="#" icon={<FaLinkedinIn size={20} />} />

          </div>

        </div>

        {/* Middle Info Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-12 mt-20 text-sm text-gray-600">

          {/* Location */}
          {/*<InfoItem
            icon={<MapPin size={40} />}
            title="Location"
            text="3rd Floor, Woodvale Place, Westlands, Nairobi"
          />*/}

          {/* Phone */}
          <InfoItem
            icon={<Phone size={40} />}
            title="Phone"
            text="+254 753 343 152"
          />

          {/* Email */}
          <InfoItem
            icon={<Mail size={40} />}
            title="Email"
            text="info@elimishawatoto.org"
          />

          {/* Hours */}
          <InfoItem
            icon={<Clock size={40} />}
            title="Opening Hours"
            text="Monday-Friday: 8:30AM - 5:00PM, Saturday: 8:30AM - 3:00PM, Sundays & Public Holidays: Closed"
          />

        </div>

        {/* Bottom */}
        <div className="border-t pt-6 text-center text-sm text-gray-500">

          © {new Date().getFullYear()} Elimisha Watoto Foundation. All rights reserved.

        </div>

      </div>
    </footer>
  );
}

/* Social Icon Button */
function SocialLink({
  href,
  icon,
}: {
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      className="w-11 h-11 flex items-center justify-center rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition"
    >
      {icon}
    </Link>
  );
}

/* Info Item */
function InfoItem({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-3">

      <div className="text-emerald-600 mt-1">
        {icon}
      </div>

      <div>
        <h4 className="font-semibold text-gray-800 mb-1">
          {title}
        </h4>

        <p>{text}</p>
      </div>

    </div>
  );
}
