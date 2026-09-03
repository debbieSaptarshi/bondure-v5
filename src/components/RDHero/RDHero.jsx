"use client";

import "./RDHero.css";

export default function RDHero({
  title,
  description,
  ctaLabel,
  ctaHref = "#rd-content",
  imageSrc = "/home-media/rd-product-and-rd.png",
  imageAlt,
}) {
  return (
    <section className="rd-hero">
      <div className="container rd-hero__layout">
        <div className="rd-hero__copy">
          <h1>{title}</h1>
          <p className="rd-hero__description">{description}</p>
          {ctaLabel ? (
            <a className="rd-hero__cta" href={ctaHref}>
              <span>{ctaLabel}</span>
              <span className="rd-hero__cta-arrow" aria-hidden="true">
                →
              </span>
            </a>
          ) : null}
        </div>

        <figure className="rd-hero__media">
          <img
            src={imageSrc}
            alt={imageAlt}
            loading="eager"
            decoding="async"
          />
        </figure>
      </div>
    </section>
  );
}
