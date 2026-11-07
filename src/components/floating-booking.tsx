"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { BOOKING_PORTAL } from "@/lib/site-data";

export default function FloatingBooking() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 460);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  if (!visible) return null;

  return (
    <a className="floating-booking" href={BOOKING_PORTAL} target="_blank" rel="noreferrer">
      Book online now <ArrowUpRight size={17} aria-hidden="true" />
    </a>
  );
}
