import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  CalendarCheck,
  Check,
  ClipboardList,
  Database,
  Globe,
  Hand,
  KeyRound,
  MessagesSquare,
  PhoneCall,
  PhoneForwarded,
  PhoneOutgoing,
  Route,
  ShieldCheck,
} from "lucide-react";
import Reveal from "@/components/reveal";
import { HOME_IMAGE } from "@/lib/site-data";

const JOBGEN_DEMO_URL = "https://calendly.com/jobgen-demo/30min";
const JOBGEN_SITE_URL = "https://jobgen.ai/";
const JOBGEN_IMAGE_PATH = "/images/jobgen-partner/";

export const metadata: Metadata = {
  title: "Technology Partner | JobGen.AI",
  description:
    "Meet JobGen.AI, Access Psych's technology partner. Explore JobGen.AI's voice-agent capabilities, with a clear distinction between platform features and Access Psych services.",
  alternates: { canonical: "/technology-partner" },
  openGraph: {
    title: "Technology Partner | Access Psych",
    description:
      "Learn about JobGen.AI's platform capabilities and the safeguards required before any Access Psych use.",
    url: "/technology-partner",
    images: [HOME_IMAGE],
  },
};

const agents = [
  {
    name: "Jenny",
    role: "Inbound AI receptionist",
    image: "jenny-front.webp",
    alt: "Jenny, JobGen.AI's AI receptionist, shown in a professional portrait",
    icon: PhoneCall,
    description:
      "Greets callers, answers approved business questions, takes messages and can help book or reschedule appointments against a configured calendar.",
  },
  {
    name: "Olivia",
    role: "Outbound sales agent",
    image: "olivia-front.webp",
    alt: "Olivia, JobGen.AI's outbound sales agent, shown in a professional portrait",
    icon: PhoneOutgoing,
    description:
      "Follows up with eligible contacts, checks interest and arranges callbacks. JobGen.AI also describes WhatsApp and CRM workflows for this agent.",
  },
];

const capabilities = [
  {
    title: "Call intake",
    description:
      "Answer enquiries with approved information and capture a message when a person needs follow-up.",
    image: "call-intake.webp",
    alt: "Receptionist at a front desk handling customer calls",
    icon: PhoneCall,
  },
  {
    title: "Appointment calendars",
    description:
      "Check available times, apply configured duration and staff rules, book or reschedule, then send confirmations.",
    image: "calendar-sync.webp",
    alt: "Professional checking appointment schedules on a tablet",
    icon: CalendarCheck,
  },
  {
    title: "Missed-call coverage",
    description:
      "Forward unanswered, overflow or after-hours calls while keeping the number customers already know.",
    image: "carrier-forward.webp",
    alt: "Smartphone receiving an incoming customer call on a desk",
    icon: PhoneForwarded,
  },
  {
    title: "Human handoff",
    description:
      "Route conversations to the right person and pass on context for a smoother handover.",
    image: "smart-routing.webp",
    alt: "Team members coordinating customer call routing and handoffs",
    icon: Route,
  },
  {
    title: "Website chat and voice",
    description:
      "Give website visitors another way to ask questions and share what they need.",
    image: "website-voice.webp",
    alt: "Customer browsing a website on a laptop",
    icon: Globe,
  },
  {
    title: "Inbound reception",
    description:
      "Provide an AI receptionist for inbound calls, enquiries and appointment requests, including outside office hours.",
    image: "inbound-voice.webp",
    alt: "Receptionist greeting a visitor at a front desk",
    icon: Bot,
  },
  {
    title: "Outbound follow-up",
    description:
      "Follow up with eligible contacts, qualify interest and arrange callbacks on a schedule set by the business.",
    image: "outbound-voice.webp",
    alt: "Professional making an outbound call beside a city window",
    icon: PhoneOutgoing,
  },
  {
    title: "WhatsApp workflows",
    description:
      "Connect messaging with voice workflows for coordinated follow-up across channels.",
    image: "whatsapp-voice.webp",
    alt: "Person sending a message on a smartphone outdoors",
    icon: MessagesSquare,
  },
  {
    title: "CRM activity",
    description:
      "Capture contact details, enquiry intent and conversation summaries in a connected CRM.",
    image: "crm-leads.webp",
    alt: "CRM dashboard showing customer enquiries and a sales pipeline",
    icon: Database,
  },
];

