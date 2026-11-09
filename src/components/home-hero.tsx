"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import { BOOKING_PORTAL, HOME_IMAGE } from "@/lib/site-data";
import HeroVideoBackground from "@/components/HeroVideoBackground";

export default function HomeHero({
  poster = HOME_IMAGE,
}: {
  videoSources?: { webm: string | null; mp4: string | null }[];
  poster?: string;
}) {
  return (
    <section className="home-hero min-h-screen" aria-label="Welcome to Access Psych">
      {/* Step 2 & 3: Full-Bleed Rotating Background Video & Overlay */}
      <HeroVideoBackground poster={poster} />

      {/* Step 1: Existing Hero Content on top (position relative, z-index 10) */}
      <div className="hero-inner">
        <div className="hero-copy">
          <div className="hero-slide-copy">
            <h1 aria-label="Welcome to Access Psych.">
              <span className="hero-title-line">Welcome to</span>
              <span className="hero-title-line">Access Psych.</span>
            </h1>
            <p>Our mental health clinicians have capacity for telehealth and face-to-face sessions.</p>
          </div>

          <div className="hero-actions">
            <a className="button button-coral" href={BOOKING_PORTAL} target="_blank" rel="noreferrer">
              BOOK ONLINE NOW <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <Link className="button button-glass" href="/meet-our-team">
              Find a clinician <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>

          <div className="hero-trust" aria-label="Service details">
            <span>
              <Check size={14} aria-hidden="true" /> Telehealth and clinic appointments
            </span>
            <i aria-hidden="true" />
            <span>
              <Check size={14} aria-hidden="true" /> Clinicians across Australia
            </span>
            <i aria-hidden="true" />
            <span>
              <Check size={14} aria-hidden="true" /> Ages 12 and over
            </span>
          </div>
        </div>
      </div>

      {/* Scroll cue link */}
      <a className="scroll-cue" href="#intro">
        <span>Scroll to explore</span>
        <ArrowDown size={16} aria-hidden="true" />
      </a>
    </section>
  );
}
