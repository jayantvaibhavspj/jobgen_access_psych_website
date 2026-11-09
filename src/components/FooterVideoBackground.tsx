"use client";

import { useEffect, useRef, useState, useCallback, ReactNode } from "react";
import Image from "next/image";

export interface VideoClip {
  id: string;
  src: string;
  label: string;
  headline: string;
  line: string;
  nameTag: string;
  align: "left" | "right";
}

export const FOOTER_CLIPS: VideoClip[] = [
  {
    id: "olivia",
    src: "/videos/olivia.mp4",
    label: "YOUR FIRST POINT OF CONTACT",
    headline: "A warm welcome, every time.",
    line: "Our clinical support team is here to guide you from your very first call.",
    nameTag: "Olivia Mutli · Clinical Support Services",
    align: "left",
  },
  {
    id: "tabitha",
    src: "/videos/tabitha.mp4",
    label: "BEHIND THE SCENES",
    headline: "Care that runs smoothly.",
    line: "Keeping your appointments organised so you can focus on feeling better.",
    nameTag: "Tabitha Sen · Clinical Support Services",
    align: "right",
  },
  {
    id: "alex",
    src: "/videos/alex.mp4",
    label: "MENTAL HEALTH SOCIAL WORK",
    headline: "Listening with care.",
    line: "Practical, compassionate support for life's hardest moments.",
    nameTag: "Alex Hogg · Mental Health Social Worker",
    align: "left",
  },
  {
    id: "amber",
    src: "/videos/amber.mp4",
    label: "PSYCHOLOGY & THERAPY",
    headline: "A clinician who listens.",
    line: "Evidence-based therapy in a space that feels safe and unhurried.",
    nameTag: "Amber Jones · Registered Psychologist",
    align: "left",
  },
  {
    id: "anika",
    src: "/videos/anika.mp4",
    label: "TELEHEALTH ACROSS AUSTRALIA",
    headline: "Support, wherever you are.",
    line: "Connect with a qualified clinician from the comfort of your home.",
    nameTag: "Anika Brett · Registered Psychologist",
    align: "right",
  },
];

interface FooterVideoBackgroundProps {
  children?: ReactNode;
}

