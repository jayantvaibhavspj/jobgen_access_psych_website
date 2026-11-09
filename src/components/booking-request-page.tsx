import { ArrowUpRight, ClipboardList } from "lucide-react";
import { SITE_URL } from "@/lib/site-data";

export default function BookingRequestPage() {
  return (
    <main id="main" className="inner-page">
      <section className="page-hero">
        <div className="page-hero-background"><div className="page-hero-overlay" /></div>
        <div className="page-hero-content section-container">
          <h1>Bookings &amp; Referrals</h1>
          <p>Who is completing this form? Please select from below to get started.</p>
        </div>
        <span className="page-hero-index" aria-hidden="true">Access Psych</span>
      </section>
      <section className="booking-form-info section-pad">
        <div className="section-container booking-form-panel">
          <span className="booking-form-icon"><ClipboardList size={26} aria-hidden="true" /></span>
          <div>
            <h2>Make a booking or referral.</h2>
            <p>The Access Psych booking and referral form is available through the official Access Psych website.</p>
            <a className="button button-dark" href={`${SITE_URL}/online-booking-request/`} target="_blank" rel="noreferrer">
              Open booking request form <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
