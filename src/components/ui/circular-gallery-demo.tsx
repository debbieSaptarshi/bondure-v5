"use client";

import { CoverflowCarousel, type CoverflowSlide } from "@/components/ui/coverflow-carousel";
import { useLocale } from "@/components/LocaleProvider/LocaleProvider";

const projectSlides: Record<"en" | "de", CoverflowSlide[]> = {
  en: [
    {
      src: "/home-media/gallery-tile-installation.webp",
      alt: "Bondure technician installing large-format wall tiles in a premium residential interior",
      title: "High-rise residential",
      description:
        "High-performance tile, stone and façade systems engineered for demanding high-rise construction conditions.",
    },
    {
      src: "/home-media/gallery-floor-screed.webp",
      alt: "Worker levelling a polished floor screed in a sunlit architectural interior courtyard",
      title: "Infrastructure",
      description:
        "Durable repair mortars, grouts and protective coatings for high-traffic infrastructure and exposed structures.",
    },
    {
      src: "/spotlight/services2floor.webp",
      alt: "Large-format floor tiles installed in a clean, brightly lit healthcare interior",
      title: "Healthcare",
      description:
        "Hygienic, low-VOC adhesive and flooring systems for clean, durable, fast-ready healthcare spaces.",
    },
    {
      src: "/spotlight/tile-installation.webp",
      alt: "Hotel bathroom and lobby finishes with precision tile installation",
      title: "Hospitality",
      description:
        "Premium finish solutions for hotels and resorts: consistent colour, reliable adhesion and surfaces that hold up to daily guest traffic.",
    },
    {
      src: "/services/experience-center.webp",
      alt: "Bondure experience center interior showcasing tile, marble and wall finish displays",
      title: "Retail & restaurants",
      description:
        "Fast-track flooring and wall systems for shops, malls and dining spaces where appearance, slip resistance and programme speed are critical.",
    },
    {
      src: "/spotlight/services3AAC.webp",
      alt: "Interior wall plaster and moisture-resistant finishes applied on site",
      title: "Marine",
      description:
        "Waterproofing and bonding systems built for docks, coastal structures and environments with constant moisture, salt and thermal movement.",
    },
  ],
  de: [
    {
      src: "/home-media/gallery-tile-installation.webp",
      alt: "Bondure Techniker verlegt großformatige Wandfliesen in einem hochwertigen Wohninterieur",
      title: "Wohnhochhäuser",
      description:
        "Hochleistungs-Fliesen-, Naturstein- und Fassadensysteme für anspruchsvolle Hochhausbau-Bedingungen.",
    },
    {
      src: "/home-media/gallery-floor-screed.webp",
      alt: "Arbeiter glättet einen Estrichboden in einem sonnigen architektonischen Innenhof",
      title: "Infrastruktur",
      description:
        "Langlebige Reparaturmörtel, Vergussmassen und Schutzbeschichtungen für stark beanspruchte Infrastruktur und exponierte Bauwerke.",
    },
    {
      src: "/spotlight/services2floor.webp",
      alt: "Großformatige Bodenfliesen in einem sauberen, hellen Gesundheitsinterieur",
      title: "Gesundheitswesen",
      description:
        "Hygienische, emissionsarme Klebstoff- und Bodensysteme für saubere, langlebige und schnell nutzbare Gesundheitsräume.",
    },
    {
      src: "/spotlight/tile-installation.webp",
      alt: "Hotelbad und Lobby-Oberflächen mit präziser Fliesenverlegung",
      title: "Hotellerie",
      description:
        "Premium-Lösungen für Hotels und Resorts mit gleichmäßiger Farbe, zuverlässiger Haftung und Oberflächen, die dem täglichen Gästebetrieb standhalten.",
    },
    {
      src: "/services/experience-center.webp",
      alt: "Innenansicht des Bondure Erlebniszentrums mit Fliesen-, Marmor- und Wandfinish-Ausstellungen",
      title: "Einzelhandel & Gastronomie",
      description:
        "Schnell ausführbare Boden- und Wandsysteme für Geschäfte, Einkaufszentren und Gastronomiebereiche, in denen Optik, Rutschhemmung und Baugeschwindigkeit entscheidend sind.",
    },
    {
      src: "/spotlight/services3AAC.webp",
      alt: "Innenwandputz und feuchtigkeitsbeständige Oberflächen auf der Baustelle",
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
