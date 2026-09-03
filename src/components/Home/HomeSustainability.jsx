"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Leaf } from "lucide-react";

import { useLocale } from "@/components/LocaleProvider/LocaleProvider";
import "@/app/products/scroll-demo/magic-bento.css";
import "./HomePage.css";

const SUSTAINABILITY_GLOW = "45, 90, 74";

const sustainabilityCopy = {
  en: {
    titleLead: "Sustainability",
    titleTail: "built to perform. Designed to use less.",
    pillars: [
      ["Measure what matters", "We are building a clearer picture of product and operational impact so progress can be tracked and explained."],
      ["Make every mix count", "Reliable application helps reduce avoidable rework, material loss and premature replacement on working sites."],
      ["Choose better inputs", "We continue to assess raw materials, packaging and energy choices that lower impact without compromising site performance."],
    ],
  },
  de: {
    titleLead: "Nachhaltigkeit",
    titleTail: "die Leistung bringt. Entwickelt für weniger Verbrauch.",
    pillars: [
      ["Messen, was zählt", "Wir schaffen ein klareres Bild der Auswirkungen von Produkten und Abläufen, damit Fortschritte verfolgt und erklärt werden können."],
      ["Jede Mischung zählt", "Eine zuverlässige Anwendung hilft, vermeidbare Nacharbeit, Materialverluste und vorzeitigen Austausch auf Baustellen zu reduzieren."],
      ["Bessere Rohstoffe wählen", "Wir bewerten weiterhin Rohstoffe, Verpackungen und Energieoptionen, die die Auswirkungen senken, ohne die Leistung auf der Baustelle zu beeinträchtigen."],
    ],
  },
};

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

export default function HomeSustainability() {
  const { locale } = useLocale();
  const copy = sustainabilityCopy[locale];
  const pillarsRef = useRef(null);
  const cleanupRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function initEffects() {
      window.gsap = gsap;
      await loadScript("/products-scroll-demo/magic-bento.js");
      if (cancelled) return;

      const grid = pillarsRef.current;
      if (!grid) return;

      delete grid.dataset.magicBentoReady;
      cleanupRef.current?.();
      cleanupRef.current = window.initMagicBento?.(grid, {
        cardSelector: ".home-sustainability__pillar",
        glowColor: SUSTAINABILITY_GLOW,
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
    <section
      className="home-sustainability bento-section"
      aria-labelledby="sustainability-title"
      style={{
        "--product-spec-glow": SUSTAINABILITY_GLOW,
        "--product-spec-glow-shadow": "rgba(45, 90, 74, 0.22)",
      }}
    >
      <div className="home-sustainability__inner">
        <div className="home-sustainability__intro home-section-intro">
          <h2 id="sustainability-title" className="home-section-heading">
            <strong className="home-sustainability__title-lead">
              <Leaf className="home-sustainability__title-icon" aria-hidden="true" strokeWidth={2.1} />
              {copy.titleLead}
            </strong>{" "}
            {copy.titleTail}
          </h2>
        </div>

        <div className="home-sustainability__pillars" ref={pillarsRef}>
          <article className="home-sustainability__pillar home-sustainability__pillar--measure">
            <div className="home-sustainability__illustration home-sustainability__illustration--photo" aria-hidden="true">
              <img
                src="/home-media/sustainability-measure.webp"
                alt=""
                loading="lazy"
                decoding="async"
              />
              <div className="home-sustainability__illustration-shade" aria-hidden="true" />
            </div>
            <h3>{copy.pillars[0][0]}</h3>
            <p>{copy.pillars[0][1]}</p>
          </article>

          <article className="home-sustainability__pillar home-sustainability__pillar--mix">
            <div className="home-sustainability__illustration home-sustainability__illustration--photo" aria-hidden="true">
              <img
                src="/home-media/sustainability-mix.webp"
                alt=""
                loading="lazy"
                decoding="async"
              />
              <div className="home-sustainability__illustration-shade" aria-hidden="true" />
            </div>
            <h3>{copy.pillars[1][0]}</h3>
            <p>{copy.pillars[1][1]}</p>
          </article>

          <article className="home-sustainability__pillar home-sustainability__pillar--inputs">
            <div className="home-sustainability__illustration home-sustainability__illustration--photo" aria-hidden="true">
              <img
                src="/home-media/sustainability-inputs.webp"
                alt=""
                loading="lazy"
                decoding="async"
              />
              <div className="home-sustainability__illustration-shade" aria-hidden="true" />
            </div>
            <h3>{copy.pillars[2][0]}</h3>
            <p>{copy.pillars[2][1]}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
