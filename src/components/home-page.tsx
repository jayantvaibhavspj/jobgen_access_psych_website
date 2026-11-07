import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  MapPin,
  Phone,
  Shield,
} from "lucide-react";
import HomeHero from "@/components/home-hero";
import Reveal from "@/components/reveal";
import {
  BOOKING_PORTAL,
  concerns,
  EMAIL_LINK,
  homepageCopy,
  HOME_IMAGE,
  locations,
  pages,
  PHONE_LINK,
} from "@/lib/site-data";
import { clinicians } from "@/data/clinicians.js";

const serviceSlugs = [
  "psychology-therapy-counselling",
  "employee-assistance-program",
  "professional-care-program",
  "workplace-group-education",
  "mhfa",
  "critical-incident-support",
  "adhd-autism-assessments",
] as const;

const featuredClinicians = clinicians.slice(0, 3);
const featuredArticles = pages.blogs.cards?.slice(0, 3) ?? [];
const featuredNews = pages["news-and-events"].cards?.slice(0, 2) ?? [];
const featuredLocations = [locations.find((location) => location.city === "Sydney CBD"), locations.find((location) => location.city === "Melbourne CBD"), locations.find((location) => location.city === "Brisbane")].filter(
  (location): location is (typeof locations)[number] => Boolean(location),
);
const featuredFaqs = pages["frequently-asked-questions"].sections?.slice(0, 3) ?? [];

const pathways = [
  {
    eyebrow: "01 / OUR STORY",
    title: "About Access Psych",
    href: "/about-us",
  },
  {
    eyebrow: "02 / OUR PEOPLE",
    title: "Find a clinician near you",
    href: "/meet-our-team",
  },
  {
    eyebrow: "03 / PLAN AHEAD",
    title: "Our fees",
    href: "/fees",
  },
  {
    eyebrow: "04 / FOR WORKPLACES",
    title: "Employee Assistance Program",
    href: "/employee-assistance-program",
  },
];

function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="section-heading">
      <span className="section-eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

