"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/LocaleProvider/LocaleProvider";

import "./HomePage.css";

const galleryMedia = [
  {
    id: "concrete-mixer",
    src: "/services/experience-center.webp",
    alt: {
      en: "Bondure material experience center with hands-on application demonstrations",
      de: "Bondure Material-Erlebniszentrum mit praxisnahen Anwendungsvorführungen",
    },
    imageOnly: true,
  },
  {
    id: "floor-screed",
    src: "/home-media/site-image-6.webp",
    alt: {
      en: "Worker smoothing a floor coating in a sunlit courtyard",
      de: "Arbeiter glättet eine Bodenbeschichtung in einem sonnigen Innenhof",
    },
    imageOnly: true,
  },
  {
    id: "material-inspection",
    src: "/home-media/material-inspection.webp",
    alt: {
      en: "Bondure specialist inspecting materials and substrate quality on site",
      de: "Bondure-Spezialist prüft Material und Untergrundqualität vor Ort",
    },
    imageOnly: true,
  },
  {
    id: "bondure-tile-installation",
    src: "/home-media/site-image-9.webp",
    alt: {
      en: "Bondure technician installing tiles on site with a mountain view through the window",
      de: "Bondure Techniker verlegt Fliesen auf der Baustelle mit Bergblick durch das Fenster",
    },
    imageOnly: true,
  },
  {
    id: "tile-adhesive",
    src: "/media/product-catalog-tile-adhesive.webp",
    alt: {
      en: "Bondure tile adhesive product recommended for project requirements",
      de: "Bondure Fliesenkleber-Produkt, empfohlen für die Projektanforderungen",
    },
    imageOnly: true,
  },
  {
    id: "wall-plaster",
    src: "/home-media/site-image-5.webp",
    alt: {
      en: "Wall plaster application on site",
      de: "Auftragen von Wandputz auf der Baustelle",
    },
    imageOnly: true,
  },
  {
    id: "aac-blocks",
    src: "/optimized/home/gallery-aac-joining.webp",
    alt: {
      en: "AAC block joining mortar applied on site",
      de: "Auf der Baustelle aufgetragener Porenbeton-Fugenmörtel",
    },
    imageOnly: true,
  },
  {
    id: "precision-tile",
    src: "/home-media/site-image-7.webp",
    alt: {
      en: "Large-format tile installation with a notched trowel",
      de: "Verlegung großformatiger Fliesen mit einer Zahnkelle",
    },
    imageOnly: true,
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

function GalleryItem({ item, loadVideo = true }) {
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !loadVideo || item.imageOnly) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = navigator.connection?.saveData;
    if (reducedMotion || saveData) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShouldLoadVideo(entry.isIntersecting);

        if (!entry.isIntersecting) {
          setIsVideoPlaying(false);
          videoRef.current?.pause();
        }
      },
      { rootMargin: "120px" },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [item.imageOnly, loadVideo]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoadVideo) return;

    const handlePlaying = () => setIsVideoPlaying(true);
    const handlePause = () => setIsVideoPlaying(false);

    const tryPlay = async () => {
      try {
        video.muted = true;
        await video.play();
      } catch {
        setIsVideoPlaying(false);
      }
    };

    video.addEventListener("playing", handlePlaying);
    video.addEventListener("pause", handlePause);
    video.addEventListener("canplay", tryPlay);

    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      void tryPlay();
    }

    return () => {
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("canplay", tryPlay);
    };
  }, [shouldLoadVideo]);

  return (
    <figure
      className={`home-gallery__slide${isVideoPlaying ? " is-video-playing" : ""}`}
      ref={rootRef}
    >
      {item.imageOnly ? (
        <img
          className="home-gallery__media home-gallery__poster"
          src={item.src}
          alt={item.alt}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <>
          <img
            className="home-gallery__media home-gallery__poster"
            src={item.poster}
            alt={item.alt}
            loading="lazy"
            decoding="async"
          />
          {shouldLoadVideo && loadVideo ? (
            <video
              ref={videoRef}
              className="home-gallery__media home-gallery__video"
              src={item.src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={item.alt}
            />
          ) : null}
        </>
      )}
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
                  loadVideo={setIndex === 0}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