export default function FooterVideoBackground({ children }: FooterVideoBackgroundProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);

  const activeSlotRef = useRef<"A" | "B">("A");
  const [, setActiveSlot] = useState<"A" | "B">("A");

  const currentClipIndexRef = useRef<number>(0);
  const [currentClipIndex, setCurrentClipIndex] = useState<number>(0);

  const [captionIndex, setCaptionIndex] = useState<number>(0);
  const [captionState, setCaptionState] = useState<"visible" | "exiting" | "entering">("visible");

  const [progress, setProgress] = useState<number>(0);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const reducedMotionRef = useRef<boolean>(false);
  const [, setAutoplayBlocked] = useState<boolean>(false);

  const isTransitioningRef = useRef<boolean>(false);
  const captionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Transition to target clip (Next video fades IN on top, current video stays at opacity 1 underneath)
  const transitionTo = useCallback((targetIndex: number) => {
    if (isTransitioningRef.current) return;

    if (reducedMotionRef.current) {
      setCaptionIndex(targetIndex);
      setCurrentClipIndex(targetIndex);
      currentClipIndexRef.current = targetIndex;
      return;
    }

    isTransitioningRef.current = true;
    const currentSlot = activeSlotRef.current;
    const nextSlot = currentSlot === "A" ? "B" : "A";
    const curVid = currentSlot === "A" ? videoARef.current : videoBRef.current;
    const nextVid = nextSlot === "A" ? videoARef.current : videoBRef.current;

    if (!curVid || !nextVid) {
      isTransitioningRef.current = false;
      return;
    }

    const targetClip = FOOTER_CLIPS[targetIndex];

    // Ensure next video has target source loaded
    if (!nextVid.src.includes(targetClip.src)) {
      nextVid.src = targetClip.src;
      nextVid.load();
    }
    nextVid.currentTime = 0;

    // Next video sits above current video at opacity 0
    nextVid.style.zIndex = "2";
    nextVid.style.opacity = "0";
    nextVid.style.transition = "none";

    // Current video stays visible underneath at opacity 1
    curVid.style.zIndex = "1";
    curVid.style.opacity = "1";

    // Start caption fade out (400ms)
    setCaptionState("exiting");

    // Play next video and wait for 'playing' event before starting the fade
    const startFade = () => {
      // Force layout calculation
      void nextVid.offsetWidth;

      // Next video fades in over 1200ms
      nextVid.style.transition = "opacity 1200ms cubic-bezier(0.4, 0, 0.2, 1)";
      nextVid.style.opacity = "1";

      // At ~600ms (when new video reaches ~50% opacity):
      if (captionTimerRef.current) clearTimeout(captionTimerRef.current);
      captionTimerRef.current = setTimeout(() => {
        // Swap active slot so timeUpdate from nextVid now drives progress
        activeSlotRef.current = nextSlot;
        setActiveSlot(nextSlot);

        setCaptionIndex(targetIndex);
        setCurrentClipIndex(targetIndex);
        currentClipIndexRef.current = targetIndex;

        const curPct = nextVid.duration ? (nextVid.currentTime / nextVid.duration) * 100 : 0;
        setProgress(curPct);

        setCaptionState("entering");
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setCaptionState("visible");
          });
        });
      }, 600);

      // After 1200ms: transition is complete
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = setTimeout(() => {
        // Pause and reset outgoing video
        curVid.pause();
        curVid.currentTime = 0;
        curVid.style.opacity = "0";
        curVid.style.zIndex = "1";
        curVid.style.transition = "none";

        // Preload following clip into the now-idle slot
        const followingIndex = (targetIndex + 1) % FOOTER_CLIPS.length;
        curVid.src = FOOTER_CLIPS[followingIndex].src;
        curVid.preload = "auto";
        curVid.load();

        isTransitioningRef.current = false;
      }, 1200);
    };

    const onPlaying = () => {
      nextVid.removeEventListener("playing", onPlaying);
      startFade();
    };

    nextVid.addEventListener("playing", onPlaying);
    nextVid.play().catch((err) => {
      console.warn("Video play error:", err);
      nextVid.removeEventListener("playing", onPlaying);
      isTransitioningRef.current = false;
      setAutoplayBlocked(true);
    });
  }, []);

  // Time update listener on active video
  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>, slot: "A" | "B") => {
    if (slot !== activeSlotRef.current) return;
    const vid = e.currentTarget;
    if (!vid.duration) return;

    const pct = Math.min(100, Math.max(0, (vid.currentTime / vid.duration) * 100));
    setProgress(pct);

    // 1.2s before the clip ends, start transition to the next clip
    if (vid.duration - vid.currentTime <= 1.2 && !isTransitioningRef.current) {
      const nextIdx = (currentClipIndexRef.current + 1) % FOOTER_CLIPS.length;
      transitionTo(nextIdx);
    }
  };

  // Click on progress bar jump
  const handleBarClick = (targetIndex: number) => {
    if (isTransitioningRef.current || targetIndex === currentClipIndexRef.current) {
      return;
    }
    transitionTo(targetIndex);
  };

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setReducedMotion(true);
      reducedMotionRef.current = true;
      return;
    }
    const handler = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      reducedMotionRef.current = e.matches;
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Initialize and start first video
  useEffect(() => {
    if (reducedMotionRef.current) return;

    const videoA = videoARef.current;
    const videoB = videoBRef.current;
    if (!videoA || !videoB) return;

    // Load first clip in Video A
    videoA.src = FOOTER_CLIPS[0].src;
    videoA.preload = "auto";
    videoA.load();
    videoA.style.zIndex = "2";
    videoA.style.opacity = "0";

    // Preload second clip in Video B
    videoB.src = FOOTER_CLIPS[1].src;
    videoB.preload = "auto";
    videoB.load();
    videoB.style.zIndex = "1";
    videoB.style.opacity = "0";

    const onFirstPlaying = () => {
      videoA.removeEventListener("playing", onFirstPlaying);
      // Fade in first clip over 1200ms from the poster
      videoA.style.transition = "opacity 1200ms cubic-bezier(0.4, 0, 0.2, 1)";
      videoA.style.opacity = "1";
    };

    videoA.addEventListener("playing", onFirstPlaying);
    videoA.play().catch((err) => {
      console.warn("Initial video autoplay failed, falling back to poster:", err);
      setAutoplayBlocked(true);
    });

    return () => {
      videoA.removeEventListener("playing", onFirstPlaying);
    };
  }, []);

  // IntersectionObserver to pause when off-screen and resume when visible
  useEffect(() => {
    const container = rootRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const isVisible = entry.isIntersecting;

        const activeVid = activeSlotRef.current === "A" ? videoARef.current : videoBRef.current;
        if (!activeVid) return;

        if (isVisible) {
          if (activeVid.paused && !reducedMotionRef.current && !isTransitioningRef.current) {
            activeVid.play().catch(() => {});
          }
        } else {
          if (!activeVid.paused) {
            activeVid.pause();
          }
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (captionTimerRef.current) clearTimeout(captionTimerRef.current);
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    };
  }, []);

  const currentDisplayClip = FOOTER_CLIPS[captionIndex];

  return (
    <div className="footer-video-wrapper" ref={rootRef}>
      {/* Background Layer: Poster Fallback, Stacked Videos, Dark Overlay */}
      <div className="footer-video-bg-layer" aria-hidden="true">
        {/* Poster Image / Fallback Layer */}
        <div className="footer-video-poster">
          <Image
            src="/images/final-cta-bg.jpg"
            alt=""
            fill
            unoptimized
            priority
            sizes="100vw"
            className="footer-video-poster-img"
          />
        </div>

        {/* Two Stacked Video Elements (A & B) */}
        {!reducedMotion && (
          <>
            <video
              ref={videoARef}
              muted
              playsInline
              preload="auto"
              onTimeUpdate={(e) => handleTimeUpdate(e, "A")}
              className="footer-bg-video video-slot-a"
              aria-hidden="true"
            />
            <video
              ref={videoBRef}
              muted
              playsInline
              preload="metadata"
              onTimeUpdate={(e) => handleTimeUpdate(e, "B")}
              className="footer-bg-video video-slot-b"
              aria-hidden="true"
            />
          </>
        )}

        {/* Dark Gradient Overlay for optimal readability */}
        <div
          className={`footer-video-overlay ${
            currentDisplayClip.align === "right" ? "overlay-align-right" : "overlay-align-left"
          }`}
        />
      </div>

      {/* Foreground Container with Content & Synced Caption */}
      <div className="section-container footer-video-foreground">
        {/* Top Content: Existing CTA Heading & Action Buttons */}
        {children}

        {/* Bottom Area: Dynamic Caption Block & Progress Indicator */}
        <div className="footer-video-caption-area">
          <div
            className={`footer-caption-block align-${currentDisplayClip.align} is-${captionState}`}
            aria-live="polite"
          >
            <span className="caption-label">{currentDisplayClip.label}</span>
            <h3 className="caption-headline">{currentDisplayClip.headline}</h3>
            <p className="caption-line">{currentDisplayClip.line}</p>
            <span className="caption-name-tag">{currentDisplayClip.nameTag}</span>

            {/* 5 Progress Bars */}
            <div className="caption-progress-bars" role="group" aria-label="Video clips">
              {FOOTER_CLIPS.map((item, idx) => {
                const isActive = idx === currentClipIndex;
                const isPast = idx < currentClipIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`progress-bar-btn ${isActive ? "is-active" : ""}`}
                    onClick={() => handleBarClick(idx)}
                    aria-label={`Show clip ${idx + 1} of ${FOOTER_CLIPS.length}: ${item.nameTag}`}
                  >
                    <span className="progress-bar-track">
                      <span
                        className="progress-bar-fill"
                        style={{
                          width: isActive ? `${progress}%` : isPast ? "100%" : "0%",
                        }}
                      />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