const implementationSteps = [
  {
    title: "Prepare approved information",
    description:
      "Provide verified service information and define what the agent may answer.",
    image: "cp-1.webp",
    alt: "Audio equipment and waveform representing knowledge preparation",
  },
  {
    title: "Set rules and escalation",
    description:
      "Agree what to ask, when to verify identity and how to route an enquiry to a person.",
    image: "cp-2.webp",
    alt: "Compliance and security checks displayed on a tablet",
  },
  {
    title: "Test before launch",
    description:
      "Run sandbox conversations, review the results and approve the workflow before going live.",
    image: "cp-6.webp",
    alt: "Voice interaction being tested in a software sandbox",
  },
];

const safeguards = [
  {
    title: "Approved information",
    description:
      "Agents use business-approved facts rather than inventing policies, prices or availability.",
    icon: Check,
  },
  {
    title: "Identity checks",
    description:
      "A workflow can require identity details before sharing customer-specific information.",
    icon: KeyRound,
  },
  {
    title: "Human handoff",
    description:
      "Teams can define when an enquiry should be transferred to a person with context.",
    icon: Hand,
  },
  {
    title: "Audit records",
    description:
      "Call audio, transcripts and recording consent can be logged; handling must be reviewed before use.",
    icon: ClipboardList,
  },
];

