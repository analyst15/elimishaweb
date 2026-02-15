"use client";

import { useState, useEffect } from "react";
import { Play } from "lucide-react";

export default function VideoSection() {
  const [open, setOpen] = useState(false);
  const [loadVideo, setLoadVideo] = useState(false);

  // Open modal + load video
  const handleOpen = () => {
    setOpen(true);
    setLoadVideo(true);
  };

  // Close modal
  const handleClose = () => {
    setOpen(false);
    setLoadVideo(false);
  };

  // Auto-close on scroll
  useEffect(() => {
    if (!open) return;

    const handleScroll = () => {
      handleClose();
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [open]);

  return (
    <section className="w-full py-16 bg-white">

      <div className="max-w-6xl mx-auto px-4 text-center">

        {/* Heading */}
        <h2 className="text-2xl text-black sm:text-3xl md:text-4xl font-bold mb-8">
          UPLIFTING FUTURE GENERATIONS
        </h2>

        {/* Video Thumbnail */}
        <div
          onClick={handleOpen}
          className="relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer group"
        >

          {/* Thumbnail */}
          <img
            src="/video-thumb.jpg"
            alt="Video Thumbnail"
            loading="lazy"
            className="w-full h-55 sm:h-80 md:h-105 lg:h-125 object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition"></div>

          {/* Play Button */}
          <span className="absolute inset-0 flex items-center justify-center">

            <span className="flex items-center justify-center w-20 h-20 bg-white/90 rounded-full shadow-xl hover:scale-110 transition">

              <Play
                size={36}
                className="text-green-600 ml-1"
                fill="currentColor"
              />

            </span>

          </span>

        </div>

        {/* Description */}
        <p className="w-full mx-auto mt-8 text-black text-left text-sm sm:text-base leading-relaxed">
        The Elimisha Watoto Foundation was born out of the need in our communities to provide a hopeful future for bright promising but otherwise underprivileged students. The programme aims to uplift such students through financial and moral support, by providing a four-year scholarship at national level for identified beneficiaries aged between 13 and 17 years, including their tuition fees, school necessities such as uniforms, and miscellaneous costs like transport and pocket money. In addition, we will provide capacity building initiatives for the students to ensure they are equipped with critical life skills, to set them at par with their more fortunate counterparts in school. This effort will include offering them select courses such as leadership development and time management.

        Through their four-year journey, our beneficiaries will be attached to a student relations officer to closely monitor their academic and personal development progress, offer appropriate advice and connect them to forums such as those involving tertiary scholarships, while fostering their growth. Ultimately, we seek to mould well-rounded human beings who are ready to adjust well as global citizens their previous circumstances notwithstanding—persons who will serve as future leaders.
        </p>

      </div>

      {/* Video Modal */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4">

          {/* Click Outside = Close */}
          <div
            onClick={handleClose}
            className="absolute inset-0"
          ></div>

          {/* Video Box */}
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden z-10">

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute -top-10 right-0 text-white text-3xl hover:text-gray-300"
            >
              ✕
            </button>

            {/* Lazy Loaded Video */}
            {loadVideo && (
              <iframe
                className="w-full h-full"
                src="https://player.vimeo.com/video/1162470030?h=31aed176d4" width="640" height="360"
                title="Foundation Video"
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
                loading="lazy"
              ></iframe>
            )}

          </div>

        </div>
      )}

    </section>
  );
}
