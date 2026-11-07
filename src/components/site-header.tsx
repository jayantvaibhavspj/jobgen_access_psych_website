"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Mail, Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  BOOKING_PORTAL,
  EMAIL_LINK,
  LOGO_URL,
  navigation,
  PHONE_LINK,
} from "@/lib/site-data";

function isExternal(href: string) {
  return href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
}

function NavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return isExternal(href) ? (
    <a href={href} onClick={onClick} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>
      {children}
    </a>
  ) : (
    <Link href={href} onClick={onClick}>
      {children}
    </Link>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 36);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const menu = menuRef.current;
    const focusable = () => menu?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [];
    focusable()[0]?.focus();
    const handleMenuKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
      if (event.key === "Tab") {
        const items = Array.from(focusable()).filter((item) => item.offsetParent !== null);
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", handleMenuKeys);
    document.body.classList.add("menu-is-open");
    return () => {
      document.removeEventListener("keydown", handleMenuKeys);
      document.body.classList.remove("menu-is-open");
    };
  }, [menuOpen]);

  return (
    <header className={`site-header${scrolled || !isHome ? " is-scrolled" : ""}${menuOpen ? " menu-is-open" : ""}`}>
      <div className="utility-bar">
        <div className="utility-inner">
          <div className="utility-social">
            <a href="https://au.linkedin.com/company/access-psych/" target="_blank" rel="noreferrer" aria-label="Access Psych on LinkedIn">
              <span className="linkedin-mark" aria-hidden="true">in</span>
              <span>LinkedIn</span>
            </a>
            <a href={EMAIL_LINK}><Mail size={14} aria-hidden="true" /><span>info@accesspsych.com.au</span></a>
          </div>
          <div className="utility-links">
            <Link href="/online-booking-request">Make a Booking / Referral</Link>
            <a href={BOOKING_PORTAL} target="_blank" rel="noreferrer">Treatment Booking Portal <span aria-hidden="true">↗</span></a>
            <a className="utility-phone" href={PHONE_LINK}><Phone size={13} aria-hidden="true" />1800 APSYCH (1800 277 924)</a>
          </div>
        </div>
      </div>

      <div className="nav-shell">
        <div className="nav-inner">
          <Link className="brand" href="/" aria-label="Access Psych homepage">
            {/* The source-provided logo includes its brand colours and wordmark. */}
            <Image src={LOGO_URL} alt="Access Psych" width={190} height={30} priority unoptimized />
          </Link>

          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((group) => {
              const isOpen = openGroup === group.label;
              const panelId = `nav-panel-${group.label.toLowerCase().replaceAll(" ", "-")}`;
              return (
                <div
                  className={`nav-group${isOpen ? " is-open" : ""}`}
                  key={group.label}
                  onMouseEnter={() => setOpenGroup(group.label)}
                  onMouseLeave={() => setOpenGroup(null)}
                >
                  <button
                    className="nav-trigger"
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenGroup(isOpen ? null : group.label)}
                    onKeyDown={(event) => {
                      if (event.key === "Escape") setOpenGroup(null);
                    }}
                  >
                    {group.label}<ChevronDown size={14} aria-hidden="true" />
                  </button>
                  <div className="nav-dropdown" id={panelId} aria-hidden={!isOpen} inert={!isOpen}>
                    <span className="nav-dropdown-label">Explore {group.label.toLowerCase()}</span>
                    <div className="nav-dropdown-links">
                      {group.links.map((item) => (
                        <NavLink key={item.href} href={item.href}>{item.label}</NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          <a className="button button-dark nav-book" href={BOOKING_PORTAL} target="_blank" rel="noreferrer">
            Book online now <span aria-hidden="true">↗</span>
          </a>

          <button
            ref={toggleRef}
            className="mobile-menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-navigation"
            className="mobile-menu"
            initial={reducedMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
          >
            <nav aria-label="Mobile navigation">
              {navigation.map((group) => {
                const isOpen = openGroup === group.label;
                const panelId = `mobile-panel-${group.label.toLowerCase().replaceAll(" ", "-")}`;
                return (
                  <section className="mobile-nav-group" key={group.label}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenGroup(isOpen ? null : group.label)}
                    >
                      {group.label}<ChevronDown size={18} aria-hidden="true" />
                    </button>
                    <div className="mobile-nav-links" id={panelId} hidden={!isOpen}>
                      {group.links.map((item) => (
                        <NavLink key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</NavLink>
                      ))}
                    </div>
                  </section>
                );
              })}
            </nav>
            <div className="mobile-menu-actions">
              <a className="button button-outline" href={PHONE_LINK}><Phone size={16} aria-hidden="true" />1800 APSYCH</a>
              <a className="button button-violet" href={BOOKING_PORTAL} target="_blank" rel="noreferrer">Book online now <span aria-hidden="true">↗</span></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
