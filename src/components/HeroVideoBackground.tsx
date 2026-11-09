"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export interface HeroClip {
  id: string;
  src: string;
  label: string;
  headline: string;
  line: string;
  nameTag: string;
  faceSide: "left" | "right" | "center";
}

export const HERO_CLIPS: HeroClip[] = [
  {
    id: "olivia",
    src: "/videos/olivia.mp4",
    label: "YOUR FIRST POINT OF CONTACT",
    headline: "A warm welcome, every time.",
    line: "Our clinical support team is here to guide you from your very first call.",
    nameTag: "Olivia Mutli · Clinical Support Services",
    faceSide: "right",
  },
  {
    id: "tabitha",
    src: "/videos/tabitha.mp4",
    label: "BEHIND THE SCENES",
    headline: "Care that runs smoothly.",
    line: "Keeping your appointments organised so you can focus on feeling better.",
    nameTag: "Tabitha Sen · Clinical Support Services",
    faceSide: "left",
  },
  {
    id: "alex",
    src: "/videos/alex.mp4",
    label: "MENTAL HEALTH SOCIAL WORK",
    headline: "Listening with care.",
    line: "Practical, compassionate support for life's hardest moments.",
    nameTag: "Alex Hogg · Mental Health Social Worker",
    faceSide: "center",
  },
  {
    id: "amber",
    src: "/videos/amber.mp4",
    label: "PSYCHOLOGY & THERAPY",
    headline: "A clinician who listens.",
    line: "Evidence-based therapy in a space that feels safe and unhurried.",
    nameTag: "Amber Jones · Registered Psychologist",
    faceSide: "right",
  },
  {
    id: "anika",
    src: "/videos/anika.mp4",
    label: "TELEHEALTH ACROSS AUSTRALIA",
    headline: "Support, wherever you are.",
    line: "Connect with a qualified clinician from the comfort of your home.",
    nameTag: "Anika Brett · Registered Psychologist",
    faceSide: "left",
  },
];

interface HeroVideoBackgroundProps {
  title?: React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

export default function HeroVideoBackground({
  title,
  actions,
  children,
}: HeroVideoBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);

  // 'A' or 'B' indicates which video element is currently active and playing
  const currentSlotRef = useRef<"A" | "B">("A");
  const isTransitioningRef = useRef<boolean>(false);
  const isMountedRef = useRef<boolean>(false);

  const [activeClipIndex, setActiveClipIndex] = useState<number>(0);
  const [captionIndex, setCaptionIndex] = useState<number>(0);
  const [captionAnimClass, setCaptionAnimClass] = useState<"enter" | "exit" | "visible">("visible");
  const [progress, setProgress] = useState<number>(0);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const [isInViewport, setIsInViewport] = useState<boolean>(true);

