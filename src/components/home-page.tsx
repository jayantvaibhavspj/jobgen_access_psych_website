import { join } from "node:path";
import { existsSync } from "node:fs";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Brain,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  Phone,
  Shield,
  UsersRound,
} from "lucide-react";
import HomeHero from "@/components/home-hero";
import Reveal from "@/components/reveal";
import {
  AustraliaLocations,
  CliniciansShowcase,
  FAQAccordion,
  HowItWorks,
  MarqueeTicker,
  ParallaxPhoto,
  NewsletterForm,
  TrustStrip,
  ValuesStory,
} from "@/components/home-interactions";
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

const serviceIcons = [
  Brain,
  BriefcaseBusiness,
  HandHeart,
  UsersRound,
  GraduationCap,
  Shield,
  ClipboardCheck,
];

const featuredClinicians = clinicians.slice(0, 3);
const featuredArticles = pages.blogs.cards?.slice(0, 3) ?? [];
const featuredNews = pages["news-and-events"].cards?.slice(0, 2) ?? [];
const featuredLocations = [
  locations.find((location) => location.city === "Sydney CBD"),
  locations.find((location) => location.city === "Melbourne CBD"),
  locations.find((location) => location.city === "Brisbane"),
  locations.find((location) => location.city === "Adelaide"),
  locations.find((location) => location.city === "Perth"),
].filter((location): location is (typeof locations)[number] => Boolean(location));
const featuredFaqs =
  pages["frequently-asked-questions"].sections?.slice(0, 3).map((faq) => ({
    title: faq.title,
    answer: faq.paragraphs?.[0] ?? "",
  })) ?? [];

const pathways = [
  { title: "About Access Psych", href: "/about-us", icon: HeartHandshake },
  { title: "Find a clinician near you", href: "/meet-our-team", icon: UsersRound },
  { title: "Our fees", href: "/fees", icon: ClipboardCheck },
  {
    title: "Employee Assistance Program",
    href: "/employee-assistance-program",
    icon: BriefcaseBusiness,
  },
];

