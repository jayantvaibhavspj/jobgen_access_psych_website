"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Search } from "lucide-react";
import { locations } from "@/lib/site-data";

export default function LocationsDirectory() {
  const [query, setQuery] = useState("");
  const [state, setState] = useState("All states");
  const states = useMemo(() => ["All states", ...new Set(locations.map((location) => location.state))], []);
  const filtered = locations.filter((location) => {
    const matchesState = state === "All states" || state === location.state;
    const matchesQuery = `${location.city} ${location.address} ${location.state}`.toLowerCase().includes(query.trim().toLowerCase());
    return matchesState && matchesQuery;
  });

  return (
    <section className="locations-directory section-pad">
      <div className="section-container">
        <div className="directory-heading">
          <div>
            <h2>Find a clinic near you.</h2>
          </div>
          <span className="clinic-count">{filtered.length} {filtered.length === 1 ? "clinic" : "clinics"}</span>
        </div>
        <div className="location-filters">
          <label>
            <span>Search clinics</span>
            <span className="search-input-wrap">
              <Search size={17} aria-hidden="true" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type="search"
                placeholder="City, address or state"
              />
            </span>
          </label>
          <label>
            <span>Choose a state</span>
            <select value={state} onChange={(event) => setState(event.target.value)}>
              {states.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
        </div>
        <div className="location-grid">
          {filtered.map((location) => (
            <article
              className="location-card has-bg-image"
              key={`${location.state}-${location.city}-${location.address}`}
            >
              {/* Background image & dark gradient overlay */}
              <div className="location-card-bg" aria-hidden="true">
                <Image
                  src={location.image || "/images/locations/sydney-cbd.jpg"}
                  alt=""
                  fill
                  sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="location-card-img"
                  unoptimized
                />
                <div className="location-card-overlay" />
              </div>

              {/* Foreground Content with fixed equal-height spacing */}
              <div className="location-card-content">
                <div className="location-card-top">
                  <span className="location-state-badge">
                    <MapPin size={13} aria-hidden="true" />
                    <span>{location.state}</span>
                  </span>
                  <span className="location-availability-tag">Clinic &amp; Telehealth</span>
                </div>

                <div className="location-card-middle">
                  <h3 className="location-city-title">{location.city}</h3>
                  <p className="location-address-text">{location.address}</p>
                </div>

                <div className="location-card-bottom">
                  {location.note ? (
                    <span className="location-note-badge" title={location.note}>
                      {location.note}
                    </span>
                  ) : (
                    <span className="location-note-badge location-note-default">
                      Consultation Rooms &amp; Telehealth
                    </span>
                  )}
                  <Link href="/online-booking-request" className="location-action-btn">
                    <span>Book Clinic</span>
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
          {filtered.length === 0 && <p className="no-locations">No clinics match that search.</p>}
        </div>
      </div>
    </section>
  );
}
