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
