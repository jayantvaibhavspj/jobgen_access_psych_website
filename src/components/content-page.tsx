"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Calendar,
  Clock,
  Shield,
  Sparkles,
  Phone,
  Search,
} from "lucide-react";
import Reveal from "@/components/reveal";
import type { ContentPage, ContentSection } from "@/lib/site-data";
import { BOOKING_PORTAL, PHONE_LINK } from "@/lib/site-data";

function ContentLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
  return external ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>
      {children}
    </a>
  ) : (
    <Link href={href}>{children}</Link>
  );
}

function FaqAccordion({ sections }: { sections: ContentSection[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [query, setQuery] = useState("");

  const filtered = sections.filter((s) =>
    s.title.toLowerCase().includes(query.toLowerCase()) ||
    s.paragraphs?.some((p) => p.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="faq-interactive-wrapper">
      <div className="faq-search-bar">
        <Search size={18} className="faq-search-icon" aria-hidden="true" />
        <input
          type="search"
          placeholder="Search questions (e.g. Medicare, Telehealth, Waitlist)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="faq-search-input"
          aria-label="Search frequently asked questions"
        />
      </div>

      <div className="faq-accordion-list">
        {filtered.map((section, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={section.title} className={`faq-accordion-item${isOpen ? " is-open" : ""}`}>
              <button
                type="button"
                className="faq-accordion-trigger"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                aria-expanded={isOpen}
              >
                <span className="faq-question-title">{section.title}</span>
                <span className={`faq-chevron-wrap${isOpen ? " is-rotated" : ""}`}>
                  <ChevronDown size={18} aria-hidden="true" />
                </span>
              </button>
              {isOpen && (
                <div className="faq-accordion-body">
                  {section.paragraphs?.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                  {section.links && (
                    <div className="content-links">
                      {section.links.map((link) => (
                        <ContentLink href={link.href} key={link.href}>
                          {link.label}
                          <ArrowUpRight size={14} aria-hidden="true" />
                        </ContentLink>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <p className="faq-empty-state">No matching questions found. Please call 1800 APSYCH (1800 277 924) to speak with our support team.</p>
        )}
      </div>
    </div>
  );
}

export default function ContentPageView({
  page,
  showCta = true,
  slug,
}: {
  page: ContentPage;
  showCta?: boolean;
  slug?: string;
}) {
  const isFaq = slug === "frequently-asked-questions";
  const hasQuickFacts = Boolean(
    slug?.includes("counselling") || slug?.includes("services") || slug?.includes("book") || slug === "fees"
  );
  const contentSectionsTheme = hasQuickFacts ? "section-dark" : "section-light";
  const valueSectionTheme = (page.sections && page.sections.length > 0)
    ? (contentSectionsTheme === "section-dark" ? "section-light" : "section-dark")
    : "section-light";

  const heroStyle = slug === "employee-assistance-program"
    ? "workplace"
    : page.image
      ? "split"
      : "type";

  return (
    <main id="main" className={`inner-page page-${slug ?? "content"}`}>
      {/* 1. Page Hero Banner (Always Dark) */}
      <section className={`page-hero page-hero-${heroStyle}${page.image ? " has-image" : ""} section-dark`}>
        <div className="page-hero-layout section-container">
          <div className="page-hero-content">
            <span className="page-eyebrow-tag">{page.eyebrow}</span>
            <h1>{page.title}</h1>
            <p>{page.intro}</p>
          </div>
          {page.image && (
            <div className="page-hero-visual">
              <Image
                src={page.image}
                alt={page.imageAlt ?? page.title}
                fill
                unoptimized
                priority
                sizes="(max-width: 760px) 100vw, 48vw"
                className="page-hero-image"
              />
            </div>
          )}
        </div>
        <span className="page-hero-index" aria-hidden="true">Access Psych · {page.eyebrow}</span>
      </section>

      {/* 2. Key Service Pillars Banner (Light) */}
      {hasQuickFacts && (
        <section className="service-quick-facts section-light" aria-label="Key service information">
          <div className="section-container quick-facts-grid">
            <div className="quick-fact-item">
              <Shield size={18} className="fact-icon" aria-hidden="true" />
              <div>
                <strong>AHPRA &amp; AASW Qualified</strong>
                <span>Registered Psychologists &amp; Social Workers</span>
              </div>
            </div>
            <div className="quick-fact-item">
              <Sparkles size={18} className="fact-icon" aria-hidden="true" />
              <div>
                <strong>No Long Waitlists</strong>
                <span>Immediate capacity available now</span>
              </div>
            </div>
            <div className="quick-fact-item">
              <Clock size={18} className="fact-icon" aria-hidden="true" />
              <div>
                <strong>Telehealth &amp; 50+ Clinics</strong>
                <span>Australia-wide consultation options</span>
              </div>
            </div>
            <div className="quick-fact-item">
              <Calendar size={18} className="fact-icon" aria-hidden="true" />
              <div>
                <strong>Medicare &amp; NDIS Rebates</strong>
                <span>Rebates up to $137.05 per session</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Main Content Sections (Alternating Theme) */}
      {page.sections && page.sections.length > 0 && (
        <section className={`content-sections section-pad ${contentSectionsTheme}`}>
          <div className="reading-column">
            {isFaq ? (
              <FaqAccordion sections={page.sections} />
            ) : (
              page.sections.map((section, index) => (
                <Reveal key={section.title} delay={index % 3 * 0.05}>
                  <article className="content-block" id={section.title === "Current Vacancies" ? "current-vacancies" : undefined}>
                    <span className="content-block-index">{String(index + 1).padStart(2, "0")}</span>
                    <div className="content-block-copy">
                      <h2>{section.title}</h2>
                      {section.paragraphs?.map((paragraph, pIdx) => (
                        <p key={pIdx}>{paragraph}</p>
                      ))}

                      {/* Clean 2-column bullet chip grid */}
                      {section.bullets && (
                        <ul className="content-list-grid">
                          {section.bullets.map((item) => (
                            <li key={item}>
                              <Check size={16} className="bullet-check-icon" aria-hidden="true" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Action Links */}
                      {section.links && (
                        <div className="content-links">
                          {section.links.map((link) => (
                            <ContentLink href={link.href} key={link.href}>
                              {link.label}
                              <ArrowUpRight size={14} aria-hidden="true" />
                            </ContentLink>
                          ))}
                        </div>
                      )}

                      {section.image && (
                        <figure className="content-image">
                          <Image
                            src={section.image}
                            alt={section.imageAlt ?? ""}
                            width={900}
                            height={520}
                            unoptimized
                            sizes="(max-width: 760px) 100vw, 680px"
                          />
                        </figure>
                      )}
                    </div>
                  </article>
                </Reveal>
              ))
            )}
          </div>
        </section>
      )}

      {/* 4. Structured Feature / Value Cards (Alternating Theme) */}
      {page.cards && page.cards.length > 0 && (
        <section className={`value-section section-pad value-section-${slug ?? "content"} ${valueSectionTheme}`}>
          <div className="section-container">
            <div className="value-grid">
              {page.cards.map((card, index) => (
                <Reveal key={card.title} delay={index * 0.04}>
                  <article className={`value-card ${card.backgroundImage ? "value-card-with-bg" : ""}`}>
                    {card.backgroundImage && (
                      <div className="value-card-bg" aria-hidden="true">
                        <Image
                          src={card.backgroundImage}
                          alt=""
                          fill
                          sizes="(max-width: 760px) 100vw, 400px"
                          className="value-card-bg-img"
                        />
                        <div className="value-card-bg-overlay" />
                      </div>
                    )}
                    <div className="value-card-inner">
                      {(slug === "blogs" || slug === "news-and-events") && card.image && (
                        <div className="value-card-image">
                          <Image
                            src={card.image}
                            alt={card.imageAlt ?? ""}
                            fill
                            unoptimized
                            sizes="(max-width: 760px) 100vw, 40vw"
                          />
                        </div>
                      )}
                      {card.image && slug !== "blogs" && slug !== "news-and-events" && (
                        <span className="value-icon">
                          <Image src={card.image} alt={card.imageAlt ?? ""} width={44} height={44} unoptimized />
                        </span>
                      )}
                      {!card.image && <span className="value-card-number">{String(index + 1).padStart(2, "0")}</span>}
                      <h2>{card.title}</h2>
                      <p>{card.text}</p>
                      {card.href && (
                        <ContentLink href={card.href}>
                          Read more <ArrowUpRight size={15} aria-hidden="true" />
                        </ContentLink>
                      )}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Source or Fee Note */}
      {page.note && (
        <aside className="source-note section-container">
          <p>{page.note}</p>
        </aside>
      )}

      {/* 6. Unified Next Step Call to Action (Light, right before the Dark Footer) */}
      {page.cta && showCta && (
        <section className="page-cta section-light">
          <div className="section-container page-cta-inner">
            <div>
              <h2>Take the next step in your mental health journey.</h2>
              <p>Our compassionate clinical team is ready to support you with immediate capacity.</p>
            </div>
            <div className="page-cta-actions">
              <ContentLink href={page.cta.href}>
                <span className="button button-coral">{page.cta.label} <ArrowUpRight size={16} aria-hidden="true" /></span>
              </ContentLink>
              <a className="button button-dark" href={BOOKING_PORTAL} target="_blank" rel="noreferrer">
                Book online portal <ArrowUpRight size={15} aria-hidden="true" />
              </a>
              <a className="page-cta-phone" href={PHONE_LINK}>
                <Phone size={15} aria-hidden="true" />
                <span>1800 APSYCH (1800 277 924)</span>
              </a>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
