"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Check, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { BOOKING_PORTAL, HOME_IMAGE, SITE_URL } from "@/lib/site-data";

const slides = [
  {
    title: "Welcome to Access Psych.",
    text: "Our mental health clinicians have capacity for telehealth and face-to-face sessions.",
    action: "Find a clinician",
    href: "/meet-our-team",
    image: HOME_IMAGE,
    alt: "A young man talking with a psychologist",
  },
  {
    title: "Employee Assistance Program.",
    text: "We offer dependable and proven counselling services to meet corporate needs.",
    action: "Learn more",
    href: "/employee-assistance-program",
    image: `${SITE_URL}/wp-content/uploads/2022/06/EAP1.jpg`,
    alt: "An employee talking with a psychologist",
  },
  {
    title: "Meet our clinicians.",
    text: "We've got Australia covered so there's a talented and qualified clinician near you.",
    action: "Find a clinician",
    href: "/meet-our-team",
    image: `${SITE_URL}/wp-content/uploads/2022/10/Slide-1_MOO221981-1030x302.png`,
    alt: "A mental health clinician talking with a client",
  },
];

export default function HomeHero() {
  const [active, setActive] = useState(0);
  const [videoAllowed, setVideoAllowed] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const slide = slides[active];

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const smallScreen = window.matchMedia("(max-width: 520px)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const updateVideoPreference = () => {
      setVideoAllowed(!motionPreference.matches && !smallScreen.matches && !connection?.saveData);
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
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 7000);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion]);

  const changeSlide = (direction: number) => {
    setActive((current) => (current + direction + slides.length) % slides.length);
  };

  return (
    <section className="home-hero min-h-screen" aria-label="Welcome to Access Psych">
      <div className="hero-media" aria-hidden="true">
        <Image
          key={slide.image}
          src={slide.image}
          alt=""
          fill
          unoptimized
          priority
          sizes="100vw"
          className="hero-poster"
        />
        {videoAllowed && !videoFailed && (
          <video
            className={`hero-video${videoReady ? " is-ready" : ""}`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={slide.image}
            onLoadedData={() => setVideoReady(true)}
            onError={() => setVideoFailed(true)}
          >
            <source src="/video/hero.webm" type="video/webm" />
            <source src="/video/hero.mp4" type="video/mp4" />
          </video>
        )}
        <div className="hero-overlay" />
      </div>

      <div className="hero-inner">
        <div className="hero-copy">
          <span className="hero-eyebrow"><span className="eyebrow-line" /> A little more room to feel like you</span>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="hero-slide-copy"
              initial={reducedMotion ? false : { opacity: 1, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 1, y: -8 }}
              transition={{ duration: 0.48, ease: [0.2, 0.75, 0.25, 1] }}
              aria-live="polite"
            >
              <h1>{slide.title}</h1>
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
              />
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
