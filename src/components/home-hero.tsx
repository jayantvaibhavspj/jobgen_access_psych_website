"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Check, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { BOOKING_PORTAL, HOME_IMAGE } from "@/lib/site-data";

const slides = [
  {
    title: "Welcome to Access Psych.",
    titleLines: ["Welcome to", "Access Psych."],
    text: "Our mental health clinicians have capacity for telehealth and face-to-face sessions.",
    action: "Find a clinician",
    href: "/meet-our-team",
  },
  {
    title: "Employee Assistance Program.",
    titleLines: ["Employee Assistance", "Program."],
    text: "We offer dependable and proven counselling services to meet corporate needs.",
    action: "Learn more",
    href: "/employee-assistance-program",
  },
  {
    title: "Meet our clinicians.",
    titleLines: ["Meet our", "clinicians."],
    text: "We've got Australia covered so there's a talented and qualified clinician near you.",
    action: "Find a clinician",
    href: "/meet-our-team",
  },
];

export default function HomeHero({
  videoSources,
}: {
  videoSources: { webm: string | null; mp4: string | null }[];
}) {
  const [active, setActive] = useState(0);
  const [videoAllowed, setVideoAllowed] = useState(false);
  const [failedSlides, setFailedSlides] = useState<number[]>([]);
  const [hasEntered, setHasEntered] = useState(false);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const slide = slides[active];

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const smallScreen = window.matchMedia("(max-width: 520px)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const updateVideoPreference = () => {
      const allowed =
        !motionPreference.matches && !smallScreen.matches && !connection?.saveData;
      setVideoAllowed(allowed);
    };
    updateVideoPreference();
    motionPreference.addEventListener("change", updateVideoPreference);
    smallScreen.addEventListener("change", updateVideoPreference);
    return () => {
      motionPreference.removeEventListener("change", updateVideoPreference);
      smallScreen.removeEventListener("change", updateVideoPreference);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion || paused) return;
    const timer = window.setTimeout(
      () => setActive((current) => (current + 1) % slides.length),
      7000,
    );
    return () => window.clearTimeout(timer);
  }, [active, paused, reducedMotion]);

  const changeSlide = (direction: number) => {
    setActive((current) => (current + direction + slides.length) % slides.length);
  };

  return (
    <section className="home-hero min-h-screen" aria-label="Welcome to Access Psych">
      <div className="hero-media" aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.div
            className="hero-media-slide"
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 1, ease: "easeInOut" }}
          >
            <Image
              src={HOME_IMAGE}
              alt=""
              fill
              unoptimized
              priority={active === 0}
              sizes="100vw"
              className="hero-poster"
            />
            {videoAllowed &&
              (videoSources[active]?.webm || videoSources[active]?.mp4) &&
              !failedSlides.includes(active) && (
                <video
                  className="hero-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={HOME_IMAGE}
                  onError={() =>
                    setFailedSlides((current) => [...current, active])
                  }
                >
                  {videoSources[active]?.webm && (
                    <source
                      src={videoSources[active].webm}
                      type="video/webm"
                    />
                  )}
                  {videoSources[active]?.mp4 && (
                    <source
                      src={videoSources[active].mp4}
                      type="video/mp4"
                    />
                  )}
                </video>
              )}
          </motion.div>
        </AnimatePresence>
        <div className="hero-overlay" />
      </div>

      <div className="hero-inner">
        <div className="hero-copy">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="hero-slide-copy"
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: reducedMotion ? 0 : 0.55, ease: [0.2, 0.75, 0.25, 1] }}
              onAnimationComplete={() => setHasEntered(true)}
              aria-live="polite"
            >
              <h1 aria-label={slide.title}>
                {slide.titleLines.map((line, index) => (
                  <motion.span
                    className="hero-title-line"
                    key={line}
                    initial={
                      reducedMotion
                        ? false
                        : active === 0 && !hasEntered
                          ? { opacity: 0, y: "100%" }
                          : { opacity: 0, y: 8 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reducedMotion ? 0 : 0.62,
                      delay: active === 0 && !hasEntered ? index * 0.17 : 0,
                      ease: [0.2, 0.75, 0.25, 1],
                    }}
                  >
                    {line}
                  </motion.span>
                ))}
              </h1>
              <p>{slide.text}</p>
            </motion.div>
          </AnimatePresence>

          <div className="hero-actions">
            <a className="button button-coral" href={BOOKING_PORTAL} target="_blank" rel="noreferrer">
              BOOK ONLINE NOW <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <Link className="button button-glass" href={slide.href}>
              {slide.action} <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>

          <div className="hero-trust" aria-label="Service details">
            <span><Check size={14} aria-hidden="true" /> Telehealth + face-to-face</span>
            <i aria-hidden="true" />
            <span><Check size={14} aria-hidden="true" /> Clinicians across Australia</span>
            <i aria-hidden="true" />
            <span><Check size={14} aria-hidden="true" /> Ages 12+</span>
          </div>
        </div>

        <div className="hero-breathing" aria-hidden="true">
          <span />
        </div>

        <div className="hero-controls" aria-label="Hero slides">
          <button type="button" onClick={() => changeSlide(-1)} aria-label="Previous message"><ChevronLeft size={18} /></button>
          <div className="hero-dots">
            {slides.map((item, index) => (
              <button
                type="button"
                key={item.title}
                aria-label={`Show message ${index + 1}: ${item.title}`}
                aria-current={active === index ? "true" : undefined}
                onClick={() => setActive(index)}
              >
                <span
                  key={`${active}-${index}`}
                  className={`hero-progress${active === index ? " is-active" : ""}`}
                  style={{ animationPlayState: paused ? "paused" : "running" }}
                />
              </button>
            ))}
          </div>
          <button type="button" onClick={() => setPaused((value) => !value)} aria-label={paused ? "Play messages" : "Pause messages"}>
            {paused ? <Play size={14} /> : <Pause size={14} />}
          </button>
          <button type="button" onClick={() => changeSlide(1)} aria-label="Next message"><ChevronRight size={18} /></button>
        </div>
      </div>
      <a className="scroll-cue" href="#intro">
        <span>Scroll to explore</span><ArrowDown size={16} aria-hidden="true" />
      </a>
    </section>
  );
}
