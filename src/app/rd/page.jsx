"use client";

import "./rd-page.css";
import "@/app/products/scroll-demo/magic-bento.css";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import RDHero from "@/components/RDHero/RDHero";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import Copy from "@/components/Copy/Copy";
import { useLocale } from "@/components/LocaleProvider/LocaleProvider";

gsap.registerPlugin(ScrollTrigger);

const RD_EVIDENCE_GLOW = "64, 19, 21";
const RD_PEOPLE_GLOW = "89, 22, 24";

function initBentoGrid(grid, cardSelector, glowColor) {
  if (!grid) return null;
  delete grid.dataset.magicBentoReady;
  return window.initMagicBento?.(grid, {
    cardSelector,
    glowColor,
    textAutoHide: false,
  }) || null;
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

const copy = {
  en: {
    hero: {
      title: "Product science built for real construction conditions",
      description:
        "From formulation to field verification, every Bondure system is developed through structured research, controlled testing, and repeatable site evidence.",
      ctaLabel: "Connect with our technical team to learn more",
      ctaHref: "/connect",
      imageAlt: "Bondure R&D process diagram showing on-site application, modified QSPR model, computational tools, automated factories, lab and field validation, and deploy and continuous improve",
    },
    partnershipsHeading: "Research partnerships.",
    partnershipsImageAlt: "Bondure research partnerships with IIT Bombay and MPA University of Stuttgart",
    peopleHeading: "One shared standard.",
    peopleDescription: "Research. Application. Verification.",
    researchRoles: [
      {
        title: "Materials research",
        description: "Formulation and chemistry.",
        image: "/home-media/materials-research-lab.png",
        alt: "Bonding material powder sample prepared for laboratory analysis in a material testing lab",
      },
      {
        title: "Application engineering",
        description: "Application and substrates.",
        image: "/home-media/site-testing.webp",
        alt: "Technical specialist carrying out a construction-site test",
      },
      {
        title: "Independent verification",
        description: "Repeatable external testing.",
        image: "/home-media/independent-verification-site.png",
        alt: "Technical team inspecting bonded block samples on a construction site",
      },
    ],
    developmentHeading: "From lab to site.",
    developmentDescription: "Evidence guides every release.",
    developmentAlt: "Engineer reviewing technical work in an industrial setting",
    developmentStepperLabel: "Research and development process",
    developmentSteps: [
      ["Question", "Define the challenge."],
      ["Small batch", "Compare variations."],
      ["Controlled test", "Measure performance."],
      ["Conditioning", "Apply relevant stress."],
      ["Verification", "Repeat critical tests."],
      ["Site trial", "Observe real application."],
      ["Release", "Approve supported results."],
    ],
    evidenceHeading: "Evidence, retained.",
    evidenceDescription: "Clear records. Traceable decisions.",
    evidenceRecords: [
      ["Batch records", "Every trial documented.", "/home-media/batch-records-illustration.svg"],
      ["Conditioning results", "Every change compared.", "/home-media/conditioning-results-illustration.svg"],
      ["Field reports", "Every application observed.", "/home-media/field-reports-illustration.svg"],
    ],
    ctaHeading: "The science of bonding.",
  },
  de: {
    hero: {
      title: "Produktwissenschaft für reale Baustellenbedingungen",
      description:
        "Von der Formulierung bis zur Baustellenverifizierung wird jedes Bondure-System durch strukturierte Forschung, kontrollierte Tests und reproduzierbare Nachweise entwickelt.",
      ctaLabel: "Kontaktieren Sie unser Technikteam für mehr Informationen",
      ctaHref: "/connect",
      imageAlt: "Bondure F&E-Prozessdiagramm mit Baustellenanwendung, modifiziertem QSPR-Modell, computergestützten Werkzeugen, automatisierten Fabriken, Labor- und Feldvalidierung sowie Einsatz und kontinuierlicher Verbesserung",
    },
    partnershipsHeading: "Forschungspartnerschaften.",
    partnershipsImageAlt: "Bondure Forschungspartnerschaften mit IIT Bombay und der MPA Universität Stuttgart",
    peopleHeading: "Ein gemeinsamer Standard.",
    peopleDescription: "Forschung. Anwendung. Verifizierung.",
    researchRoles: [
      {
        title: "Materialforschung",
        description: "Formulierung und Chemie.",
        image: "/home-media/materials-research-lab.png",
        alt: "Pulverprobe eines Verbindungsmaterials in einem Materialprüflabor",
      },
      {
        title: "Anwendungstechnik",
        description: "Anwendung und Untergründe.",
        image: "/home-media/site-testing.webp",
        alt: "Technischer Spezialist bei einer Prüfung auf der Baustelle",
      },
      {
        title: "Unabhängige Verifizierung",
        description: "Reproduzierbare externe Prüfungen.",
        image: "/home-media/independent-verification-site.png",
        alt: "Technisches Team prüft verklebte Blockproben auf einer Baustelle",
      },
    ],
    developmentHeading: "Vom Labor zur Baustelle.",
    developmentDescription: "Nachweise leiten jede Freigabe.",
    developmentAlt: "Ingenieur prüft technische Arbeiten in einer industriellen Umgebung",
    developmentStepperLabel: "Forschungs- und Entwicklungsprozess",
    developmentSteps: [
      ["Fragestellung", "Herausforderung definieren."],
      ["Kleinansatz", "Varianten vergleichen."],
      ["Kontrollierter Test", "Leistung messen."],
      ["Konditionierung", "Relevante Belastung anwenden."],
      ["Verifizierung", "Kritische Tests wiederholen."],
      ["Baustellenversuch", "Reale Anwendung beobachten."],
      ["Freigabe", "Belegte Ergebnisse freigeben."],
    ],
    evidenceHeading: "Nachweise, bewahrt.",
    evidenceDescription: "Klare Aufzeichnungen. Nachvollziehbare Entscheidungen.",
    evidenceRecords: [
      ["Chargenprotokolle", "Jeder Versuch dokumentiert.", "/home-media/batch-records-illustration.svg"],
      ["Konditionierungsergebnisse", "Jede Änderung verglichen.", "/home-media/conditioning-results-illustration.svg"],
      ["Baustellenberichte", "Jede Anwendung beobachtet.", "/home-media/field-reports-illustration.svg"],
    ],
    ctaHeading: "Die Wissenschaft des Verbindens.",
  },
};

export default function RDPage() {
  const { locale } = useLocale();
  const content = copy[locale];
  const pageRef = useRef(null);
  const peopleGridRef = useRef(null);
  const evidenceGridRef = useRef(null);
  const bentoCleanupRef = useRef([]);

  useEffect(() => {
    let cancelled = false;

    async function initRdBento() {
      window.gsap = gsap;
      await loadScript("/products-scroll-demo/magic-bento.js");
      if (cancelled) return;

      bentoCleanupRef.current.forEach((cleanup) => cleanup?.());
      bentoCleanupRef.current = [
        initBentoGrid(peopleGridRef.current, ".rd-people-card", RD_PEOPLE_GLOW),
        initBentoGrid(evidenceGridRef.current, ".rd-evidence-card", RD_EVIDENCE_GLOW),
      ].filter(Boolean);
    }

    initRdBento().catch(console.error);

    return () => {
      cancelled = true;
      bentoCleanupRef.current.forEach((cleanup) => cleanup?.());
      bentoCleanupRef.current = [];
    };
  }, []);

  useGSAP(() => {
    const media = gsap.matchMedia();

    media.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
      const groups = gsap.utils.toArray(
        ".rd-people-grid, .rd-development-stepper, .rd-evidence-grid",
        pageRef.current
      );

      groups.forEach((group) => {
        const items = Array.from(group.children);
        gsap.from(items, {
          autoAlpha: 0,
          y: 22,
          duration: 0.55,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: group,
            start: "top 88%",
            once: true,
          },
        });
      });
    });

    return () => media.revert();
  }, { scope: pageRef });

  return (
    <div ref={pageRef}>
      <RDHero {...content.hero} />
      <main className="rd-page" id="rd-content">
        <section className="rd-network">
          <div className="container">
            <div className="rd-network-layout">
              <div className="rd-network-copy">
                <Copy delay={0.1}>
                  <h2>{content.partnershipsHeading}</h2>
                </Copy>
              </div>
              <figure className="rd-partnerships-visual">
              <img
                src="/home-media/rd-research-partnerships.jpg"
                  alt={content.partnershipsImageAlt}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </div>
          </div>
        </section>

        <section
          className="rd-people bento-section"
          style={{
            "--product-spec-glow": RD_PEOPLE_GLOW,
            "--product-spec-glow-shadow": "rgba(89, 22, 24, 0.2)",
          }}
        >
          <div className="container">
            <Copy delay={0.1}>
              <h2>{content.peopleHeading}</h2>
              <p>{content.peopleDescription}</p>
            </Copy>
            <div className="rd-people-grid" ref={peopleGridRef}>
              {content.researchRoles.map((role) => (
                <article className="rd-people-card" key={role.title}>
                  <div><img src={role.image} alt={role.alt} /></div>
                  <h3>{role.title}</h3>
                  <p>{role.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="rd-development" aria-labelledby="rd-development-title">
          <div className="container">
            <div className="rd-development-header">
              <div className="rd-development-intro">
                <Copy delay={0.1}>
                  <h2 id="rd-development-title">{content.developmentHeading}</h2>
                  <p>{content.developmentDescription}</p>
                </Copy>
              </div>

              <figure className="rd-development-image">
              <img src="/home-media/rd-intro-illustration.svg" alt={content.developmentAlt} />
              </figure>
            </div>

            <ol className="rd-development-stepper" aria-label={content.developmentStepperLabel}>
              {content.developmentSteps.map(([title, description], index) => (
                <li key={title} className="rd-development-stepper__item">
                  <div className="rd-development-stepper__track" aria-hidden="true">
                    <span className="rd-development-stepper__marker">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {index < content.developmentSteps.length - 1 ? (
                      <span className="rd-development-stepper__line" />
                    ) : null}
                  </div>
                  <div className="rd-development-stepper__content">
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className="rd-evidence bento-section"
          style={{
            "--product-spec-glow": RD_EVIDENCE_GLOW,
            "--product-spec-glow-shadow": "rgba(64, 19, 21, 0.22)",
          }}
        >
          <div className="container">
            <div className="rd-evidence-heading">
              <Copy delay={0.1}>
                <h2>{content.evidenceHeading}</h2>
                <p>{content.evidenceDescription}</p>
              </Copy>
            </div>
            <div className="rd-evidence-grid" ref={evidenceGridRef}>
              {content.evidenceRecords.map(([title, description, image]) => (
                <article className="rd-evidence-card" key={title}>
                  <div><img src={image} alt="" /></div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <CTAWindow
          img="/media/rd-closing-mortar-application.png"
          header={content.ctaHeading}
          showOverlay={false}
        />
      </main>
      <ConditionalFooter />
    </div>
  );
}
