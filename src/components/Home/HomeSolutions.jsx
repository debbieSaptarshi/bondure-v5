"use client";

import {
  Anchor,
  Building2,
  Construction,
  HeartPulse,
  Hotel,
  Store,
} from "lucide-react";
import CircularGalleryDemo from "@/components/ui/circular-gallery-demo";
import { useLocale } from "@/components/LocaleProvider/LocaleProvider";

import "./HomePage.css";

const homeCopy = {
  en: {
    solutionsLead: "Solutions",
    solutionsTail: "for every type of project",
    solutions: ["Healthcare", "Hospitality", "Infrastructure", "Residential high-rises", "Retail & restaurants", "Marine"],
  },
  de: {
    solutionsLead: "Lösungen",
    solutionsTail: "für jede Art von Projekt",
    solutions: ["Gesundheitswesen", "Hotellerie", "Infrastruktur", "Wohnhochhäuser", "Einzelhandel & Gastronomie", "Maritimbereich"],
  },
};

const solutionIcons = [HeartPulse, Hotel, Construction, Building2, Store, Anchor];

export default function HomeSolutions() {
  const { locale } = useLocale();
  const copy = homeCopy[locale];

  return (
    <section className="home-solutions" aria-labelledby="solutions-title">
      <div className="home-solutions__inner">
        <div className="home-solutions__intro home-section-intro">
          <h2 id="solutions-title" className="home-section-heading">
            <strong>{copy.solutionsLead}</strong> {copy.solutionsTail}
          </h2>
        </div>

        <div className="home-solutions__grid">
          {solutionIcons.map((Icon, index) => {
            const label = copy.solutions[index];
            return (
              <article className="home-solutions__item" key={label}>
                <Icon aria-hidden="true" strokeWidth={1.35} />
                <h3>{label}</h3>
              </article>
            );
          })}
        </div>
      </div>
      <CircularGalleryDemo />
    </section>
  );
}
