"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUp, Linkedin, Mail, Phone } from "lucide-react";
import { BOOKING_PORTAL, EMAIL_LINK, LOGO_URL, PHONE_LINK, SITE_URL } from "@/lib/site-data";

export default function SiteFooter() {
  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link href="/" aria-label="Access Psych homepage">
            <Image src={LOGO_URL} alt="Access Psych" width={190} height={30} unoptimized />
          </Link>
          <p>Access psychology, therapy and counselling services.</p>
          <div className="footer-contact">
            <a href={PHONE_LINK}><Phone size={16} aria-hidden="true" />1800 APSYCH (1800 277 924)</a>
            <span>Fax 02 4903 3299</span>
            <a href={EMAIL_LINK}><Mail size={16} aria-hidden="true" />info@accesspsych.com.au</a>
            <a href="https://au.linkedin.com/company/access-psych/" target="_blank" rel="noreferrer"><Linkedin size={16} aria-hidden="true" />LinkedIn</a>
          </div>
        </div>
        <div className="footer-column">
          <h2>Explore</h2>
          <Link href="/employee-assistance-program">Employee Assistance Program</Link>
          <Link href="/fees">Our fees</Link>
          <Link href="/meet-our-team">Meet our team</Link>
          <Link href="/frequently-asked-questions">Frequently asked questions</Link>
          <Link href="/our-locations">Our locations</Link>
          <Link href="/online-booking-request">Booking request form</Link>
          <Link href="/newsletter">Subscribe to our newsletter</Link>
        </div>
        <div className="footer-column">
          <h2>Company policies</h2>
          <a href={`${SITE_URL}/wp-content/uploads/2026/09/Privacy-Policy-Sept-2026.pdf`} target="_blank" rel="noreferrer">Privacy Policy <span aria-hidden="true">↗</span></a>
          <a href={`${SITE_URL}/wp-content/uploads/2026/09/Quality-Policy-Sept-2026.pdf`} target="_blank" rel="noreferrer">Quality Policy <span aria-hidden="true">↗</span></a>
          <a href={`${SITE_URL}/disclaimer-copyright/`} target="_blank" rel="noreferrer">Disclaimer &amp; Copyright <span aria-hidden="true">↗</span></a>
          <Link href="/terms-of-use">Terms of Use</Link>
        </div>
        <div className="footer-booking">
          <span className="footer-kicker">A small next step</span>
          <h2>Support can start here.</h2>
          <a className="button button-violet" href={BOOKING_PORTAL} target="_blank" rel="noreferrer">Book online now <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© Copyright Access Psych 2026. All rights reserved.</span>
        <span className="footer-credit">Design by <a href="https://www.moomarketing.com.au/" target="_blank" rel="noreferrer">MOO Marketing</a></span>
        <button className="scroll-top" type="button" onClick={scrollToTop}>
          Back to top <ArrowUp size={15} aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}
