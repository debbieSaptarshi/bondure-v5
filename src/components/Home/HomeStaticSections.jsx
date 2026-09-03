"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import { useLocale } from "@/components/LocaleProvider/LocaleProvider";
import "@/app/products/scroll-demo/magic-bento.css";
import "./HomePage.css";

const STATS_GLOW = "89, 22, 24";

const homeCopy = {
  en: {
    statsLabel: "Key figures",
    stats: ["tests performed", "Team members", "Years of innovation", "Continents"],
    standardsLead: "Excellence",
    standardsTail: "through stringent quality standards.",
    certificationLogo: "certification logo",
  },
  de: {
    statsLabel: "Kennzahlen",
    stats: ["durchgeführte Tests", "Teammitglieder", "Jahre Innovation", "Kontinente"],
    standardsLead: "Exzellenz",
    standardsTail: "durch strenge Qualitätsstandards.",
    certificationLogo: "Zertifizierungslogo",
  },
};

const statValues = [
  ["700,000+", "/home-media/stat-tests-performed.svg"],
  ["1,000+", "/home-media/stat-team.svg"],
  ["30+", "/home-media/stat-innovation.svg"],
  ["2", "/home-media/stat-continents.svg"],
];

function StatCardHoverStrokes() {
  return (
    <span className="home-stat-card__strokes" aria-hidden="true">
      <svg className="home-stat-card__stroke home-stat-card__stroke--accent" viewBox="0 0 2453 2273" fill="none">
        <path
          pathLength="1"
          d="M227.549 1818.76C227.549 1818.76 406.016 2207.75 569.049 2130.26C843.431 1999.85 -264.104 1002.3 227.549 876.262C552.918 792.849 773.647 2456.11 1342.05 2130.26C1885.43 1818.76 14.9644 455.772 760.548 137.262C1342.05 -111.152 1663.5 2266.35 2209.55 1972.76C2755.6 1679.18 1536.63 384.467 1826.55 137.262C2013.5 -22.1463 2209.55 381.262 2209.55 381.262"
        />
      </svg>
      <svg className="home-stat-card__stroke home-stat-card__stroke--base" viewBox="0 0 2250 2535" fill="none">
        <path
          pathLength="1"
          d="M1661.28 2255.51C1661.28 2255.51 2311.09 1960.37 2111.78 1817.01C1944.47 1696.67 718.456 2870.17 499.781 2255.51C308.969 1719.17 2457.51 1613.83 2111.78 963.512C1766.05 313.198 427.949 2195.17 132.281 1455.51C-155.219 736.292 2014.78 891.514 1708.78 252.012C1437.81 -314.29 369.471 909.169 132.281 566.512C18.1772 401.672 244.781 193.012 244.781 193.012"
        />
      </svg>
    </span>
  );
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing?.dataset.loaded === "true") {
      resolve();
      return;
    }
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.addEventListener("load", () => {
      script.dataset.loaded = "true";
      resolve();
    }, { once: true });
    script.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)), { once: true });
    document.body.appendChild(script);
  });
}

export default function HomeStaticSections() {
  const { locale } = useLocale();
  const copy = homeCopy[locale];
  const statsGridRef = useRef(null);
  const cleanupRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function initEffects() {
      window.gsap = gsap;
      await loadScript("/products-scroll-demo/magic-bento.js");
      if (cancelled) return;

      const grid = statsGridRef.current;
      if (!grid) return;

      delete grid.dataset.magicBentoReady;
      cleanupRef.current?.();
      cleanupRef.current = window.initMagicBento?.(grid, {
        cardSelector: ".home-stat-card",
        glowColor: STATS_GLOW,
        textAutoHide: false,
      }) || null;
    }

    initEffects().catch(console.error);

    return () => {
      cancelled = true;
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, []);

  return (
    <>
      <section
        className="home-stats bento-section"
        aria-label={copy.statsLabel}
        style={{
          "--product-spec-glow": STATS_GLOW,
          "--product-spec-glow-shadow": "rgba(89, 22, 24, 0.22)",
        }}
      >
        <div className="home-stats__inner">
          <div className="home-stats__grid" ref={statsGridRef}>
            {statValues.map(([value, illustration], index) => {
              const label = copy.stats[index];
              return (
              <article className="home-stat-card" key={`${value}-${label}`}>
                <img src={illustration} alt="" loading="lazy" decoding="async" />
                <span className="home-stat-card__spacer" aria-hidden="true" />
                <StatCardHoverStrokes />
                <strong>{value}</strong>
                <p className="home-stat-card__label">{label}</p>
              </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="home-standards" aria-labelledby="standards-title">
        <div className="home-standards__inner">
          <div className="home-section-intro">
            <h2 id="standards-title" className="home-standards__title home-section-heading">
              <strong>{copy.standardsLead}</strong> {copy.standardsTail}
            </h2>
          </div>
          <div className="home-standards__logos">
            <img src="/home-media/en-certification-logo.svg" alt={`EN ${copy.certificationLogo}`} loading="lazy" decoding="async" />
            <img src="/home-media/iso-certification-logo.svg" alt={`ISO ${copy.certificationLogo}`} loading="lazy" decoding="async" />
            <img src="/home-media/isi-certification-logo.svg" alt={`ISI ${copy.certificationLogo}`} loading="lazy" decoding="async" />
            <img src="/home-media/certification-logo.svg" alt={`IGBC ${copy.certificationLogo}`} loading="lazy" decoding="async" />
          </div>
        </div>
      </section>
    </>
  );
}
