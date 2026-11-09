"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUp, ArrowUpRight, Linkedin, Mail, Phone } from "lucide-react";
import { BOOKING_PORTAL, EMAIL_LINK, LOGO_URL, PHONE_LINK, SITE_URL } from "@/lib/site-data";

export default function SiteFooter() {
  const scrollToTop = () => {
    const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  return (
    <footer className="site-footer">
      {/* Workflow & Care Journey Background Design */}
      <div className="footer-journey-backdrop" aria-hidden="true">
        <div className="footer-journey-overlay" />
        <svg
          className="footer-journey-svg"
          viewBox="0 0 1440 480"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="journeyLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9966ff" stopOpacity="0.2" />
              <stop offset="30%" stopColor="#9966ff" stopOpacity="0.65" />
              <stop offset="70%" stopColor="#c084fc" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#9966ff" stopOpacity="0.25" />
            </linearGradient>

            <linearGradient id="subTrackGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
              <stop offset="50%" stopColor="#9966ff" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
            </linearGradient>

            <radialGradient id="nodeGlow1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#9966ff" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#9966ff" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="nodeGlow2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#9966ff" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#9966ff" stopOpacity="0" />
            </radialGradient>

            <pattern id="journeyGrid" width="64" height="64" patternUnits="userSpaceOnUse">
              <circle cx="32" cy="32" r="1.5" fill="#9966ff" fillOpacity="0.18" />
              <path d="M 64 0 L 0 0 0 64" fill="none" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.04" />
            </pattern>
          </defs>

          {/* Background Grid Pattern */}
          <rect width="100%" height="100%" fill="url(#journeyGrid)" />

          {/* Ambient Purple Glows Behind Nodes */}
          <circle cx="160" cy="240" r="180" fill="url(#nodeGlow1)" />
          <circle cx="520" cy="180" r="220" fill="url(#nodeGlow2)" />
          <circle cx="920" cy="270" r="200" fill="url(#nodeGlow1)" />
          <circle cx="1280" cy="210" r="240" fill="url(#nodeGlow2)" />

          {/* Secondary Telehealth & Care Branch Track */}
          <path
            d="M -40 310 C 180 340, 320 280, 520 180 C 720 80, 780 320, 920 270 C 1120 210, 1260 330, 1500 290"
            stroke="url(#subTrackGrad)"
            strokeWidth="1.8"
            strokeDasharray="6 8"
          />

          {/* Main Flowing Journey Path (Referral -> Match -> Therapy -> Wellbeing) */}
          <path
            d="M -60 210 C 120 160, 240 310, 520 180 C 760 70, 840 340, 920 270 C 1040 170, 1160 140, 1500 230"
            stroke="url(#journeyLineGrad)"
            strokeWidth="3"
          />

          {/* Subtle Vertical Milestone Alignment Rays */}
          <line x1="160" y1="90" x2="160" y2="390" stroke="#9966ff" strokeWidth="1" strokeOpacity="0.16" strokeDasharray="4 6" />
          <line x1="520" y1="50" x2="520" y2="430" stroke="#9966ff" strokeWidth="1" strokeOpacity="0.18" strokeDasharray="4 6" />
          <line x1="920" y1="70" x2="920" y2="420" stroke="#9966ff" strokeWidth="1" strokeOpacity="0.18" strokeDasharray="4 6" />
          <line x1="1280" y1="60" x2="1280" y2="410" stroke="#9966ff" strokeWidth="1" strokeOpacity="0.16" strokeDasharray="4 6" />

          {/* Node 1: Initial Referral / Intake */}
          <g transform="translate(160, 240)">
            <circle r="36" fill="#0d1720" stroke="#9966ff" strokeWidth="1.5" strokeOpacity="0.5" />
            <circle r="24" fill="none" stroke="#9966ff" strokeWidth="1.5" strokeOpacity="0.6" strokeDasharray="3 4" />
            <circle r="7" fill="#9966ff" fillOpacity="0.85" />
            <circle r="3" fill="#ffffff" fillOpacity="1" />
            <text x="0" y="-45" textAnchor="middle" fill="#b388ff" fillOpacity="0.85" fontSize="11" fontWeight="750" letterSpacing="0.14em">
              01 · REFERRAL &amp; INTAKE
            </text>
            <text x="0" y="52" textAnchor="middle" fill="#ffffff" fillOpacity="0.45" fontSize="9.5" letterSpacing="0.08em">
              GP · EAP · SELF-REFERRAL
            </text>
          </g>

          {/* Node 2: Clinician Matching */}
          <g transform="translate(520, 180)">
            <circle r="42" fill="#0d1720" stroke="#9966ff" strokeWidth="1.5" strokeOpacity="0.55" />
            <circle r="28" fill="none" stroke="#9966ff" strokeWidth="1.5" strokeOpacity="0.65" strokeDasharray="4 4" />
            <circle r="8" fill="#9966ff" fillOpacity="0.9" />
            <circle r="3.5" fill="#ffffff" fillOpacity="1" />
            <text x="0" y="-50" textAnchor="middle" fill="#b388ff" fillOpacity="0.9" fontSize="11" fontWeight="750" letterSpacing="0.14em">
              02 · CLINICIAN MATCHING
            </text>
            <text x="0" y="58" textAnchor="middle" fill="#ffffff" fillOpacity="0.48" fontSize="9.5" letterSpacing="0.08em">
              SPECIALIST ALIGNMENT
            </text>
          </g>

          {/* Node 3: Active Therapy & Clinical Support */}
          <g transform="translate(920, 270)">
            <circle r="40" fill="#0d1720" stroke="#9966ff" strokeWidth="1.5" strokeOpacity="0.55" />
            <circle r="26" fill="none" stroke="#9966ff" strokeWidth="1.5" strokeOpacity="0.65" strokeDasharray="3 3" />
            <circle r="8" fill="#9966ff" fillOpacity="0.9" />
            <circle r="3.5" fill="#ffffff" fillOpacity="1" />
            <text x="0" y="-48" textAnchor="middle" fill="#b388ff" fillOpacity="0.9" fontSize="11" fontWeight="750" letterSpacing="0.14em">
              03 · EVIDENCE-BASED CARE
            </text>
            <text x="0" y="56" textAnchor="middle" fill="#ffffff" fillOpacity="0.48" fontSize="9.5" letterSpacing="0.08em">
              TELEHEALTH &amp; CLINIC
            </text>
          </g>

          {/* Node 4: Recovery, Wellbeing & Independence */}
          <g transform="translate(1280, 210)">
            <circle r="38" fill="#0d1720" stroke="#9966ff" strokeWidth="1.5" strokeOpacity="0.5" />
            <circle r="25" fill="none" stroke="#9966ff" strokeWidth="1.5" strokeOpacity="0.6" strokeDasharray="4 4" />
            <circle r="7" fill="#9966ff" fillOpacity="0.85" />
            <circle r="3" fill="#ffffff" fillOpacity="1" />
            <text x="0" y="-46" textAnchor="middle" fill="#b388ff" fillOpacity="0.85" fontSize="11" fontWeight="750" letterSpacing="0.14em">
              04 · SUSTAINED WELLBEING
            </text>
            <text x="0" y="54" textAnchor="middle" fill="#ffffff" fillOpacity="0.45" fontSize="9.5" letterSpacing="0.08em">
              HEALTHIER FUTURES
            </text>
          </g>

          {/* Flow Direction Indicator Chevrons */}
          <g stroke="#9966ff" strokeWidth="2" strokeOpacity="0.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 330 240 L 338 244 L 330 248" />
            <path d="M 730 180 L 738 184 L 730 188" />
            <path d="M 1110 185 L 1118 189 L 1110 193" />
          </g>
        </svg>
      </div>

      <div className="section-container">
        <div className="footer-main">
          {/* Column 1: Brand & CTA */}
          <div className="footer-column footer-brand-column">
            <Link className="footer-logo" href="/" aria-label="Access Psych homepage">
              <Image src={LOGO_URL} alt="Access Psych" width={180} height={32} unoptimized priority />
            </Link>
            <p className="footer-tagline">
              Connecting people with the mental health support they need, when they need it across Australia.
            </p>
            <a className="footer-cta-pill" href={BOOKING_PORTAL} target="_blank" rel="noreferrer">
              <span>MAKE A BOOKING</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>

          {/* Column 2: Explore */}
          <div className="footer-column">
            <h2>Explore</h2>
            <nav className="footer-nav" aria-label="Explore Access Psych">
              <Link href="/">Home</Link>
              <Link href="/about-us">About Us</Link>
              <Link href="/meet-our-team">Meet our team</Link>
              <Link href="/our-locations">Our locations</Link>
              <Link href="/employee-assistance-program">Employee Assistance Program</Link>
              <Link href="/fees">Our fees &amp; rebates</Link>
              <Link href="/frequently-asked-questions">Frequently asked questions</Link>
              <Link className="nav-accent-link" href="/technology-partner">Technology Partner</Link>
            </nav>
          </div>

          {/* Column 3: Care & Policies */}
          <div className="footer-column">
            <h2>Care &amp; Policies</h2>
            <nav className="footer-nav" aria-label="Care pathways and policies">
              <Link href="/vision-purpose-values">Vision, Purpose &amp; Values</Link>
              <Link href="/online-booking-request">Make a Booking / Referral</Link>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/quality-policy">Quality Policy</Link>
              <Link href="/terms-of-use">Terms of Use</Link>
              <Link href="/disclaimer-copyright">Disclaimer &amp; Copyright</Link>
            </nav>
          </div>

          {/* Column 4: Contact Us */}
          <div className="footer-column footer-contact-column">
            <h2>Contact Us</h2>
            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <span className="contact-icon"><Phone size={15} aria-hidden="true" /></span>
                <div className="contact-item-text">
                  <a className="contact-phone" href={PHONE_LINK}>1800 APSYCH</a>
                  <small>(1800 277 924)</small>
                </div>
              </div>
              <div className="footer-contact-item">
                <span className="contact-icon"><Mail size={15} aria-hidden="true" /></span>
                <a className="contact-email" href={EMAIL_LINK}>info@accesspsych.com.au</a>
              </div>
              <div className="footer-contact-item">
                <span className="contact-icon"><Phone size={15} aria-hidden="true" /></span>
                <span>Fax: 02 4903 3299</span>
              </div>
              <div className="footer-contact-item contact-hours">
                <span className="contact-hours-dot" />
                <span>Mon–Fri: 8:00am–6:00pm AEST</span>
              </div>
            </div>
            <div className="footer-social-strip">
              <Link href="/newsletter">Newsletter</Link>
              <span className="footer-sep">·</span>
              <a href="https://au.linkedin.com/company/access-psych/" target="_blank" rel="noreferrer">
                <Linkedin size={14} aria-hidden="true" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Giant Watermark Display Typography (Harrington Legal Style) */}
        <div className="footer-giant-watermark" aria-hidden="true">
          <span>ACCESS PSYCH</span>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <span>© Copyright Access Psych 2026. All rights reserved.</span>
            <Link href="/disclaimer-copyright">Disclaimer &amp; Copyright</Link>
            <Link href="/terms-of-use">Terms of Use</Link>
            <span className="footer-credit">
              Design by <a href="https://www.moomarketing.com.au/" target="_blank" rel="noreferrer">MOO Marketing</a>
            </span>
          </div>

          <div className="footer-bottom-right">
            <Link className="footer-powered" href="/technology-partner">
              Powered by JobGen.AI
            </Link>
            <button className="scroll-top" type="button" onClick={scrollToTop} aria-label="Scroll back to top">
              <span>Back to top</span>
              <ArrowUp size={14} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
