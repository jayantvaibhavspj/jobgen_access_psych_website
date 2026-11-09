import { ArrowUpRight, ClipboardList, Phone, CalendarCheck } from "lucide-react";
import { BOOKING_PORTAL, PHONE_LINK } from "@/lib/site-data";

export default function BookingRequestPage() {
  return (
    <main id="main" className="inner-page">
      <section className="page-hero section-dark">
        <div className="page-hero-background"><div className="page-hero-overlay" /></div>
        <div className="page-hero-content section-container">
          <span className="page-eyebrow-tag">Appointments &amp; Referrals</span>
          <h1>Bookings &amp; Referrals</h1>
          <p>Book online with immediate clinician availability across Australia or connect directly with our intake team.</p>
        </div>
        <span className="page-hero-index" aria-hidden="true">Access Psych</span>
      </section>
      <section className="booking-form-info section-pad section-light">
        <div className="section-container booking-form-panel">
          <span className="booking-form-icon"><ClipboardList size={26} aria-hidden="true" /></span>
          <div>
            <h2>Book your appointment online today.</h2>
            <p>Select your preferred clinician, appointment time, and session format (Telehealth or in-person clinic) through our secure booking portal.</p>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginTop: "18px" }}>
              <a className="button button-coral" href={BOOKING_PORTAL} target="_blank" rel="noreferrer">
                Book Online Portal <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a className="button button-dark" href={PHONE_LINK}>
                Call 1800 277 924 <Phone size={15} aria-hidden="true" style={{ marginLeft: "6px" }} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
