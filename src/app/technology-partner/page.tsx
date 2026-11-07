import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  BrainCircuit,
  CalendarCheck,
  Check,
  ClipboardList,
  Hand,
  KeyRound,
  MessagesSquare,
  PhoneForwarded,
  RefreshCw,
  Route,
  ShieldCheck,
} from "lucide-react";
import Reveal from "@/components/reveal";
import { TechnologyProgressLine } from "@/components/home-interactions";
import { HOME_IMAGE, BOOKING_PORTAL } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Technology Partner",
  description:
    "Learn about the Access Psych and JobGen.AI technology partnership. Clinical care always stays with qualified clinicians.",
  alternates: { canonical: "/technology-partner" },
  openGraph: {
    title: "Technology Partner | Access Psych",
    description:
      "Learn about the Access Psych and JobGen.AI technology partnership.",
    url: "/technology-partner",
    images: [HOME_IMAGE],
  },
};

const proposedCapabilities = [
  { title: "Enquiry intake", tag: "24/7 · confirm", icon: MessagesSquare },
  { title: "Calendar booking", tag: "Live · confirm", icon: CalendarCheck },
  { title: "Phone forwarding", tag: "Keep your number · confirm", icon: PhoneForwarded },
  { title: "Smart routing", tag: "Team routing · confirm", icon: Route },
  { title: "Unified channels", tag: "Web · voice · chat · confirm", icon: BrainCircuit },
  { title: "CRM connection", tag: "Real-time sync · confirm", icon: RefreshCw },
];

const guardrails = [
  { title: "Approved facts only", icon: Check },
  { title: "Identity verification", icon: KeyRound },
  { title: "Warm handoff to a human", icon: Hand },
  { title: "Complete audit trail", icon: ClipboardList },
];

