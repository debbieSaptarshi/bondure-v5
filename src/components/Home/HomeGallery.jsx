"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/LocaleProvider/LocaleProvider";

import "./HomePage.css";

const galleryMedia = [
  {
    id: "concrete-mixer",
    src: "/optimized/home/gallery-mixing-video.webp",
    staticSrc: "/optimized/home/gallery-mixing-video-poster.webp",
    alt: {
      en: "Construction site with workers and concrete mixer outdoors",
      de: "Baustelle mit Arbeitern und Betonmischer im Freien",
    },
  },
  {
    id: "floor-screed",
    src: "/spotlight/services2floor.webp",
    alt: {
      en: "Floor screed application on a construction site",
      de: "Estrichauftrag auf einer Baustelle",
    },
  },
  {
    id: "excavator",
    src: "/optimized/home/gallery-luss-test.webp",
    staticSrc: "/optimized/home/gallery-luss-test-poster.webp",
    alt: {
      en: "Excavator loading earth into a dump truck at a construction site",
      de: "Bagger lädt Erde auf einer Baustelle in einen Muldenkipper",
    },
  },
  {
    id: "bondure-tile-installation",
    src: "/spotlight/tile-installation.webp",
    alt: {
      en: "Precision tile installation in progress",
      de: "Präzise Fliesenverlegung im Einsatz",
    },
  },
  {
    id: "tile-adhesive",
    src: "/optimized/home/gallery-water-proofing.webp",
    staticSrc: "/optimized/home/gallery-water-proofing-poster.webp",
    alt: {
      en: "Tile adhesive being applied with a notched trowel",
      de: "Fliesenkleber wird mit einer Zahnkelle aufgetragen",
    },
  },
  {
    id: "wall-plaster",
    src: "/spotlight/services3AAC.webp",
    alt: {
      en: "AAC block masonry and jointing work on site",
      de: "Mauerwerk und Verfugung mit Porenbetonsteinen vor Ort",
    },
  },
  {
    id: "aac-blocks",
    src: "/optimized/home/gallery-aac-block.webp",
    staticSrc: "/optimized/home/gallery-aac-block-poster.webp",
    alt: {
      en: "AAC block joining mortar applied on site",
      de: "Auf der Baustelle aufgetragener Porenbeton-Fugenmörtel",
    },
  },
  {
    id: "precision-tile",
    src: "/spotlight/spotlight-img-2.webp",
    alt: {
      en: "Large-format tile installation with a notched trowel",
      de: "Verlegung großformatiger Fliesen mit einer Zahnkelle",
    },
  },
];

function restartMarqueeAnimation(node) {
  if (!node) return;

  const { animationName, animationDuration } = window.getComputedStyle(node);
  if (animationName === "none" || animationDuration === "0s") return;

  node.style.animation = "none";
  void node.offsetHeight;
  node.style.animation = "";
}

function resolveMediaSrc(item) {
  if (!item.staticSrc || typeof window === "undefined") return item.src;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = navigator.connection?.saveData;
  return reducedMotion || saveData ? item.staticSrc : item.src;
}

function GalleryItem({ item }) {
  const [mediaSrc, setMediaSrc] = useState(item.src);

  useEffect(() => {
    setMediaSrc(resolveMediaSrc(item));

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateSrc = () => setMediaSrc(resolveMediaSrc(item));
    motionQuery.addEventListener("change", updateSrc);
    return () => motionQuery.removeEventListener("change", updateSrc);
  }, [item.src, item.staticSrc]);

  return (
    <figure className="home-gallery__slide">
      <img
        className="home-gallery__media home-gallery__poster"
        src={mediaSrc}
        alt={item.alt}
        loading="lazy"
        decoding="async"
      />
    </figure>
  );
}

export default function HomeGallery() {
  const { locale } = useLocale();
  const marqueeRef = useRef(null);

  const restartMarquee = useCallback(() => {
    restartMarqueeAnimation(marqueeRef.current);
  }, []);

  useEffect(() => {
    restartMarquee();

    const handleReady = () => restartMarquee();
    const handleVisibility = () => {
      if (document.visibilityState === "visible") restartMarquee();
    };

    window.addEventListener("load", handleReady);
    document.addEventListener("visibilitychange", handleVisibility);

    const marquee = marqueeRef.current;
    const resizeObserver = marquee
      ? new ResizeObserver(() => restartMarquee())
      : null;

    resizeObserver?.observe(marquee);

    return () => {
      window.removeEventListener("load", handleReady);
      document.removeEventListener("visibilitychange", handleVisibility);
      resizeObserver?.disconnect();
    };
  }, [restartMarquee]);

  return (
    <section
      className="home-gallery"
      aria-label={locale === "de" ? "Bondure Anwendungen auf der Baustelle" : "Bondure applications on site"}
    >
      <div className="home-gallery__viewport">
        <div className="home-gallery__marquee" ref={marqueeRef}>
          {[0, 1].map((setIndex) => (
            <div
              className="home-gallery__track"
              key={setIndex}
              aria-hidden={setIndex === 1 ? true : undefined}
            >
              {galleryMedia.map((item) => (
                <GalleryItem
                  item={{ ...item, alt: item.alt[locale] }}
                  key={`${setIndex}-${item.id}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
