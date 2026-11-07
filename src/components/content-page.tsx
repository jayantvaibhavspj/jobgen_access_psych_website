import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import Reveal from "@/components/reveal";
import type { ContentPage } from "@/lib/site-data";
import { BOOKING_PORTAL } from "@/lib/site-data";

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

export default function ContentPageView({ page, showCta = true, slug }: { page: ContentPage; showCta?: boolean; slug?: string }) {
  const heroStyle = slug === "employee-assistance-program"
    ? "workplace"
    : page.image
      ? "split"
      : "type";

  return (
    <main id="main" className={`inner-page page-${slug ?? "content"}`}>
      <section className={`page-hero page-hero-${heroStyle}${page.image ? " has-image" : ""}`}>
        <div className="page-hero-layout section-container">
          <div className="page-hero-content">
            <span className="hero-eyebrow"><span className="eyebrow-line" />{page.eyebrow}</span>
            <h1>{page.title}</h1>
            <p>{page.intro}</p>
          </div>
          {page.image && (
            <div className="page-hero-visual">
              <Image
                src={page.image}
                alt={page.imageAlt ?? ""}
                fill
                unoptimized
                priority
                sizes="(max-width: 760px) 100vw, 48vw"
                className="page-hero-image"
              />
            </div>
          )}
        </div>
        <span className="page-hero-index" aria-hidden="true">Access Psych / {page.eyebrow}</span>
      </section>

      {page.sections && page.sections.length > 0 && (
        <section className="content-sections section-pad">
          <div className="reading-column">
            {page.sections.map((section, index) => (
              <Reveal key={section.title} delay={index % 3 * 0.06}>
                <article className="content-block" id={section.title === "Current Vacancies" ? "current-vacancies" : undefined}>
                  <span className="content-block-index">{String(index + 1).padStart(2, "0")}</span>
                  <div className="content-block-copy">
                    <h2>{section.title}</h2>
                    {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    {section.bullets && (
                      <ul className="content-list">
                        {section.bullets.map((item) => (
                          <li key={item}><Check size={16} aria-hidden="true" /><span>{item}</span></li>
                        ))}
                      </ul>
                    )}
                    {section.links && (
                      <div className="content-links">
                        {section.links.map((link) => (
                          <ContentLink href={link.href} key={link.href}>
                            {link.label}<ArrowUpRight size={14} aria-hidden="true" />
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
                          height={620}
                          unoptimized
                          sizes="(max-width: 760px) 100vw, 680px"
                        />
                      </figure>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {page.cards && page.cards.length > 0 && (
        <section className={`value-section section-pad value-section-${slug ?? "content"}`}>
          <div className="section-container">
            <div className="value-grid">
              {page.cards.map((card, index) => (
                <Reveal key={card.title} delay={index * 0.045}>
                  <article className="value-card">
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
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {page.note && (
        <aside className="source-note section-container">
          <p>{page.note}</p>
        </aside>
      )}

      {page.cta && showCta && (
        <section className="page-cta">
          <div className="section-container page-cta-inner">
            <div>
              <span className="section-eyebrow">Access Psych</span>
              <h2>Make a booking or referral.</h2>
            </div>
            <div className="page-cta-actions">
              <ContentLink href={page.cta.href}>
                <span className="button button-dark">{page.cta.label}<ArrowUpRight size={16} aria-hidden="true" /></span>
              </ContentLink>
              <a className="page-cta-secondary" href={BOOKING_PORTAL} target="_blank" rel="noreferrer">Book online now <ArrowUpRight size={14} aria-hidden="true" /></a>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
