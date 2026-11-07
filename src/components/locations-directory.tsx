"use client";

import { useMemo, useState } from "react";
import { MapPin, Search } from "lucide-react";
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
            <span className="section-eyebrow">View our clinics by state</span>
            <h2>Find a clinic near you.</h2>
          </div>
          <span className="clinic-count">{filtered.length} {filtered.length === 1 ? "clinic" : "clinics"}</span>
        </div>
        <div className="location-filters">
          <label>
            <span>Search clinics</span>
            <span className="search-input-wrap"><Search size={17} aria-hidden="true" /><input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="City, address or state" /></span>
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
            <article className="location-card" key={`${location.state}-${location.city}`}>
              <span className="location-state"><MapPin size={14} aria-hidden="true" />{location.state}</span>
              <h3>{location.city}</h3>
              <p>{location.address}</p>
              {location.note && <small>{location.note}</small>}
            </article>
          ))}
          {filtered.length === 0 && <p className="no-locations">No clinics match that search.</p>}
        </div>
      </div>
    </section>
  );
}