export default function TechnologyPartnerPage() {
  return (
    <main id="main" className="technology-page">
      <section className="technology-hero">
        <div className="section-container">
          <nav className="technology-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">›</span>
            <span aria-current="page">Technology Partner</span>
          </nav>
          <div className="technology-hero-grid">
            <div className="technology-hero-copy">
              <span className="section-eyebrow">Australian workforce partnership</span>
              <h1>Built with JobGen.AI</h1>
              <p>
                Access Psych and JobGen.AI are exploring how thoughtful
                technology can support the admin and enquiries around mental
                health care.
              </p>
              <div className="partner-wordmark" aria-label="Access Psych and JobGen.AI">
                <span>Access Psych</span>
                <span aria-hidden="true">×</span>
                <span>JobGen.AI</span>
              </div>
            </div>
            <div className="agent-dashboard" aria-label="Illustrative technology dashboard">
              <div className="dashboard-topbar">
                <span className="dashboard-brand"><i /> JobGen.AI</span>
                <span className="dashboard-live"><i /> Live Agent Engine <small>Demo</small></span>
              </div>
              <div className="dashboard-body">
                <div className="dashboard-sidebar">
                  <span className="dashboard-sidebar-dot is-selected" />
                  <span className="dashboard-sidebar-dot" />
                  <span className="dashboard-sidebar-dot" />
                </div>
                <div className="dashboard-content">
                  <span className="dashboard-label">WORKSPACE OVERVIEW · CONCEPT</span>
                  <strong>Workforce orchestration</strong>
                  <div className="dashboard-agent-row">
                    <span><Bot size={19} aria-hidden="true" /></span>
                    <span><b>Agent placeholder</b><small>Capabilities to confirm</small></span>
                    <i />
                  </div>
                  <div className="dashboard-agent-row">
                    <span><MessagesSquare size={19} aria-hidden="true" /></span>
                    <span><b>Agent placeholder</b><small>Integration to confirm</small></span>
                    <i />
                  </div>
                  <div className="dashboard-activity"><span />Illustrative interface · not a live Access Psych system</div>
                </div>
              </div>
              <div className="dashboard-wordmark">AP <span>×</span> JG</div>
            </div>
          </div>
        </div>
      </section>

      <section className="technology-partnership section-pad">
        <div className="section-container technology-partnership-grid">
          <Reveal className="technology-partnership-copy">
            <span className="section-eyebrow">A considered partnership</span>
            <h2>People first. Technology in support.</h2>
            <p>
              Access Psych brings qualified mental health clinicians across
              Australia, with telehealth and face-to-face services.
            </p>
            <p>
              JobGen.AI brings applied technology and workflow automation.
              Technology supports administration and enquiries; clinical care
              always stays with qualified clinicians.
            </p>
          </Reveal>
          <Reveal className="technology-partnership-image">
            <Image
              src={HOME_IMAGE}
              alt="A person speaking with a mental health clinician"
              fill
              unoptimized
              sizes="(max-width: 760px) 100vw, 48vw"
            />
            <span>Clinical care remains human-led.</span>
          </Reveal>
        </div>
      </section>

      <section className="technology-agents section-pad">
        <div className="section-container">
          <div className="technology-section-heading">
            <div>
              <span className="section-eyebrow">Meet the AI workforce</span>
              <h2>Agent details are still to be confirmed.</h2>
            </div>
            <p>
              The profiles below are placeholders only. No agents or live
              Access Psych integrations are represented as active.
            </p>
          </div>
          <div className="technology-agent-grid">
            {[1, 2].map((index) => (
              <Reveal className="technology-agent-card" key={index} delay={(index - 1) * 0.08}>
                <span className="technology-agent-avatar"><Bot size={30} aria-hidden="true" /></span>
                <span className="technology-agent-status"><i /> TODO · status unconfirmed</span>
                <span className="section-eyebrow">TODO: Confirm agent role</span>
                <h3>Agent placeholder {String(index).padStart(2, "0")}</h3>
                <p>TODO: Add an approved description of this agent’s role and verified capabilities.</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="technology-capabilities section-pad">
        <div className="section-container">
          <div className="technology-section-heading">
            <div>
              <span className="section-eyebrow">What it can do</span>
              <h2>Proposed capabilities.</h2>
            </div>
            <p>
              These are requested concepts, not confirmed Access Psych
              features. Validate each item before describing it as available.
            </p>
          </div>
          <div className="technology-capability-grid">
            {proposedCapabilities.map((capability, index) => {
              const CapabilityIcon = capability.icon;
              return (
                <Reveal key={capability.title} delay={index * 0.035}>
                  <article className="technology-capability-card">
                    <span className="technology-capability-icon"><CapabilityIcon size={22} aria-hidden="true" /></span>
                    <span className="technology-todo-tag">TODO · confirm</span>
                    <h3>{capability.title}</h3>
                    <small>{capability.tag}</small>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="technology-process section-pad">
        <div className="section-container">
          <div className="technology-section-heading">
            <div>
              <span className="section-eyebrow">How it works</span>
              <h2>A careful path to launch.</h2>
            </div>
            <p>Proposed implementation sequence — confirm the delivery process.</p>
          </div>
          <div className="technology-process-steps">
            <TechnologyProgressLine />
            {[
              "Ingest verified business knowledge",
              "Define intake & escalation rules",
              "Test in sandbox, then go live",
            ].map((step, index) => (
              <article key={step}>
                <span>{index + 1}</span>
                <h3>{step}</h3>
                <small>TODO · confirm before launch</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="technology-guardrails section-pad">
        <div className="section-container">
          <div className="technology-section-heading">
            <div>
              <span className="section-eyebrow">Accurate &amp; accountable</span>
              <h2>Designed around clear guardrails.</h2>
            </div>
            <p>TODO: Verify these safeguards are implemented before making commitments.</p>
          </div>
          <div className="technology-guardrail-grid">
            {guardrails.map((item) => {
              const GuardrailIcon = item.icon;
              return (
                <article className="technology-guardrail-card" key={item.title}>
                  <GuardrailIcon size={23} aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <small>TODO · implementation unconfirmed</small>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="technology-cta section-pad">
        <div className="section-container technology-cta-panel">
          <div>
            <span className="section-eyebrow">Start a conversation</span>
            <h2>Talk to JobGen.AI.</h2>
            <a href="mailto:hello@jobgen.ai">hello@jobgen.ai</a>
          </div>
          <div className="technology-cta-actions">
            <a className="button button-dark" href="https://jobgen.ai/" target="_blank" rel="noreferrer">
              Visit jobgen.ai <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a className="button button-outline" href={BOOKING_PORTAL} target="_blank" rel="noreferrer">
              Book a session <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