const integrations = [
  "WhatsApp",
  "Microsoft Teams",
  "HubSpot",
  "Google Drive",
  "Slack",
  "LinkedIn",
  "Calendly",
  "Dropbox",
  "Notion",
  "Airtable",
  "Mailchimp",
  "Stripe",
  "Zapier",
  "Salesforce",
  "Google Calendar",
  "MYOB",
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
              <span className="section-eyebrow">Technology partner</span>
              <h1>Meet JobGen.AI</h1>
              <p>
                JobGen.AI builds voice and chat agents for reception,
                appointment enquiries and business workflows. Access Psych
                partners with JobGen.AI to explore technology that can support
                administration around care.
              </p>
              <div className="technology-hero-actions">
                <a
                  className="button button-dark"
                  href={JOBGEN_DEMO_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  Book a JobGen.AI demo
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
                <a
                  className="button button-outline"
                  href={JOBGEN_SITE_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit JobGen.AI
                  <ArrowRight size={17} aria-hidden="true" />
                </a>
              </div>
              <div className="partner-wordmark" aria-label="Access Psych and JobGen.AI">
                <span>Access Psych</span>
                <span aria-hidden="true">×</span>
                <Image
                  src={`${JOBGEN_IMAGE_PATH}jobgen-white.webp`}
                  alt=""
                  width={28}
                  height={28}
                  unoptimized
                />
                <strong>JobGen.AI</strong>
              </div>
            </div>
            <figure className="technology-hero-visual">
              <Image
                src={`${JOBGEN_IMAGE_PATH}hero.webp`}
                alt="JobGen.AI voice agent interface on a smartphone"
                fill
                preload
                sizes="(max-width: 760px) 100vw, 52vw"
              />
              <figcaption>
                JobGen.AI voice-agent platform
                <small>Image courtesy of JobGen.AI</small>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="technology-partnership section-pad">
        <div className="section-container technology-partnership-content">
          <Reveal className="technology-partnership-copy">
            <span className="section-eyebrow">People first. Technology in support.</span>
            <h2>Support the admin around care.</h2>
            <p>
              JobGen.AI describes conversational agents for answering
              enquiries, helping with appointment workflows, routing calls and
              coordinating follow-up. Those are platform capabilities—not a
              statement that every feature is currently active at Access Psych.
            </p>
          </Reveal>
          <aside className="technology-scope-note">
            <ShieldCheck size={24} aria-hidden="true" />
            <div>
              <strong>Clinical care remains with qualified clinicians.</strong>
              <p>
                Any Access Psych use requires separate configuration and
                approval, including privacy, security, consent and clinical
                governance checks before patient information or recordings are
                involved.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="technology-agents section-pad">
        <div className="section-container">
          <div className="technology-section-heading">
            <div>
              <span className="section-eyebrow">JobGen.AI agent examples</span>
              <h2>Two roles in the JobGen.AI workforce.</h2>
            </div>
            <p>
              These profiles describe JobGen.AI products. They are not
              representations of agents currently deployed by Access Psych.
            </p>
          </div>
          <div className="technology-agent-grid">
            {agents.map((agent) => {
              const AgentIcon = agent.icon;
              return (
                <Reveal className="technology-agent-card" key={agent.name}>
                  <div className="technology-agent-image">
                    <Image
                      src={`${JOBGEN_IMAGE_PATH}${agent.image}`}
                      alt={agent.alt}
                      fill
                      sizes="(max-width: 760px) 100vw, 24vw"
                    />
                  </div>
                  <div className="technology-agent-copy">
                    <span className="technology-agent-tag">
                      <AgentIcon size={15} aria-hidden="true" />
                      {agent.role}
                    </span>
                    <h3>{agent.name}</h3>
                    <p>{agent.description}</p>
                    {agent.name === "Olivia" && (
                      <small className="technology-agent-note">
                        Outbound patient contact is not presented as an
                        Access Psych workflow.
                      </small>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="technology-capabilities section-pad">
        <div className="section-container">
          <div className="technology-section-heading">
            <div>
              <span className="section-eyebrow">JobGen.AI platform overview</span>
              <h2>Reception, routing and follow-up tools.</h2>
            </div>
            <p>
              The examples below are capabilities described by JobGen.AI.
              Access Psych availability depends on separate decisions and
              implementation.
            </p>
          </div>
          <div className="technology-capability-grid">
            {capabilities.map((capability, index) => {
              const CapabilityIcon = capability.icon;
              return (
                <Reveal key={capability.title} delay={index * 0.025}>
                  <article className="technology-capability-card">
                    <div className="technology-capability-image">
                      <Image
                        src={`${JOBGEN_IMAGE_PATH}${capability.image}`}
                        alt={capability.alt}
                        fill
                        sizes="(max-width: 480px) 50vw, (max-width: 900px) 50vw, 33vw"
                      />
                    </div>
                    <div className="technology-capability-copy">
                      <span className="technology-capability-icon">
                        <CapabilityIcon size={20} aria-hidden="true" />
                      </span>
                      <h3>{capability.title}</h3>
                      <p>{capability.description}</p>
                    </div>
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
              <span className="section-eyebrow">Implementation journey</span>
              <h2>From verified information to a tested workflow.</h2>
            </div>
            <p>
              JobGen.AI outlines a three-step process. Any Access Psych rollout
              would need its own approvals before going live.
            </p>
          </div>
          <div className="technology-process-grid">
            {implementationSteps.map((step, index) => (
              <article className="technology-process-card" key={step.title}>
                <div className="technology-process-image">
                  <Image
                    src={`${JOBGEN_IMAGE_PATH}${step.image}`}
                    alt={step.alt}
                    fill
                    sizes="(max-width: 760px) 100vw, 33vw"
                  />
                </div>
                <div className="technology-process-copy">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="technology-guardrails section-pad">
        <div className="section-container">
          <div className="technology-section-heading">
            <div>
              <span className="section-eyebrow">Accuracy and accountability</span>
              <h2>Guardrails matter as much as automation.</h2>
            </div>
            <p>
              JobGen.AI describes these controls for its platform. Their
              configuration and suitability must be checked for each
              organisation and workflow.
            </p>
          </div>
          <div className="technology-guardrail-grid">
            {safeguards.map((safeguard) => {
              const SafeguardIcon = safeguard.icon;
              return (
                <article className="technology-guardrail-card" key={safeguard.title}>
                  <SafeguardIcon size={24} aria-hidden="true" />
                  <h3>{safeguard.title}</h3>
                  <p>{safeguard.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="technology-integrations section-pad">
        <div className="section-container technology-integrations-content">
          <div>
            <span className="section-eyebrow">Tool ecosystem</span>
            <h2>Connectors JobGen.AI lists.</h2>
            <p>
              JobGen.AI describes connections with the services below. Their
              availability depends on the workflow and configuration; this
              list does not mean Access Psych systems are connected.
            </p>
          </div>
          <ul className="technology-integration-list" aria-label="JobGen.AI listed integrations">
            {integrations.map((integration) => (
              <li key={integration}>{integration}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="technology-cta section-pad">
        <div className="section-container">
          <div className="technology-cta-panel">
            <div className="technology-cta-photo" aria-hidden="true">
              <Image
                src={`${JOBGEN_IMAGE_PATH}city.webp`}
                alt=""
                fill
                sizes="100vw"
              />
            </div>
            <div className="technology-cta-copy">
              <span className="section-eyebrow">Explore the platform</span>
              <h2>See JobGen.AI in action.</h2>
              <p>
                Visit JobGen.AI or book a product demonstration to learn more
                about its current capabilities.
              </p>
              <div className="technology-cta-actions">
                <a
                  className="button button-dark"
                  href={JOBGEN_DEMO_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  Book a demo
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
                <a
                  className="button button-outline"
                  href={JOBGEN_SITE_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit JobGen.AI
                  <ArrowRight size={17} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
          <p className="technology-source-note">
            Product details and imagery courtesy of JobGen.AI. The capabilities
            and integrations on this page describe JobGen.AI&apos;s platform;
            they do not imply that these services are active at Access Psych.
          </p>
        </div>
      </section>
    </main>
  );
}
