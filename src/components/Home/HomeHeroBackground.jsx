"use client";

import { useEffect, useState } from "react";

const HERO_MEDIA = {
  animated: "/optimized/home/home-page-intro.webp",
  poster: "/optimized/home/home-page-intro-poster.webp",
};

export default function HomeHeroBackground() {
  const [mediaSrc, setMediaSrc] = useState(HERO_MEDIA.poster);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = navigator.connection?.saveData;
    if (reducedMotion || saveData) return;

    const loadAnimated = () => setMediaSrc(HERO_MEDIA.animated);

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(loadAnimated, { timeout: 3000 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(loadAnimated, 1500);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <div className="home-hero__background">
      <img
        className="home-hero__video"
        src={mediaSrc}
        alt=""
        decoding="async"
        fetchPriority="high"
      />
      <div className="home-hero__video-scrim" aria-hidden="true" />
    </div>
  );
}
