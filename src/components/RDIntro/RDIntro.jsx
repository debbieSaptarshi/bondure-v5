"use client";

import "./RDIntro.css";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import BondureLogo from "@/components/BondureLogo/BondureLogo";
import { useLocale } from "@/components/LocaleProvider/LocaleProvider";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_GALLERY_ITEMS = [
  { type: "image", src: "/home-media/lab-formulation.webp" },
  { type: "image", src: "/home-media/adhesive-work-2.webp" },
  { type: "image", src: "/home-media/materials-research-lab.webp" },
  { type: "image", src: "/home-media/site-testing.webp" },
  {
    type: "video",
    src: "/home-media/mixingvideo.mp4",
    poster: "/home-media/lab-formulation.webp",
    fit: "cover",
    noOverlay: true,
  },
  { type: "image", src: "/home-media/construction-mortar-application.png" },
  { type: "image", src: "/home-media/construction-tile-installation.png" },
  { type: "image", src: "/home-media/aac-blocks.webp" },
  { type: "image", src: "/home-media/aac-joining.webp" },
];

export const RD_GALLERY_ITEMS = DEFAULT_GALLERY_ITEMS.map((item, index) => (
  index === 4
    ? { ...item, poster: "/home-media/rd-product-and-rd.png" }
    : item
));