  // Transition to a specified clip index
  const startTransition = useCallback((targetIndex: number) => {
    if (isTransitioningRef.current) return;
    if (targetIndex === activeClipIndex) return;

    const currentSlot = currentSlotRef.current;
    const currentVideo = currentSlot === "A" ? videoARef.current : videoBRef.current;
    const incomingSlot = currentSlot === "A" ? "B" : "A";
    const incomingVideo = incomingSlot === "A" ? videoARef.current : videoBRef.current;

    if (!incomingVideo || !currentVideo) return;

    isTransitioningRef.current = true;
    setActiveClipIndex(targetIndex);

    // 1. Prepare incoming video
    const targetClip = HERO_CLIPS[targetIndex];
    if (incomingVideo.src !== targetClip.src && !incomingVideo.src.endsWith(targetClip.src)) {
      incomingVideo.src = targetClip.src;
    }
    incomingVideo.currentTime = 0;
    incomingVideo.style.transition = "none";
    incomingVideo.style.opacity = "0";
    incomingVideo.style.zIndex = "2";
    currentVideo.style.zIndex = "1";

    // Start caption fade-out (400ms duration)
    setCaptionAnimClass("exit");

    // 2. Play incoming video and wait for 'playing' event before starting the fade
    let fadeStarted = false;
    const beginFade = () => {
      if (fadeStarted) return;
      fadeStarted = true;

      // Transition next video's opacity 0 -> 1 over 1200ms with specified cubic-bezier
      incomingVideo.style.transition = "opacity 1200ms cubic-bezier(0.4, 0, 0.2, 1)";
      incomingVideo.style.opacity = "1";

      // When the new video reaches about 50% opacity (~500ms), switch caption and fade in (600ms)
      setTimeout(() => {
        setCaptionIndex(targetIndex);
        setCaptionAnimClass("enter");
      }, 500);

      // On transitionend (1200ms): complete role swap and cleanup
      setTimeout(() => {
        if (!isMountedRef.current) return;
        currentVideo.pause();
        currentVideo.currentTime = 0;
        currentVideo.style.transition = "none";
        currentVideo.style.opacity = "0";
        currentVideo.style.zIndex = "1";

        // Preload following clip in old video element
        const nextNextIndex = (targetIndex + 1) % HERO_CLIPS.length;
        incomingVideo.style.zIndex = "1";
        currentSlotRef.current = incomingSlot;

        currentVideo.src = HERO_CLIPS[nextNextIndex].src;
        currentVideo.preload = "auto";
        currentVideo.load();

        isTransitioningRef.current = false;
        setCaptionAnimClass("visible");
      }, 1250);
    };

    const handlePlaying = () => {
      beginFade();
    };

    incomingVideo.addEventListener("playing", handlePlaying, { once: true });

    const playPromise = incomingVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        isTransitioningRef.current = false;
        setCaptionIndex(targetIndex);
        setCaptionAnimClass("visible");
      });
    }

    // Safety timeout in case 'playing' event is delayed
    setTimeout(() => {
      if (!fadeStarted && isMountedRef.current) {
        beginFade();
      }
    }, 400);
  }, [activeClipIndex]);

  // Initial setup: check motion preference, setup intersection observer, start clip 0
  useEffect(() => {
    isMountedRef.current = true;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    motionQuery.addEventListener("change", handleMotionChange);

    // IntersectionObserver to pause when hero is scrolled out of viewport
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Tab visibility change listener
    const handleVisibility = () => {
      const activeVideo = currentSlotRef.current === "A" ? videoARef.current : videoBRef.current;
      if (document.hidden) {
        activeVideo?.pause();
      } else if (isInViewport && !motionQuery.matches) {
        activeVideo?.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // Ensure active video is playing
    const videoA = videoARef.current;
    if (videoA && !motionQuery.matches) {
      videoA.play().catch(() => {});
    }

    return () => {
      isMountedRef.current = false;
      motionQuery.removeEventListener("change", handleMotionChange);
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [isInViewport]);

  // Pause / Resume based on viewport visibility
  useEffect(() => {
    const activeVideo = currentSlotRef.current === "A" ? videoARef.current : videoBRef.current;
    if (!activeVideo) return;

    if (!isInViewport) {
      activeVideo.pause();
    } else if (!isReducedMotion) {
      activeVideo.play().catch(() => {});
    }
  }, [isInViewport, isReducedMotion]);

  // Playback monitor: update progress bar and trigger transition 1.2s before clip ends
  useEffect(() => {
    if (isReducedMotion) return;

    let animId: number;

    const checkTime = () => {
      const activeVideo = currentSlotRef.current === "A" ? videoARef.current : videoBRef.current;
      if (activeVideo && activeVideo.duration > 0) {
        const currentTime = activeVideo.currentTime;
        const duration = activeVideo.duration;

        // Progress fraction from 0 to 1
        const pct = Math.min(1, Math.max(0, currentTime / duration));
        setProgress(pct);

        // Start transition exactly 1.2s before the current clip ends
        const remaining = duration - currentTime;
        if (!isTransitioningRef.current && remaining <= 1.2 && remaining > 0) {
          const nextIndex = (activeClipIndex + 1) % HERO_CLIPS.length;
          startTransition(nextIndex);
        }
      }

      animId = requestAnimationFrame(checkTime);
    };

    animId = requestAnimationFrame(checkTime);
    return () => cancelAnimationFrame(animId);
  }, [activeClipIndex, isReducedMotion, startTransition]);

  // Handle manual jump via progress bar click
  const handleBarClick = (targetIndex: number) => {
    if (isTransitioningRef.current || targetIndex === activeClipIndex) return;
    startTransition(targetIndex);
  };

  const currentClip = HERO_CLIPS[captionIndex];

  return (
    <div className="hero-video-container" ref={containerRef} aria-hidden="false">
      {/* 1. Full-bleed Video Background Layer (Pure video, no photo) */}
      <div className="hero-video-backdrop" aria-hidden="true">
        {/* Video Elements A & B */}
        <video
          ref={videoARef}
          className="hero-bg-video video-slot-a"
          muted
          playsInline
          autoPlay
          preload="auto"
          src={HERO_CLIPS[0].src}
          style={{ opacity: 1, zIndex: 1 }}
        />
        <video
          ref={videoBRef}
          className="hero-bg-video video-slot-b"
          muted
          playsInline
          preload="auto"
          src={HERO_CLIPS[1].src}
          style={{ opacity: 0, zIndex: 1 }}
        />

        {/* Dark brand gradient overlay for high text contrast on the left */}
        <div className="hero-video-gradient-overlay" />
      </div>

      {/* 2. Unified Hero Foreground - Merged on the Left */}
      <div className="hero-inner">
        <div className="hero-copy">
          {title && <div className="hero-slide-copy">{title}</div>}

          {/* Video-Related Synchronized Text Overlay */}
          <div className="hero-video-caption-block" aria-live="polite">
            <div className={`hero-caption-content anim-${captionAnimClass}`}>
              <span className="hero-caption-label">{currentClip.label}</span>
              <h2 className="hero-caption-headline">{currentClip.headline}</h2>
              <p className="hero-caption-line">{currentClip.line}</p>
              <span className="hero-caption-name">{currentClip.nameTag}</span>
            </div>

            {/* Action Buttons */}
            {actions}

            {/* 5-Segment Progress Indicator */}
            <div className="hero-caption-progress" role="tablist" aria-label="Hero video clips">
              {HERO_CLIPS.map((clip, index) => {
                const isActive = index === captionIndex;
                const isCompleted = index < captionIndex;
                const barFillWidth = isActive
                  ? `${Math.round(progress * 100)}%`
                  : isCompleted
                  ? "100%"
                  : "0%";

                return (
                  <button
                    key={clip.id}
                    type="button"
                    className={`hero-progress-segment${isActive ? " is-active" : ""}`}
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Show clip ${index + 1} of 5: ${clip.headline}`}
                    onClick={() => handleBarClick(index)}
                  >
                    <span
                      className="hero-progress-fill"
                      style={{ width: barFillWidth }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}

