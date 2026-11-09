import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/reveal";
import { clinicians } from "@/data/clinicians.js";

export default function TeamDirectory() {
  return (
    <section className="team-directory section-pad section-light">
      <div className="section-container">
        <div className="directory-heading">
          <div>
            <h2>Our mental health clinicians.</h2>
            <p>Access Psych has a team of mental health clinicians located across Australia.</p>
          </div>
        </div>
        <div className="team-grid">
          {clinicians.map((clinician, index) => (
            <Reveal key={clinician.name} delay={(index % 4) * 0.035}>
              <article className="clinician-card">
                <a className="clinician-photo" href={clinician.url} target="_blank" rel="noreferrer" aria-label={`View ${clinician.name}'s profile`}>
                  <Image
                    src={clinician.image}
                    alt={`${clinician.name}, ${clinician.title}`}
                    fill
                    unoptimized
                    sizes="(max-width: 650px) 100vw, (max-width: 1000px) 50vw, 25vw"
                  />
                </a>
                <div className="clinician-info">
                  <span>{clinician.title}</span>
                  <h3>{clinician.name}</h3>
                  <p>{clinician.description}</p>
                  <a href={clinician.url} target="_blank" rel="noreferrer">View profile <ArrowUpRight size={15} aria-hidden="true" /></a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
