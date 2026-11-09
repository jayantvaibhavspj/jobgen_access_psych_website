"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Compass,
  MapPin,
  Plus,
  Radio,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FormEvent,
  PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ContentCard } from "@/lib/site-data";
import {
  AUSTRALIA_STATES,
  AUSTRALIA_PINS,
  AUSTRALIA_MAP_WIDTH,
  AUSTRALIA_MAP_HEIGHT,
} from "@/data/australia-map-data";

type Location = {
  state: string;
  city: string;
};

type FAQ = {
  title: string;
  answer: string;
};

export function AustraliaLocations({ locations }: { locations: Location[] }) {
  const [activeCity, setActiveCity] = useState<string | null>("Sydney CBD");
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  const activePin = AUSTRALIA_PINS.find((pin) => pin.city === activeCity);

  return (
    <div className="australia-locations">
      <div className="australia-map-wrap">
        <svg
          className="australia-map"
          viewBox={`0 0 ${AUSTRALIA_MAP_WIDTH} ${AUSTRALIA_MAP_HEIGHT}`}
          role="img"
          aria-label="Real interactive geographic map of Australia showing clinic locations"
        >
          <defs>
            <linearGradient id="auStateGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f3edff" />
              <stop offset="100%" stopColor="#e2d6fc" />
            </linearGradient>
            <filter id="landGlow" x="-8%" y="-8%" width="120%" height="120%">
              <feDropShadow dx="0" dy="8" stdDeviation="14" floodColor="#1c2b38" floodOpacity="0.12" />
            </filter>
          </defs>

          {/* Graticule grid */}
          <g className="map-graticule" stroke="rgba(28, 43, 56, 0.08)" strokeDasharray="3 4">
            <line x1="40" y1="120" x2="600" y2="120" />
            <line x1="40" y1="240" x2="600" y2="240" />
            <line x1="40" y1="360" x2="600" y2="360" />
            <line x1="40" y1="480" x2="600" y2="480" />
            <line x1="160" y1="30" x2="160" y2="490" />
            <line x1="280" y1="30" x2="280" y2="490" />
            <line x1="400" y1="30" x2="400" y2="490" />
            <line x1="520" y1="30" x2="520" y2="490" />
          </g>

          {/* Ocean geographic watermarks */}
          <g className="map-ocean-labels" fill="rgba(28, 43, 56, 0.32)" fontSize="9" letterSpacing="0.18em" fontWeight="600" textAnchor="middle">
            <text x="80" y="240">INDIAN OCEAN</text>
            <text x="560" y="110">CORAL SEA</text>
            <text x="575" y="440">TASMAN SEA</text>
            <text x="240" y="470">SOUTHERN OCEAN</text>
            <text x="160" y="22" fill="rgba(28, 43, 56, 0.25)" fontSize="8">120°E</text>
            <text x="280" y="22" fill="rgba(28, 43, 56, 0.25)" fontSize="8">130°E</text>
            <text x="400" y="22" fill="rgba(28, 43, 56, 0.25)" fontSize="8">140°E</text>
            <text x="520" y="22" fill="rgba(28, 43, 56, 0.25)" fontSize="8">150°E</text>
          </g>

          {/* Compass rose */}
          <g className="map-compass" transform="translate(585, 42)">
            <circle cx="0" cy="0" r="16" fill="rgba(255, 255, 255, 0.85)" stroke="rgba(28, 43, 56, 0.15)" strokeWidth="1" />
            <polygon points="0,-13 3,-2 0,0 -3,-2" fill="#1c2b38" />
            <polygon points="0,13 3,2 0,0 -3,2" fill="rgba(28, 43, 56, 0.3)" />
            <polygon points="-13,0 -2,-3 0,0 -2,3" fill="rgba(28, 43, 56, 0.3)" />
            <polygon points="13,0 2,-3 0,0 2,3" fill="rgba(28, 43, 56, 0.3)" />
            <text x="0" y="-15" textAnchor="middle" fontSize="7" fontWeight="700" fill="#1c2b38">N</text>
          </g>

          {/* Real Australian states */}
          <g className="australia-states-layer" filter="url(#landGlow)">
            {AUSTRALIA_STATES.map((st) => {
              const isStateHovered = hoveredState === st.name;
              return (
                <path
                  key={st.code}
                  className={`australia-state-polygon${isStateHovered ? " is-hovered" : ""}`}
                  d={st.d}
                  fill="url(#auStateGrad)"
                  stroke="#9966ff"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                  onMouseEnter={() => setHoveredState(st.name)}
                  onMouseLeave={() => setHoveredState(null)}
                />
              );
            })}
          </g>

          {/* Interactive capital city pins */}
          <g className="australia-pins-layer">
            {AUSTRALIA_PINS.map((pin) => {
              const isActive = activeCity === pin.city;
              return (
                <g
                  key={pin.city}
                  className={`australia-pin-group${isActive ? " is-active" : ""}`}
                  transform={`translate(${pin.x}, ${pin.y})`}
                  onClick={() => setActiveCity(pin.city)}
                  onMouseEnter={() => {
                    setActiveCity(pin.city);
                    setHoveredState(pin.state);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {/* Radar pulse wave */}
                  <circle
                    className="pin-pulse-wave"
                    r={isActive ? 20 : 11}
                    fill={isActive ? "rgba(153, 102, 255, 0.25)" : "rgba(28, 43, 56, 0.08)"}
                    stroke={isActive ? "#9966ff" : "rgba(28, 43, 56, 0.2)"}
                    strokeWidth={isActive ? 1.5 : 1}
                  />
                  {/* Inner halo */}
                  <circle
                    className="pin-inner-halo"
                    r={isActive ? 10 : 6.5}
                    fill={isActive ? "#9966ff" : "rgba(28, 43, 56, 0.15)"}
                  />
                  {/* Core dot */}
                  <circle
                    className="pin-core-dot"
                    r={isActive ? 5 : 3.5}
                    fill={isActive ? "#ffffff" : "#1c2b38"}
                    stroke={isActive ? "#9966ff" : "#ffffff"}
                    strokeWidth={1.5}
                  />
                  {/* City label text */}
                  <text
                    x={pin.x > 500 ? -12 : 12}
                    y={4}
                    textAnchor={pin.x > 500 ? "end" : "start"}
                    className={`pin-label${isActive ? " is-active" : ""}`}
                    fontSize="11"
                    fontWeight={isActive ? "700" : "600"}
                    fill={isActive ? "#1c2b38" : "rgba(28, 43, 56, 0.85)"}
                  >
                    {pin.city.replace(" CBD", "")}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Live floating callout card on active city */}
        {activePin && (
          <div
            className="map-floating-callout"
            style={{
              left: `${(activePin.x / AUSTRALIA_MAP_WIDTH) * 100}%`,
              top: `${(activePin.y / AUSTRALIA_MAP_HEIGHT) * 100}%`,
            }}
          >
            <div className="map-callout-inner">
              <div className="map-callout-head">
                <span className="map-callout-status">● {activePin.status}</span>
                <span className="map-callout-state">{activePin.state}</span>
              </div>
              <strong className="map-callout-title">{activePin.city}</strong>
              <p className="map-callout-desc">Psychology, Therapy & Mental Health Services</p>
              <a href="/our-locations" className="map-callout-link">
                View clinic details <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        )}

        {/* Bottom card bar with scale and hovered state */}
        <div className="map-footer-bar">
          <div className="map-scale-metric">
            <span className="map-scale-line" />
            <span className="map-scale-text">500 km</span>
          </div>
          <span className="map-hover-state">
            {hoveredState ? `Selected: ${hoveredState}` : "Click or hover any city pin"}
          </span>
          <span className="map-telehealth-badge">
            <Radio size={12} /> Telehealth Nationwide
          </span>
        </div>
      </div>

      <div className="locations-preview-list">
        {locations.map((location) => {
          const isActive = activeCity === location.city;
          return (
            <a
              className={`location-preview-row${isActive ? " is-active" : ""}`}
              href="/our-locations"
              key={`${location.state}-${location.city}`}
              onMouseEnter={() => {
                setActiveCity(location.city);
                setHoveredState(location.state);
              }}
              onFocus={() => {
                setActiveCity(location.city);
                setHoveredState(location.state);
              }}
            >
              <div className={`location-pin-icon${isActive ? " is-active" : ""}`}>
                <MapPin size={18} aria-hidden="true" />
              </div>
              <span className="location-info">
                <strong>{location.city}</strong>
                <small>{location.state}</small>
              </span>
              <div className="location-arrow">
                <ArrowUpRight size={18} aria-hidden="true" />
              </div>
            </a>
          );
        })}

        {/* Quick state coverage pills */}
        <div className="map-quick-states">
          <span className="map-quick-label">Coverage:</span>
          {["NSW", "VIC", "QLD", "SA", "WA", "TAS", "ACT", "NT"].map((code) => (
            <span key={code} className="state-badge-pill">
              {code}
            </span>
          ))}
        </div>

        <a className="locations-cta-link text-link" href="/our-locations">
          View all 70+ locations across Australia <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

export function FAQAccordion({ items }: { items: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <div className="faq-preview-list">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const answerId = `homepage-faq-answer-${index}`;

        return (
          <div className="faq-item" key={item.title}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                {item.title}
                <Plus className="faq-toggle-icon" size={22} aria-hidden="true" />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={answerId}
                  className="faq-answer"
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.26, ease: "easeOut" }}
                >
                  <p>{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export function NewsletterForm() {
  const router = useRouter();

  function continueToNewsletter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/newsletter");
  }

  return (
    <form className="newsletter-form" onSubmit={continueToNewsletter}>
      <div className="newsletter-form-fields">
        <label className="sr-only" htmlFor="homepage-newsletter-email">Email address</label>
        <input
          id="homepage-newsletter-email"
          type="email"
          autoComplete="email"
          placeholder="Email address"
          aria-describedby="newsletter-form-note"
          required
        />
        <button className="button button-dark" type="submit">
          Continue <ArrowUpRight size={16} aria-hidden="true" />
        </button>
      </div>
      <p className="newsletter-form-note" id="newsletter-form-note">
        Your email address isn&apos;t saved here. Continue to the newsletter page
        to complete your subscription.
      </p>
    </form>
  );
}

export function MarqueeTicker() {
  const items = [
    "Telehealth",
    "Face-to-face",
    "Ages 12+",
    "Clinicians across Australia",
    "Medicare rebates available",
    "EAP for workplaces",
  ];

  return (
    <div className="marquee-ticker" aria-label={items.join(" · ")}>
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div className="marquee-group" aria-hidden={copy === 1} key={copy}>
            {items.map((item) => (
              <span className="marquee-item" key={`${copy}-${item}`}>
                <span aria-hidden="true">✦</span> {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TrustStrip() {
  const credentials = [
    "Medicare rebates available",
    "Employee Assistance Program",
    "Telehealth appointments",
    "Face-to-face sessions",
  ];

  return (
    <section className="trust-strip" aria-label="Access Psych services">
      <div className="section-container trust-strip-inner">
        <span className="trust-strip-label">Support that meets you where you are</span>
        <div className="trust-chip-list">
          {credentials.map((credential) => (
            <span className="trust-chip" key={credential}>
              <Check size={15} aria-hidden="true" />
              {credential}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

const processSteps = [
  { title: "Book online or call", detail: "Choose the way that feels easiest." },
  { title: "Meet your clinician", detail: "Telehealth or in person." },
  { title: "Start feeling supported", detail: "Take the next step at your pace." },
];

export function HowItWorks() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="how-it-works section-pad" aria-labelledby="how-it-works-title">
      <div className="section-container">
        <div className="how-it-works-heading">
          <h2 id="how-it-works-title">How it works.</h2>
        </div>
        <div className="process-steps">
          <motion.span
            className="process-progress"
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: reduceMotion ? 0 : 1, ease: "easeOut" }}
          />
          {processSteps.map((step, index) => (
            <article className="process-step" key={step.title}>
              <span className="process-step-number">{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TechnologyProgressLine() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      className="technology-process-line"
      aria-hidden="true"
      initial={reduceMotion ? false : { scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: reduceMotion ? 0 : 1.1, ease: "easeOut" }}
    />
  );
}

export function MetricsPlaceholder() {
  return (
    <section className="metrics-placeholder" aria-label="Access Psych impact">
      <div className="section-container metrics-placeholder-inner">
        <span className="section-eyebrow">Our reach</span>
        <p>
          TODO: Add verified Access Psych statistics when approved figures are
          available.
        </p>
      </div>
    </section>
  );
}

export function TestimonialSlider() {
  const [active, setActive] = useState(0);
  const pointerStart = useRef<number | null>(null);
  const placeholders = Array.from({ length: 8 }, (_, index) => ({
    quote: "TODO: Add an approved, consented client testimonial.",
    attribution: "TODO: Confirm approved attribution.",
    index,
  }));
  const current = placeholders[active];

  function move(direction: number) {
    setActive((value) => (value + direction + placeholders.length) % placeholders.length);
  }

  function handlePointerDown(event: PointerEvent<HTMLElement>) {
    pointerStart.current = event.clientX;
  }

  function handlePointerUp(event: PointerEvent<HTMLElement>) {
    if (pointerStart.current === null) return;
    const distance = event.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(distance) > 48) move(distance > 0 ? -1 : 1);
  }

  return (
    <section className="testimonial-section section-pad" aria-labelledby="testimonials-title">
      <div className="section-container testimonial-layout">
        <div>
          <span className="section-eyebrow">In their words</span>
          <h2 id="testimonials-title">Stories of support.</h2>
          <p className="testimonial-note">
            Placeholder only. Client testimonials require explicit consent
            before publication.
          </p>
        </div>
        <div
          className="testimonial-card"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => { pointerStart.current = null; }}
          aria-roledescription="carousel"
          aria-label="Client testimonials placeholder"
        >
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={current.index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              <span aria-hidden="true">“</span>
              <p>{current.quote}</p>
              <footer>{current.attribution}</footer>
            </motion.blockquote>
          </AnimatePresence>
          <div className="testimonial-controls">
            <span aria-live="polite">
              {active + 1}/{placeholders.length}
            </span>
            <button type="button" aria-label="Previous testimonial" onClick={() => move(-1)}>
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
            <button type="button" aria-label="Next testimonial" onClick={() => move(1)}>
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

const valueImages: Record<string, string> = {
  Authentic: "/images/values-authentic.jpg",
  Compassionate: "/images/values-compassionate.jpg",
  Dependable: "/images/values-dependable.jpg",
  Collaborative: "/images/values-collaborative.jpg",
};

export function ValuesStory({ values }: { values: ContentCard[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const nextIndex = Math.min(values.length - 1, Math.floor(progress * values.length));
    setActiveIndex(nextIndex);
  });

  return (
    <section
      className="values-story-section"
      aria-label="Our purpose and values"
      ref={sectionRef}
    >
      <div className="values-story-sticky">
        <div className="section-container values-story-layout">
          <div className="values-story-intro">
            <h2>Connecting people with the mental health support they need, when they need it.</h2>
            <a className="text-link" href="/vision-purpose-values">
              Vision, purpose &amp; values <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <div className="values-story-steps" aria-label="Values">
              {values.map((value, index) => (
                <button
                  type="button"
                  key={value.title}
                  aria-current={activeIndex === index ? "step" : undefined}
                  onClick={() => setActiveIndex(index)}
                >
                  {value.title}
                </button>
              ))}
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.article
              className="values-story-card"
              key={values[activeIndex]?.title}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: reduceMotion ? 0 : 0.32 }}
            >
              {(values[activeIndex]?.backgroundImage || valueImages[values[activeIndex]?.title]) && (
                <div className="values-story-card-bg" aria-hidden="true">
                  <Image
                    src={values[activeIndex]?.backgroundImage || valueImages[values[activeIndex]?.title]}
                    alt=""
                    fill
                    unoptimized
                    sizes="(max-width: 760px) 100vw, 650px"
                    className="values-story-card-bg-img"
                    priority
                  />
                  <div className="values-story-card-overlay" />
                </div>
              )}
              <div className="values-story-card-content">
                <h3>{values[activeIndex]?.title}</h3>
                <p>{values[activeIndex]?.text}</p>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
      <div className="values-story-progress" aria-hidden="true">
        <motion.span
          style={{ scaleX: scrollYProgress }}
          transition={{ duration: reduceMotion ? 0 : 0.1 }}
        />
      </div>
    </section>
  );
}

export function ParallaxPhoto({
  src,
  alt,
  className,
  sizes,
}: {
  src: string;
  alt: string;
  className: string;
  sizes: string;
}) {
  const imageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-16, 16]);

  return (
    <motion.div ref={imageRef} className={className} style={{ y }}>
      <Image src={src} alt={alt} fill unoptimized sizes={sizes} />
    </motion.div>
  );
}

export type ClinicianItem = {
  name: string;
  title: string;
  description?: string;
  url: string;
  image: string;
};

export function CliniciansShowcase({ clinicians }: { clinicians: ClinicianItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = clinicians.length;

  useEffect(() => {
    if (paused || count <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count);
    }, 3200);
    return () => clearInterval(interval);
  }, [paused, count]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + count) % count);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % count);
  };

  if (!clinicians || clinicians.length === 0) return null;

  const offsets = [-2, -1, 0, 1, 2];

  return (
    <div
      className="clinicians-showcase"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="clinicians-showcase-stage">
        {offsets.map((offset) => {
          const index = (activeIndex + offset + count) % count;
          const clinician = clinicians[index];
          const isCenter = offset === 0;

          return (
            <motion.div
              key={`${clinician.name}-${offset}`}
              className={`clinicians-showcase-card offset-${offset} ${isCenter ? "is-center" : ""}`}
              onClick={() => {
                if (!isCenter) {
                  setActiveIndex(index);
                }
              }}
              layout
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
            >
              <div className="clinicians-showcase-photo-wrap">
                <Image
                  src={clinician.image}
                  alt={`${clinician.name}, ${clinician.title}`}
                  fill
                  unoptimized
                  sizes="(max-width: 760px) 80vw, 320px"
                  className="clinicians-showcase-photo"
                  priority={isCenter}
                />
                <div className="clinicians-showcase-card-overlay" />
              </div>

              <div className="clinicians-showcase-info">
                <span className="clinicians-showcase-role">{clinician.title}</span>
                <strong className="clinicians-showcase-name">{clinician.name}</strong>
                {isCenter && (
                  <a
                    className="clinicians-showcase-btn"
                    href={clinician.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View profile <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="clinicians-showcase-controls">
        <button
          type="button"
          className="clinicians-nav-btn prev"
          onClick={handlePrev}
          aria-label="Previous clinician"
        >
          <ArrowLeft size={18} aria-hidden="true" />
        </button>

        <div className="clinicians-showcase-dots">
          {clinicians.slice(0, Math.min(count, 10)).map((_, i) => (
            <button
              type="button"
              key={i}
              className={`clinicians-dot ${i === activeIndex % Math.min(count, 10) ? "is-active" : ""}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to clinician ${i + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          className="clinicians-nav-btn next"
          onClick={handleNext}
          aria-label="Next clinician"
        >
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