export default function HomePage() {
  return (
    <main id="main">
      <HomeHero />

      <section className="intro-section section-pad" id="intro">
        <div className="section-container">
          <div className="intro-layout">
            <Reveal className="intro-copy">
              <span className="section-eyebrow">Care, on your terms</span>
              <h2>Access psychology, therapy and counselling services</h2>
            </Reveal>
            <Reveal className="intro-description">
              <div className="intro-prose">
                {homepageCopy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <p className="age-note"><span className="age-note-icon"><Shield size={17} aria-hidden="true" /></span> Our services are for people aged 12 and over.</p>
              <Link className="text-link" href="/psychology-therapy-counselling">
                Explore psychology, therapy and counselling <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
          <div className="concern-list" aria-label="Mental health issues and concerns">
            <span className="concern-list-label">Areas of support</span>
            {concerns.map((concern, index) => (
              <Reveal key={concern} delay={index * 0.025}>
                <Link className="concern-row" href="/psychology-therapy-counselling">
                  <span className="concern-index">{String(index + 1).padStart(2, "0")}</span>
                  <span>{concern}</span>
                  <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="services-overview section-pad" aria-labelledby="services-heading">
        <div className="section-container">
          <div className="services-overview-heading">
            <div>
              <span className="section-eyebrow">Ways we can support you</span>
              <h2 id="services-heading">Care for people and workplaces.</h2>
            </div>
            <Link className="text-link" href="/access-our-services">
              How to access our services <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="services-overview-grid">
            {serviceSlugs.map((slug, index) => {
              const service = pages[slug];
              return (
                <Reveal key={slug} delay={index * 0.045}>
                  <Link className={`service-overview-row${index === 0 ? " service-overview-featured" : ""}`} href={`/${slug}`}>
                    {index === 0 && service.image && (
                      <span className="service-overview-image">
                        <Image src={service.image} alt={service.imageAlt ?? ""} fill unoptimized sizes="(max-width: 760px) 100vw, 52vw" />
                      </span>
                    )}
                    <span className="service-overview-index">{String(index + 1).padStart(2, "0")}</span>
                    <span className="service-overview-copy">
                      <strong>{service.title}</strong>
                      <small>{service.intro}</small>
                    </span>
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="values-overview section-pad">
        <div className="section-container values-overview-layout">
          <div className="values-overview-intro">
            <span className="section-eyebrow">Our purpose</span>
            <h2>{pages["vision-purpose-values"].sections?.[1]?.paragraphs?.[0]}</h2>
            <Link className="text-link" href="/vision-purpose-values">
              Vision, purpose &amp; values <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="values-overview-list">
            {pages["vision-purpose-values"].cards?.map((value, index) => (
              <div className="values-overview-item" key={value.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{value.title}</strong>
                <p>{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="session-section section-pad">
        <div className="section-container">
          <div className="booking-editorial">
            <Reveal className="booking-editorial-heading">
              <span className="section-eyebrow">One small next step</span>
              <h2>Book a session with one of our mental health clinicians.</h2>
              <p>Choose the way that feels easiest. Our team is here to help.</p>
            </Reveal>
            <div className="booking-options-list">
              <Reveal>
                <a className="booking-row" href={BOOKING_PORTAL} target="_blank" rel="noreferrer">
                  <span className="booking-row-number">01</span>
                  <span className="booking-row-copy"><strong>Book online</strong><small>For private, Medicare, EAP and Supervision clients.</small></span>
                  <span className="booking-row-action">BOOK ONLINE TODAY <ArrowUpRight size={17} aria-hidden="true" /></span>
                </a>
              </Reveal>
              <Reveal delay={0.07}>
                <a className="booking-row" href={PHONE_LINK}>
                  <span className="booking-row-number">02</span>
                  <span className="booking-row-copy"><strong>Friendly confidential chat</strong><small>Talk with our team about your options.</small></span>
                  <span className="booking-row-action">PHONE 1800 APSYCH <ArrowUpRight size={17} aria-hidden="true" /></span>
                </a>
              </Reveal>
              <Reveal delay={0.14}>
                <Link className="booking-row" href="/online-booking-request">
                  <span className="booking-row-number">03</span>
                  <span className="booking-row-copy"><strong>Contact form</strong><small>Ask a question or make a booking or referral request.</small></span>
                  <span className="booking-row-action">CONTACT FORM <ArrowUpRight size={17} aria-hidden="true" /></span>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="team-preview-section section-pad" aria-labelledby="team-preview-heading">
        <div className="section-container">
          <div className="team-preview-heading">
            <div>
              <span className="section-eyebrow">Meet our people</span>
              <h2 id="team-preview-heading">A clinician who listens.</h2>
              <p>Our mental health clinicians have capacity for telehealth and face-to-face sessions.</p>
            </div>
            <Link className="text-link" href="/meet-our-team">
              Meet the team <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="team-preview-grid">
            {featuredClinicians.map((clinician, index) => (
              <Reveal key={clinician.name} delay={index * 0.06}>
                <a className="team-preview-person" href={clinician.url} target="_blank" rel="noreferrer">
                  <span className="team-preview-photo">
                    <Image src={clinician.image} alt={`${clinician.name}, ${clinician.title}`} fill unoptimized sizes="(max-width: 650px) 80vw, 28vw" />
                  </span>
                  <span className="team-preview-role">{clinician.title}</span>
                  <strong>{clinician.name}</strong>
                  <span className="team-preview-link">View profile <ArrowUpRight size={15} aria-hidden="true" /></span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="clinicians-section section-pad">
        <div className="section-container clinicians-layout">
          <Reveal className="clinicians-image">
            <Image
              src={HOME_IMAGE}
              alt="A young man talking with a psychologist or therapist"
              fill
              unoptimized
              sizes="(max-width: 900px) 100vw, 44vw"
            />
            <span className="image-caption">A little more room to feel like you.</span>
          </Reveal>
          <Reveal className="clinicians-content">
            <SectionHeading eyebrow="A good place to begin" title="Get to know our clinicians">
              Our mental health clinicians have capacity for telehealth and face-to-face sessions.
            </SectionHeading>
            <div className="pathway-grid">
              {pathways.map((item) => (
                <Link className="pathway-row" href={item.href} key={item.title}>
                  <span className="pathway-card-copy">
                    <span className="pathway-eyebrow">{item.eyebrow}</span>
                    <strong>{item.title}</strong>
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="locations-preview section-pad">
        <div className="section-container locations-preview-layout">
          <div className="locations-preview-intro">
            <span className="section-eyebrow">Across Australia</span>
            <h2>Support, wherever you are.</h2>
            <p>Appointments are available via telehealth, with face-to-face sessions at selected clinics.</p>
            <Link className="text-link" href="/our-locations">
              Find a clinic <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="locations-preview-list">
            {featuredLocations.map((location) => (
              <Link className="location-preview-row" href="/our-locations" key={`${location.state}-${location.city}`}>
                <MapPin size={17} aria-hidden="true" />
                <span><strong>{location.city}</strong><small>{location.state}</small></span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {featuredArticles.length > 0 && (
        <section className="resources-preview section-pad" aria-labelledby="resources-preview-heading">
          <div className="section-container">
            <div className="resources-preview-heading">
              <div>
                <span className="section-eyebrow"><BookOpen size={14} aria-hidden="true" /> Read and explore</span>
                <h2 id="resources-preview-heading">Mental health, made easier to understand.</h2>
              </div>
              <div className="resources-preview-actions">
                <Link className="text-link" href="/blogs">
                  All mental health information <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
                <Link className="text-link" href="/tip-sheets">
                  Tip sheets <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="resources-preview-grid">
              {featuredArticles.map((article, index) => (
                <Reveal key={article.title} delay={index * 0.06}>
                  <a className="resource-preview-item" href={article.href} target="_blank" rel="noreferrer">
                    {article.image && (
                      <span className="resource-preview-image">
                        <Image src={article.image} alt={article.imageAlt ?? ""} fill unoptimized sizes="(max-width: 760px) 100vw, 32vw" />
                      </span>
                    )}
                    <span className="resource-preview-meta">Mental health information</span>
                    <strong>{article.title}</strong>
                    <span className="resource-preview-link">Read article <ArrowUpRight size={15} aria-hidden="true" /></span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {featuredNews.length > 0 && (
        <section className="news-preview section-pad" aria-labelledby="news-preview-heading">
          <div className="section-container news-preview-layout">
            <div className="news-preview-intro">
              <span className="section-eyebrow">From Access Psych</span>
              <h2 id="news-preview-heading">News and events.</h2>
              <p>{pages["news-and-events"].intro}</p>
              <Link className="text-link" href="/news-and-events">
                All news and events <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <div className="news-preview-list">
              {featuredNews.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.06}>
                  <a className="news-preview-item" href={item.href} target="_blank" rel="noreferrer">
                    {item.image && (
                      <span className="news-preview-image">
                        <Image src={item.image} alt={item.imageAlt ?? ""} fill unoptimized sizes="(max-width: 760px) 25vw, 180px" />
                      </span>
                    )}
                    <span className="news-preview-copy">
                      <strong>{item.title}</strong>
                      <small>{item.text}</small>
                      <span className="team-preview-link">Read more <ArrowUpRight size={15} aria-hidden="true" /></span>
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="faq-preview section-pad">
        <div className="section-container faq-preview-layout">
          <div className="faq-preview-intro">
            <span className="section-eyebrow">Good to know</span>
            <h2>Questions are welcome.</h2>
            <p>Clear answers about appointments and support from Access Psych.</p>
            <Link className="text-link" href="/frequently-asked-questions">
              Visit frequently asked questions <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="faq-preview-list">
            {featuredFaqs.map((faq) => (
              <details key={faq.title}>
                <summary>{faq.title}<span aria-hidden="true">+</span></summary>
                <p>{faq.paragraphs?.[0]}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="careers-preview" aria-label="Careers at Access Psych">
        <div className="section-container careers-preview-inner">
          <div>
            <span className="section-eyebrow">Work with us</span>
            <h2>Make a difference with Access Psych.</h2>
          </div>
          <Link className="button button-outline" href="/careers">
            Current vacancies <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="newsletter-preview" aria-label="Newsletter">
        <div className="section-container newsletter-preview-inner">
          <div>
            <span className="section-eyebrow">Stay connected</span>
            <h2>{pages.newsletter.intro}</h2>
          </div>
          <Link className="button button-dark" href="/newsletter">
            Subscribe to our newsletter <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="country-section section-pad">
        <div className="section-container country-panel">
          <span className="country-symbol" aria-hidden="true">01</span>
          <div>
            <span className="section-eyebrow">Acknowledgement of Country</span>
            <h2>Acknowledgement of Country</h2>
            <p>
              Access Psych acknowledges the Traditional Custodians of the land upon which we live and work, and pays respect to Elders past and present. We strive to foster acceptance, respect for diversity and a workplace free of intolerance, discrimination, harassment and violence.
            </p>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="section-container final-cta-inner">
          <div>
            <span className="section-eyebrow">Take the next step</span>
            <h2>Book online now.</h2>
          </div>
          <div className="final-cta-actions">
            <a className="button button-dark" href={BOOKING_PORTAL} target="_blank" rel="noreferrer">Book online now <ArrowUpRight size={17} aria-hidden="true" /></a>
            <a className="text-link" href={EMAIL_LINK}>Email Access Psych <ArrowUpRight size={16} aria-hidden="true" /></a>
            <span className="sr-only"><Phone aria-hidden="true" />1800 APSYCH (1800 277 924)</span>
          </div>
        </div>
      </section>
    </main>
  );
}
