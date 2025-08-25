import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, Phone, MessageCircle } from "lucide-react";

// Utility: detect if a URL is a video
const isVideo = (url: string) => /(\.mp4|\.webm|\.ogg)(\?.*)?$/i.test(url);

// Media box that can play videos or cycle images in a loop
function MediaLoop(
  {
    sources = [],
    interval = 3500,
    className = "",
    poster,
    rounded = "rounded-2xl",
    maintainAspect = true,
    forceCarousel = false,
  }: {
    sources: string[];
    interval?: number;
    className?: string;
    poster?: string;
    rounded?: string;
    maintainAspect?: boolean;
    forceCarousel?: boolean;
  }
) {
  const [index, setIndex] = useState(0);
  const onlyOne = sources.length === 1;
  const firstIsVideo = useMemo(() => sources.length > 0 && isVideo(sources[0]), [sources]);
  const useCarousel = forceCarousel || !firstIsVideo;

  useEffect(() => {
    setIndex(0);
  }, [sources]);

  useEffect(() => {
    if (onlyOne || !useCarousel) return;
    if (sources.length === 0) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % sources.length), interval);
    return () => clearInterval(id);
  }, [interval, onlyOne, useCarousel, sources]);

  // Fallback for empty sources
  if (!sources || sources.length === 0) {
    return (
      <div className={`relative overflow-hidden ${rounded} ring-1 ring-gray-300 ${className}`}>
        <div className="relative z-10 h-full w-full">
          <div className="absolute inset-0 grid place-items-center text-xs text-gray-500">No media</div>
          {maintainAspect && <div className="pb-[56.25%]" />}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${rounded} ring-1 ring-gray-300 ${className}`}>
      {useCarousel ? (
        <div className={`relative z-10 h-full w-full`}>
          {sources.map((src, i) => (
            isVideo(src) ? (
              <video
                key={src}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
                src={src}
                autoPlay
                playsInline
                muted
                loop
                poster={poster}
              ></video>
            ) : (
              <img
                key={src}
                src={src}
                alt="Media"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
              />
            )
          ))}
          {maintainAspect && <div className="pb-[56.25%]" />}
        </div>
      ) : (
        <video
          className="relative z-10 h-full w-full object-cover"
          src={sources[0]}
          autoPlay
          playsInline
          muted
          loop
          poster={poster}
        ></video>
      )}

      <div className="pointer-events-none absolute bottom-3 right-3 z-20 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-gray-800 shadow backdrop-blur">
        <Play className="h-3.5 w-3.5" /> Auto-loop
      </div>
    </div>
  );
}

// Brand mark: crest + gold gradient logotype
function BookLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <img
        src="/media/crest.svg"
        alt="Fouad Baayno crest"
        className="h-12 w-12 rounded-full ring-1 ring-[#c5a773]/40 shadow-sm"
      />
      
    </div>
  );
}

// ---------------- Hero Variant: Clean + Elegant (Beige gradient, tidy CTA column) ----------------
function HeroHeritageClean() {
  return (
    <section className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-[#f3ede4] via-[#e7e0d5] to-[#f3ede4] p-12 shadow-2xl ring-1 ring-gray-300 sm:p-20">
      {/* Side vignette for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/25" />

      <div className="relative grid items-center gap-16 sm:grid-cols-2">
        {/* Left column: brand + copy + CTAs */}
        <div className="flex h-full flex-col justify-between">
          <div>
            <BookLogo className="mb-4" />

            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-5xl font-bold leading-tight text-gray-900 sm:text-6xl"
            >
              A Legacy of Craft Since 1964
            </motion.h2>

            {/* Gold-accent underline */}
            <div className="mt-4 h-1 w-28 bg-gradient-to-r from-gray-700 to-[#c5a773] shadow-[0_0_10px_rgba(229,200,150,0.35)]" />

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-700">
              Founded in Beirut in 1964, Fouad Baayno Bookbindery grew from a small studio into a state-of-the-art 10,000 m² facility. For over half a century, we’ve preserved the art of bookbinding for collectors, publishers, and libraries worldwide.
            </p>

            {/* CTA column: Our Story, Get a Quote, then Contact pill */}
            <div className="mt-8 flex w-full max-w-sm flex-col items-stretch gap-3">
              <Link
                href="/about"
                className="group relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full bg-white/25 px-7 py-3 text-gray-900 text-sm font-semibold shadow-md ring-1 ring-white/60 backdrop-blur-sm transform-gpu transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 hover:bg-white/35 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a773]/60 focus-visible:ring-offset-2 before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent before:transition-transform before:duration-700 group-hover:before:translate-x-full"
              >
                <span>Our Story</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/quote"
                className="group relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full bg-white/25 px-7 py-3 text-gray-900 text-sm font-semibold shadow-md ring-1 ring-white/60 backdrop-blur-sm transform-gpu transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 hover:bg-white/35 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a773]/60 focus-visible:ring-offset-2 before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent before:transition-transform before:duration-700 group-hover:before:translate-x-full"
              >
                <span>Get a Quote</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              {/* Contact pill, same pill silhouette */}
              <div className="rounded-full bg-white/20 ring-1 ring-white/60 backdrop-blur-sm shadow-sm overflow-hidden">
                <div className="grid grid-cols-2">
                  <a
                    href="tel:+9611455000"
                    className="group relative overflow-hidden text-center px-7 py-3 text-gray-900 text-sm font-medium transition-all duration-200 transform-gpu hover:-translate-y-0.5 hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a773]/40 focus-visible:ring-offset-2 before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent before:transition-transform before:duration-700 group-hover:before:translate-x-full"
                  >
                    <span className="inline-flex items-center gap-2 justify-center">
                      <Phone className="h-4 w-4" /> Call
                    </span>
                  </a>
                  <a
                    href="https://wa.me/96176455000"
                    className="group relative overflow-hidden text-center px-7 py-3 text-white text-sm font-medium bg-gradient-to-r from-[#4caf50] to-[#2f6d32] transition-all duration-200 transform-gpu hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f6d32]/50 focus-visible:ring-offset-2 before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:transition-transform before:duration-700 group-hover:before:translate-x-full"
                  >
                    <span className="inline-flex items-center gap-2 justify-center">
                      <MessageCircle className="h-4 w-4" /> WhatsApp
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: media */}
        <MediaLoop
          className="aspect-[4/3] w-full rounded-2xl shadow-2xl"
          sources={["/media/factory-exterior.jpg", "/media/factory-interior.mp4", "/media/team-working.jpg"]}
        />
      </div>
    </section>
  );
}

// ---------------- Hero Variant: Split Showcase (media fills right half, auto-rotates) ----------------
function HeroSplitShowcase() {
  return (
    <section className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-[#f3ede4] via-[#e7e0d5] to-[#f3ede4] shadow-2xl ring-1 ring-gray-300 min-h-screen">
      {/* Side vignette for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/25" />

      <div className="relative grid min-h-screen md:grid-cols-2">
        {/* Left: content */}
        <div className="flex flex-col justify-center p-12 sm:p-20">
          <BookLogo className="mb-4" />
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold leading-tight text-gray-900 sm:text-6xl"
          >
            Fine Bookbinding & Preservation
          </motion.h2>
          <div className="mt-4 h-1 w-28 bg-gradient-to-r from-gray-700 to-[#c5a773] shadow-[0_0_10px_rgba(229,200,150,0.35)]" />
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-700">
            See our atelier, equipment, and finished volumes. The gallery on the right cycles through the bindery and books automatically.
          </p>

          <div className="mt-8 flex w-full max-w-sm flex-col items-stretch gap-3">
            <Link
              href="/about"
              className="group relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full bg-white/25 px-7 py-3 text-gray-900 text-sm font-semibold shadow-md ring-1 ring-white/60 backdrop-blur-sm transform-gpu transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 hover:bg-white/35 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a773]/60 focus-visible:ring-offset-2 before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent before:transition-transform before:duration-700 group-hover:before:translate-x-full"
            >
              <span>Our Story</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/quote"
              className="group relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full bg-white/25 px-7 py-3 text-gray-900 text-sm font-semibold shadow-md ring-1 ring-white/60 backdrop-blur-sm transform-gpu transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 hover:bg-white/35 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a773]/60 focus-visible:ring-offset-2 before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent before:transition-transform before:duration-700 group-hover:before:translate-x-full"
            >
              <span>Get a Quote</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <div className="rounded-full bg-white/20 ring-1 ring-white/60 backdrop-blur-sm shadow-sm overflow-hidden">
              <div className="grid grid-cols-2">
                <a
                  href="tel:+9611455000"
                  className="group relative overflow-hidden text-center px-7 py-3 text-gray-900 text-sm font-medium transition-all duration-200 transform-gpu hover:-translate-y-0.5 hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a773]/40 focus-visible:ring-offset-2 before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent before:transition-transform before:duration-700 group-hover:before:translate-x-full"
                >
                  <span className="inline-flex items-center gap-2 justify-center"><Phone className="h-4 w-4" /> Call</span>
                </a>
                <a
                  href="https://wa.me/96176455000"
                  className="group relative overflow-hidden text-center px-7 py-3 text-white text-sm font-medium bg-gradient-to-r from-[#4caf50] to-[#2f6d32] transition-all duration-200 transform-gpu hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f6d32]/50 focus-visible:ring-offset-2 before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:transition-transform before:duration-700 group-hover:before:translate-x-full"
                >
                  <span className="inline-flex items-center gap-2 justify-center"><MessageCircle className="h-4 w-4" /> WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right: media fills the half, auto-rotates (images + video) */}
        <div className="relative h-full min-h-[60vh] md:min-h-full">
          <MediaLoop
            className="h-full w-full rounded-none ring-0"
            sources={["/media/factory-exterior.jpg", "/media/book-stacks.jpg", "/media/hand-stitching.mp4", "/media/foil-stamping.jpg"]}
            maintainAspect={false}
            forceCarousel
          />
        </div>
      </div>
    </section>
  );
}

// ---------------- Testcases / Preview ----------------
// These are simple render cases to verify there are no JSX syntax issues
// and the MediaLoop handles both image+video arrays and single-item arrays.
export function _Testcases() {
  return (
    <div className="space-y-8 p-6">
      <div className="text-sm text-gray-600">Test 1: Default hero renders without errors</div>
      <HeroHeritageClean />

      <div className="text-sm text-gray-600">Test 2: MediaLoop with a single video source</div>
      <MediaLoop sources={["/media/factory-interior.mp4"]} className="max-w-xl" />

      <div className="text-sm text-gray-600">Test 3: MediaLoop cycling through images</div>
      <MediaLoop sources={["/media/a.jpg", "/media/b.jpg", "/media/c.jpg"]} className="max-w-xl" />

      <div className="text-sm text-gray-600">Test 4: BookLogo renders</div>
      <BookLogo />

      <div className="text-sm text-gray-600">Test 5: MediaLoop with a single image source</div>
      <MediaLoop sources={["/media/single.jpg"]} className="max-w-xl" />

      <div className="text-sm text-gray-600">Test 6: MediaLoop mixed images + video</div>
      <MediaLoop sources={["/media/a.jpg", "/media/clip.mp4", "/media/c.jpg"]} className="max-w-xl" />

      <div className="text-sm text-gray-600">Test 7: MediaLoop with empty sources (fallback)</div>
      <MediaLoop sources={[]} className="max-w-xl" />

      <div className="text-sm text-gray-600">Test 8: Split Showcase hero renders full-height with rotating media</div>
      <HeroSplitShowcase />
    </div>
  );
}

// Default export used by the canvas preview
export default function BookbinderyHero() {
  return (
    <div className="mx-auto max-w-screen-2xl space-y-16 p-4 sm:p-8">
      <HeroHeritageClean />
    </div>
  );
}
