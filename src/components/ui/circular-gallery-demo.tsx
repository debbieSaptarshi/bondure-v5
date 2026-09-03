"use client";

import { CoverflowCarousel, type CoverflowSlide } from "@/components/ui/coverflow-carousel";
import { useLocale } from "@/components/LocaleProvider/LocaleProvider";

const projectSlides: Record<"en" | "de", CoverflowSlide[]> = {
  en: [
    {
      src: "/home-media/solution-residential.webp",
      alt: "Modern glass high-rise buildings viewed from below",
      title: "High-rise residential",
      description:
        "High-performance tile, stone and façade systems engineered for demanding high-rise construction conditions.",
    },
    {
      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&auto=format&fit=crop&q=80",
      alt: "Modern open-plan office interior with natural light",
      title: "Infrastructure",
      description:
        "Durable repair mortars, grouts and protective coatings for high-traffic infrastructure and exposed structures.",
    },
    {
      src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&auto=format&fit=crop&q=80",
      alt: "Bright contemporary hospital interior",
      title: "Healthcare",
      description:
        "Hygienic, low-VOC adhesive and flooring systems for clean, durable, fast-ready healthcare spaces.",
    },
    {
      src: "/home-media/solution-hospitality-interior.webp",
      alt: "Modern hotel bedroom interior with polished hardwood flooring",
      title: "Hospitality",
      description:
        "Premium finish solutions for hotels and resorts: consistent colour, reliable adhesion and surfaces that hold up to daily guest traffic.",
    },
    {
      src: "/home-media/solution-restaurant.webp",
      alt: "Modern retail interior with warm lighting",
      title: "Retail & restaurants",
      description:
        "Fast-track flooring and wall systems for shops, malls and dining spaces where appearance, slip resistance and programme speed are critical.",
    },
    {
      src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=900&auto=format&fit=crop&q=80",
      alt: "Clean tiled swimming pool with crystal-clear blue water",
      title: "Marine",
      description:
        "Waterproofing and bonding systems built for docks, coastal structures and environments with constant moisture, salt and thermal movement.",
    },
  ],
  de: [
    {
      src: "/home-media/solution-residential.webp",
      alt: "Moderne gläserne Wohnhochhäuser von unten betrachtet",
      title: "Wohnhochhäuser",
      description:
        "Hochleistungs-Fliesen-, Naturstein- und Fassadensysteme für anspruchsvolle Hochhausbau-Bedingungen.",
    },
    {
      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&auto=format&fit=crop&q=80",
      alt: "Moderner Open-Space-Bürobereich mit Tageslicht",
      title: "Infrastruktur",
      description:
        "Langlebige Reparaturmörtel, Vergussmassen und Schutzbeschichtungen für stark beanspruchte Infrastruktur und exponierte Bauwerke.",
    },
    {
      src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&auto=format&fit=crop&q=80",
      alt: "Heller moderner Krankenhausinnenraum",
      title: "Gesundheitswesen",
      description:
        "Hygienische, emissionsarme Klebstoff- und Bodensysteme für saubere, langlebige und schnell nutzbare Gesundheitsräume.",
    },
    {
      src: "/home-media/solution-hospitality-interior.webp",
      alt: "Moderne Hotelzimmer-Innenansicht mit poliertem Holzboden",
      title: "Hotellerie",
      description:
        "Premium-Lösungen für Hotels und Resorts mit gleichmäßiger Farbe, zuverlässiger Haftung und Oberflächen, die dem täglichen Gästebetrieb standhalten.",
    },
    {
      src: "/home-media/solution-restaurant.webp",
      alt: "Moderner Einzelhandelsraum mit warmer Beleuchtung",
      title: "Einzelhandel & Gastronomie",
      description:
        "Schnell ausführbare Boden- und Wandsysteme für Geschäfte, Einkaufszentren und Gastronomiebereiche, in denen Optik, Rutschhemmung und Baugeschwindigkeit entscheidend sind.",
    },
    {
      src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=900&auto=format&fit=crop&q=80",
      alt: "Sauberer gefliester Swimmingpool mit klarem blauem Wasser",
      title: "Maritimbereich",
      description:
        "Abdichtungs- und Haftsysteme für Docks, Küstenbauwerke und Umgebungen mit ständiger Feuchtigkeit, Salz und thermischer Bewegung.",
    },
  ],
};

export default function CircularGalleryDemo() {
  const { locale } = useLocale();

  return (
    <div className="home-solutions__carousel relative left-1/2 w-screen max-w-none -translate-x-1/2 px-4 sm:px-8 lg:px-12">
      <CoverflowCarousel
        slides={projectSlides[locale]}
        showNavigation
        showCaption
        captionPlacement="overlay"
        loop
        label={locale === "de" ? "Bondure Projektgalerie" : "Bondure project gallery"}
        className="w-full"
        cardWidth="clamp(240px, 32vw, 380px)"
        rotate={38}
        depth={0.48}
        gap={0.08}
        frameClassName="coverflow-carousel__frame--solutions cursor-grab py-6 active:cursor-grabbing sm:py-8"
        captionClassName="home-solutions__carousel-caption"
        cardClassName="home-solutions__carousel-card shadow-none"
        navButtonClassName="p-3.5 ring-1 ring-black/10 hover:bg-white sm:p-4"
        navIconClassName="size-7 sm:size-8"
      />
    </div>
  );
}
