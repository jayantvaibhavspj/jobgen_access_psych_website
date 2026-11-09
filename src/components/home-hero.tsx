"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BOOKING_PORTAL } from "@/lib/site-data";
import HeroVideoBackground from "@/components/HeroVideoBackground";

export default function HomeHero() {
  return (
    <section className="home-hero min-h-screen" aria-label="Access Psych">
      <HeroVideoBackground
        actions={
          <div className="hero-actions">
            <a className="button button-coral" href={BOOKING_PORTAL} target="_blank" rel="noreferrer">
              BOOK ONLINE NOW <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <Link className="button button-glass" href="/meet-our-team">
              FIND A CLINICIAN <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        }
      />
    </section>
  );
}