export default function RDIntro({
  headline,
  actionLabel,
  actionTarget = "#rd-content",
  footerItems,
  galleryItems = DEFAULT_GALLERY_ITEMS,
  hideSectionOverlay = false,
  hideHeadline = false,
  hideAction = false,
}) {
  const { locale } = useLocale();
  const defaults = locale === "de"
    ? {
        headline: "Forschung bei Bondure",
        actionLabel: "Prozess entdecken",
        footerItems: ["Entwickeln", "Testen", "Belegen"],
      }
    : {
        headline: "Research at Bondure",
        actionLabel: "Explore the process",
        footerItems: ["Formulate", "Test", "Prove"],
      };
  const resolvedHeadline = headline ?? defaults.headline;
  const resolvedActionLabel = actionLabel ?? defaults.actionLabel;
  const resolvedFooterItems = footerItems ?? defaults.footerItems;
  const heroItem = galleryItems.find((item) => item.noOverlay) ?? galleryItems[4];
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const gallery = section.querySelector(".rd-intro-gallery");
      const galleryMedia = gsap.utils.toArray(".rd-intro-item img, .rd-intro-item video", section);
      const zoomableMedia = galleryMedia.filter((media) => !media.closest(".rd-intro-item--clear"));
      const logo = section.querySelector(".rd-intro-logo");
      const footer = section.querySelector(".rd-intro-footer");
      const words = gsap.utils.toArray(".rd-intro-headline .word", section);
      const action = section.querySelector(".rd-intro-action");
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        gsap.set([words, action], { opacity: 1 });
        return;
      }

      const mm = gsap.matchMedia();
      const triggers = [];
      const centerItem = section.querySelector(".rd-intro-item--clear");
      const peripheralItems = gsap.utils.toArray(".rd-intro-item:not(.rd-intro-item--clear)", section);
      const mobileHero = section.querySelector(".rd-intro-mobile-hero");
      let coverScale = 1;
      let centerOrigin = "50% 50%";

      const refreshCoverMetrics = () => {
        if (!centerItem) return;

        gsap.set(gallery, {
          xPercent: -50,
          yPercent: -50,
          scale: 1,
          x: 0,
          y: 0,
          transformOrigin: "50% 50%",
        });

        const sectionRect = section.getBoundingClientRect();
        const itemRect = centerItem.getBoundingClientRect();
        const galleryRect = gallery.getBoundingClientRect();

        coverScale = Math.max(
          sectionRect.width / Math.max(itemRect.width, 1),
          sectionRect.height / Math.max(itemRect.height, 1),
        ) * 1.05;

        const originX = ((itemRect.left + itemRect.width / 2) - galleryRect.left) / galleryRect.width * 100;
        const originY = ((itemRect.top + itemRect.height / 2) - galleryRect.top) / galleryRect.height * 100;
        centerOrigin = `${originX}% ${originY}%`;
      };

      const updateIntro = (progress, mobile) => {
        const galleryProgress = gsap.utils.clamp(0, 1, progress / (mobile ? 0.72 : 0.75));
        const endScale = mobile ? 0.76 : 0.5;
        const startScale = centerItem ? coverScale : 1;
        const scale = gsap.utils.interpolate(startScale, endScale, galleryProgress);

        gsap.set(gallery, {
          xPercent: -50,
          yPercent: -50,
          scale,
          x: 0,
          y: mobile ? gsap.utils.interpolate(0, -(gallery.offsetHeight * 0.08), galleryProgress) : 0,
          transformOrigin: centerItem ? centerOrigin : "50% 50%",
        });

        gsap.set(zoomableMedia, {
          scale: gsap.utils.interpolate(mobile ? 1.05 : 1.25, 1, galleryProgress),
        });

        if (mobile && mobileHero) {
          const heroFade = gsap.utils.clamp(0, 1, galleryProgress / 0.28);
          gsap.set(mobileHero, { opacity: 1 - heroFade });
          gsap.set(gallery, { opacity: gsap.utils.clamp(0, 1, (galleryProgress - 0.08) / 0.22) });
        } else {
          gsap.set(gallery, { opacity: 1 });
        }

        peripheralItems.forEach((item) => {
          gsap.set(item, {
            opacity: centerItem
              ? gsap.utils.interpolate(0, 1, gsap.utils.clamp(0, 1, (galleryProgress - 0.15) / 0.85))
              : 1,
          });
        });

        const logoStartScale = mobile ? 1.28 : window.innerWidth <= 1000 ? 2.2 : 5.5;
        const logoScale = gsap.utils.interpolate(logoStartScale, 1, galleryProgress);
        const scaledHeight = logo.offsetHeight * logoScale;
        const travel = Math.max(0, window.innerHeight - scaledHeight - (mobile ? 48 : 64));
        gsap.set(logo, { scale: logoScale, y: -travel * galleryProgress });

        const footerProgress = gsap.utils.clamp(0, 1, (progress - 0.05) / (mobile ? 0.24 : 0.2));
        gsap.set(footer, {
          scale: gsap.utils.interpolate(1, mobile ? 0.9 : 0.78, footerProgress),
          filter: `blur(${gsap.utils.interpolate(0, mobile ? 8 : 18, footerProgress)}px)`,
          opacity: 1 - footerProgress,
        });

        words.forEach((target, index) => {
          const start = 0.12 + index * 0.018;
          const reveal = gsap.utils.clamp(0, 1, (progress - start) / 0.12);
          gsap.set(target, { opacity: reveal, y: 10 * (1 - reveal) });
        });

        if (action) {
          const actionStart = hideHeadline ? 0.1 : 0.12 + words.length * 0.018;
          const actionReveal = gsap.utils.clamp(0, 1, (progress - actionStart) / (mobile ? 0.14 : 0.12));
          gsap.set(action, { opacity: actionReveal, y: 10 * (1 - actionReveal) });
        }
      };

      const createScroll = (mobile) => {
        const logoStartScale = mobile ? 1.28 : window.innerWidth <= 1000 ? 2.2 : 5.5;
        gsap.set([words, action], { opacity: 0, y: 10 });
        gsap.set(logo, { scale: logoStartScale, y: 0 });
        refreshCoverMetrics();
        peripheralItems.forEach((item) => {
          gsap.set(item, { opacity: centerItem ? 0 : 1 });
        });
        if (mobile && mobileHero) {
          gsap.set(mobileHero, { opacity: 1 });
          gsap.set(gallery, { opacity: 0 });
        }
        if (centerItem) {
          gsap.set(gallery, {
            xPercent: -50,
            yPercent: -50,
            scale: coverScale,
            x: 0,
            y: 0,
            transformOrigin: centerOrigin,
          });
        } else {
          gsap.set(gallery, { xPercent: -50, yPercent: -50, scale: 1, x: 0, y: 0 });
        }

        const trigger = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * (mobile ? 2.85 : 4)}`,
          pin: true,
          scrub: mobile ? 0.55 : true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: refreshCoverMetrics,
          onUpdate: ({ progress }) => updateIntro(progress, mobile),
        });

        requestAnimationFrame(() => {
          refreshCoverMetrics();
          updateIntro(0, mobile);
          ScrollTrigger.refresh();
        });

        return trigger;
      };

      mm.add("(max-width: 767px)", () => {
        triggers.push(createScroll(true));
      });

      mm.add("(min-width: 768px)", () => {
        triggers.push(createScroll(false));
      });

      return () => {
        triggers.forEach((trigger) => trigger.kill());
        mm.revert();
      };
    },
    { scope: sectionRef, dependencies: [hideHeadline, hideAction] }
  );

  return (
    <section
      className={`rd-intro${hideSectionOverlay ? " rd-intro--clear-overlay" : ""}`}
      ref={sectionRef}
    >
        <div className="rd-intro-inner">
          {heroItem?.type === "video" ? (
            <div className="rd-intro-mobile-hero" aria-hidden="true">
              <video
                src={heroItem.src}
                poster={heroItem.poster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            </div>
          ) : null}

          <div className="rd-intro-gallery" aria-hidden="true">
          {[0, 1, 2].map((column) => (
            <div className="rd-intro-column" key={column}>
              {galleryItems.slice(column * 3, column * 3 + 3).map((item, itemIndex) => (
                <div
                  className={`rd-intro-item${item.noOverlay ? " rd-intro-item--clear" : ""}`}
                  key={item.src}
                >
                  {item.noOverlay ? (
                    <div className="rd-intro-item__frame">
                      {item.type === "video" ? (
                        <video
                          src={item.src}
                          poster={item.poster}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          aria-hidden="true"
                        />
                      ) : (
                        <img
                          src={item.src}
                          alt=""
                          loading={column === 0 && itemIndex === 0 ? "eager" : "lazy"}
                          decoding="async"
                          style={item.fit ? { objectFit: item.fit } : undefined}
                        />
                      )}
                    </div>
                  ) : item.type === "video" ? (
                    <video
                      src={item.src}
                      poster={item.poster}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-hidden="true"
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt=""
                      loading={column === 0 && itemIndex === 0 ? "eager" : "lazy"}
                      decoding="async"
                      style={item.fit ? { objectFit: item.fit } : undefined}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
          </div>

        <div className="rd-intro-logo">
          <BondureLogo gradientId="rdIntroLogoGradient" />
        </div>

        {hideHeadline && hideAction ? null : (
          <div className="rd-intro-header">
            {hideHeadline ? null : (
              <div className="rd-intro-headline">
                <h1>
                  <span className="line">
                    {resolvedHeadline.split(" ").map((word, index) => (
                      <span className="word" key={`${word}-${index}`}>
                        {word}&nbsp;
                      </span>
                    ))}
                  </span>
                </h1>
              </div>
            )}
            {hideAction ? null : (
              <a className="rd-intro-action" href={actionTarget}>
                <span className="rd-intro-action__label">{resolvedActionLabel}</span>
              </a>
            )}
          </div>
        )}

        <div className="rd-intro-footer">
          {resolvedFooterItems.map((item) => <p key={item}>{item}</p>)}
        </div>
      </div>
      {hideSectionOverlay ? null : <div className="rd-intro-overlay" />}
    </section>
  );
}