export default function HomePage() {
  const defaultVideoSources = {
    webm: existsSync(join(process.cwd(), "public", "video", "hero.webm"))
      ? "/video/hero.webm"
      : null,
    mp4: existsSync(join(process.cwd(), "public", "video", "hero.mp4"))
      ? "/video/hero.mp4"
      : null,
  };
  const heroVideoSources = ["welcome", "eap", "clinicians"].map((slide) => ({
    webm: existsSync(join(process.cwd(), "public", "video", `hero-${slide}.webm`))
      ? `/video/hero-${slide}.webm`
      : defaultVideoSources.webm,
    mp4: existsSync(join(process.cwd(), "public", "video", `hero-${slide}.mp4`))
      ? `/video/hero-${slide}.mp4`
      : defaultVideoSources.mp4,
  }));

  return (
    <main id="main">
      <HomeHero />
      <MarqueeTicker />
      <TrustStrip />

      <section className="intro-section section-pad" id="intro">
        <div className="section-container">
          <div className="intro-layout">
            {/* Left Column: Narrative Copy & Clinic Photo Card */}
            <div className="intro-copy">
              <Reveal>
                <div className="intro-heading-group">
                  <span className="intro-category-badge">EVIDENCE-BASED CARE</span>
                  <h2>Access psychology, therapy and counselling services</h2>
                </div>
              </Reveal>

              <div className="intro-prose">
                <Reveal delay={0.06}>
                  <p className="intro-lead-para">
                    Access Psych connects you with qualified, AHPRA-registered mental health clinicians across Australia — providing evidence-based care when and where you need it.
                  </p>
                </Reveal>
                <Reveal delay={0.12}>
                  <p>
                    Whether managing anxiety, life transitions, depression, or workplace stress, our team offers compassionate, individualised support with immediate capacity and no long waitlists.
                  </p>
                </Reveal>
              </div>

              {/* 3 Key Value Pillars */}
              <Reveal delay={0.18}>
                <div className="intro-value-pills">
                  <div className="intro-value-pill">
                    <CheckCircle2 size={16} aria-hidden="true" />
                    <span>No Long Waitlists</span>
                  </div>
                  <div className="intro-value-pill">
                    <CheckCircle2 size={16} aria-hidden="true" />
                    <span>AHPRA-Registered Clinicians</span>
                  </div>
                  <div className="intro-value-pill">
                    <CheckCircle2 size={16} aria-hidden="true" />
                    <span>Telehealth &amp; 50+ Clinics</span>
                  </div>
                </div>
              </Reveal>

              {/* Clinic Atmosphere Feature Card */}
              <Reveal delay={0.24}>
                <div className="intro-feature-banner">
                  <div className="intro-photo-wrap">
                    <Image
                      src="/images/intro-therapy-space.jpg"
                      alt="Welcoming and comfortable modern therapy clinic space"
                      width={720}
                      height={380}
                      className="intro-photo-img"
                    />
                    <div className="intro-photo-overlay">
                      <span className="photo-overlay-dot" />
                      <span>Comfortable, modern clinic spaces across Australia &amp; Telehealth nationwide</span>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Age Note & Explore Button */}
              <Reveal delay={0.3}>
                <div className="intro-footer-actions">
                  <div className="age-note-pill">
                    <span className="age-note-icon">
                      <Shield size={16} aria-hidden="true" />
                    </span>
                    <span>Our services are for people aged 12 and over.</span>
                  </div>
                  <Link
                    className="intro-explore-btn"
                    href="/psychology-therapy-counselling"
                  >
                    <span>Explore services</span>
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Areas of Support Card */}
            <div className="intro-support-column">
              <Reveal delay={0.15}>
                <div className="concern-card">
                  <div className="concern-card-header">
                    <span className="concern-card-tag">AREAS OF SUPPORT</span>
                    <h3>Specialised mental health support</h3>
                    <p>Evidence-based care for a broad range of challenges and conditions.</p>
                  </div>

                  <ul className="concern-card-list" aria-label="Mental health issues and concerns">
                    {concerns.map((concern) => (
                      <li key={concern}>
                        <Link
                          className="concern-card-row"
                          href="/psychology-therapy-counselling"
                        >
                          <span>{concern}</span>
                          <span className="concern-row-arrow">
                            <ArrowUpRight size={15} aria-hidden="true" />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="concern-card-cta">
                    <div className="concern-cta-text">
                      <strong>Need support with something else?</strong>
                      <small>Our clinicians cover a wide range of needs.</small>
                    </div>
                    <a className="concern-cta-button" href={BOOKING_PORTAL} target="_blank" rel="noreferrer">
                      <span>Book a session</span>
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <HowItWorks />

      <section
        className="services-overview section-pad"
        aria-labelledby="services-heading"
      >
        <div className="section-container">
          <div className="services-overview-heading">
            <div>
              <h2 id="services-heading">Care for people and workplaces.</h2>
            </div>
            <Link className="text-link" href="/access-our-services">
              How to access our services
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="services-overview-grid">
            {serviceSlugs.map((slug, index) => {
              const service = pages[slug];
              const ServiceIcon = serviceIcons[index];

              return (
                <Reveal
                  className={`service-overview-wrap service-overview-wrap-${index + 1}`}
                  key={slug}
                  delay={index * 0.04}
                >
                  <Link
                    className={`service-overview-row${index === 0 ? " service-overview-featured" : ""}`}
                    href={`/${slug}`}
                  >
                    {index === 0 && service.image && (
                      <span className="service-overview-image">
                        <Image
                          src={service.image}
                          alt={service.imageAlt ?? ""}
                          fill
                          unoptimized
                          sizes="(max-width: 760px) 100vw, 52vw"
                        />
                      </span>
                    )}
                    <ServiceIcon size={22} aria-hidden="true" />
                    <span className="service-overview-copy">
                      <strong>{service.title}</strong>
                      <small>{service.intro}</small>
                    </span>
                    <ArrowUpRight size={19} aria-hidden="true" />
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <ValuesStory values={pages["vision-purpose-values"].cards ?? []} />

      <section className="session-section section-pad">
        <div className="session-section-bg" aria-hidden="true">
          <Image
            src="/images/booking-bg.jpg"
            alt=""
            fill
            unoptimized
            sizes="100vw"
            className="session-section-bg-img"
          />
          <div className="session-section-overlay" />
        </div>
        <div className="section-container">
          <div className="booking-editorial">
            <Reveal className="booking-editorial-heading">
              <h2>Book a session with one of our mental health clinicians.</h2>
              <p>Choose the way that feels easiest. Our team is here to help.</p>
            </Reveal>
            <div className="booking-options-list">
              <Reveal>
                <a
                  className="booking-row booking-row-online"
                  href={BOOKING_PORTAL}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="booking-row-icon">
                    <ArrowUpRight size={20} aria-hidden="true" />
                  </span>
                  <span className="booking-row-copy">
                    <strong>Book online</strong>
                    <small>
                      For private, Medicare, EAP and Supervision clients.
                    </small>
                  </span>
                  <span className="booking-row-action">
                    BOOK ONLINE TODAY
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </span>
                </a>
              </Reveal>
              <Reveal delay={0.07}>
                <a className="booking-row" href={PHONE_LINK}>
                  <span className="booking-row-icon">
                    <Phone size={20} aria-hidden="true" />
                  </span>
                  <span className="booking-row-copy">
                    <strong>Friendly confidential chat</strong>
                    <small>Talk with our team about your options.</small>
                  </span>
                  <span className="booking-row-action">
                    PHONE 1800 APSYCH
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </span>
                </a>
              </Reveal>
              <Reveal delay={0.14}>
                <Link className="booking-row" href="/online-booking-request">
                  <span className="booking-row-icon">
                    <BookOpen size={20} aria-hidden="true" />
                  </span>
                  <span className="booking-row-copy">
                    <strong>Contact form</strong>
                    <small>
                      Ask a question or make a booking or referral request.
                    </small>
                  </span>
                  <span className="booking-row-action">
                    CONTACT FORM
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section
        className="team-preview-section section-pad"
        aria-labelledby="team-preview-heading"
      >
        <div className="section-container">
          <div className="team-preview-heading">
            <div>
              <h2 id="team-preview-heading">A clinician who listens.</h2>
            </div>
            <Link className="text-link" href="/meet-our-team">
              Meet the team <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <CliniciansShowcase clinicians={clinicians} />
        </div>
      </section>

      <section className="clinicians-section section-pad">
        <div className="section-container clinicians-layout">
          <Reveal className="clinicians-content">
            <h2 className="pathway-heading">A good place to begin.</h2>
            <div className="pathway-grid">
              {pathways.map((item) => {
                const PathwayIcon = item.icon;
                return (
                  <Link
                    className="pathway-row"
                    href={item.href}
                    key={item.title}
                  >
                    <span className="pathway-card-copy">
                      <PathwayIcon size={22} aria-hidden="true" />
                      <strong>{item.title}</strong>
                      <ArrowUpRight size={17} aria-hidden="true" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="locations-preview section-pad">
        <div className="section-container">
          <div className="locations-preview-heading">
            <div className="locations-preview-intro">
              <h2>Support, wherever you are.</h2>
              <p>
                Appointments are available via telehealth, with face-to-face
                sessions at selected clinics.
              </p>
            </div>
          </div>
          <AustraliaLocations locations={featuredLocations} />
        </div>
      </section>

      {featuredArticles.length > 0 && (
        <section
          className="resources-preview section-pad"
          aria-labelledby="resources-preview-heading"
        >
          <div className="section-container">
            <div className="resources-preview-heading">
              <div>
                <h2 id="resources-preview-heading">
                  Mental health, made easier to understand.
                </h2>
              </div>
              <Link className="text-link" href="/blogs">
                All mental health information
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <div className="resources-preview-grid">
              {featuredArticles.map((article, index) => (
                <Reveal key={article.title} delay={index * 0.06}>
                  <a
                    className="resource-preview-item"
                    href={article.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {article.image && (
                      <span className="resource-preview-image">
                        <Image
                          src={article.image}
                          alt={article.imageAlt ?? ""}
                          fill
                          unoptimized
                          sizes="(max-width: 760px) 100vw, 32vw"
                        />
                      </span>
                    )}
                    <span className="resource-preview-meta">
                      Mental health information
                    </span>
                    <strong>{article.title}</strong>
                    <span className="resource-preview-link">
                      Read article <ArrowUpRight size={15} aria-hidden="true" />
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {featuredNews.length > 0 && (
        <section
          className="news-preview section-pad"
          aria-labelledby="news-preview-heading"
        >
          <div className="section-container">
            <div className="news-preview-heading">
              <div className="news-preview-intro">
                <h2 id="news-preview-heading">News and events.</h2>
              </div>
              <Link className="text-link" href="/news-and-events">
                All news and events
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <div className="news-preview-list">
              {featuredNews.map((item, index) => {
                const [date, ...description] = item.text.split(" · ");
                return (
                  <Reveal key={item.title} delay={index * 0.06}>
                    <a
                      className="news-preview-item"
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.image && (
                        <span className="news-preview-image">
                          <Image
                            src={item.image}
                            alt={item.imageAlt ?? ""}
                            fill
                            unoptimized
                            sizes="(max-width: 760px) 100vw, 25vw"
                          />
                        </span>
                      )}
                      <span className="news-preview-copy">
                        <small className="news-preview-date">{date}</small>
                        <strong>{item.title}</strong>
                        <small>{description.join(" · ")}</small>
                        <span className="team-preview-link">
                          Read more <ArrowUpRight size={15} aria-hidden="true" />
                        </span>
                      </span>
                    </a>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="faq-preview section-pad">
        <div className="section-container faq-preview-layout">
          <div className="faq-preview-intro">
            <h2>Questions are welcome.</h2>
            <p>Clear answers about appointments and support from Access Psych.</p>
            <Link className="text-link" href="/frequently-asked-questions">
              Visit frequently asked questions
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <FAQAccordion items={featuredFaqs} />
        </div>
      </section>

      <section className="careers-preview" aria-label="Careers at Access Psych">
        <div className="section-container careers-preview-inner">
          <div className="careers-preview-copy">
            <h2>Make a difference with Access Psych.</h2>
            <Link className="button button-dark" href="/careers">
              Current vacancies <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="careers-preview-image">
            <ParallaxPhoto
              src="/images/careers-banner.jpg"
              alt="A collaborative multidisciplinary healthcare and psychology team"
              className="parallax-photo"
              sizes="(max-width: 760px) 100vw, 44vw"
            />
          </div>
        </div>
      </section>

      <section className="newsletter-preview" aria-label="Newsletter">
        <div className="section-container newsletter-preview-inner">
          <div>
            <h2>{pages.newsletter.intro}</h2>
          </div>
          <NewsletterForm />
        </div>
      </section>

      <section className="country-section section-pad">
        <div className="section-container country-panel">
          <div>
            <h2>Acknowledgement of Country</h2>
            <p>
              Access Psych acknowledges the Traditional Custodians of the land
              upon which we live and work, and pays respect to Elders past and
              present. We strive to foster acceptance, respect for diversity
              and a workplace free of intolerance, discrimination, harassment
              and violence.
            </p>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="final-cta-bg" aria-hidden="true">
          <Image
            src="/images/final-cta-bg.jpg"
            alt=""
            fill
            unoptimized
            sizes="100vw"
            className="final-cta-bg-img"
          />
          <div className="final-cta-overlay" />
        </div>
        <div className="section-container final-cta-inner">
          <div>
            <h2>Book online now.</h2>
          </div>
          <div className="final-cta-actions">
            <a
              className="button button-dark"
              href={BOOKING_PORTAL}
              target="_blank"
              rel="noreferrer"
            >
              Book online now <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a className="final-cta-contact" href={EMAIL_LINK}>
              info@accesspsych.com.au
            </a>
            <a className="final-cta-contact" href={PHONE_LINK}>
              <Phone size={17} aria-hidden="true" />
              1800 APSYCH (1800 277 924)
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
