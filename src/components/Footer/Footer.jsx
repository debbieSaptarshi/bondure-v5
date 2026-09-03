"use client";

import "./Footer.css";

import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RiInstagramLine, RiLinkedinBoxLine, RiYoutubeLine } from "react-icons/ri";

import BondureLogo from "../BondureLogo/BondureLogo";
import { useLocale } from "@/components/LocaleProvider/LocaleProvider";
import { useViewTransition } from "@/hooks/useViewTransition";

gsap.registerPlugin(ScrollTrigger);

const FOOTER_LINKS = [
  { href: "/about", labelKey: "footerAboutUs" },
  { href: "/connect", labelKey: "footerContactUs" },
];

const Footer = () => {
  const socialIconsRef = useRef(null);
  const { t } = useLocale();
  const { navigateWithTransition } = useViewTransition();

  useGSAP(
    () => {
      if (!socialIconsRef.current) return;

      const icons = socialIconsRef.current.querySelectorAll(".icon");
      gsap.set(icons, { opacity: 0, x: -40 });

      ScrollTrigger.create({
        trigger: socialIconsRef.current,
        start: "top 90%",
        once: true,
        animation: gsap.to(icons, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: -0.1,
          ease: "power3.out",
        }),
      });
    },
    { scope: socialIconsRef },
  );

  return (
    <div className="footer">
      <div className="footer-meta">
        <div className="container footer-socials">
          <div className="footer-meta-col">
            <nav className="footer-nav" aria-label={t("footerNavLabel")}>
              {FOOTER_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => {
                    event.preventDefault();
                    navigateWithTransition(link.href);
                  }}
                >
                  {t(link.labelKey)}
                </a>
              ))}
            </nav>
            <div className="footer-socials-wrapper" ref={socialIconsRef}>
              <a href="https://www.linkedin.com/company/bondure/" target="_blank" rel="noopener noreferrer">
                <div className="icon">
                  <RiLinkedinBoxLine />
                </div>
              </a>
              <a href="https://www.instagram.com/bondure___?igsi=MXNnbnZ1d2RtN3M5cw==" target="_blank" rel="noopener noreferrer">
                <div className="icon">
                  <RiInstagramLine />
                </div>
              </a>
              <a href="https://www.youtube.com/@BONDURE123" target="_blank" rel="noopener noreferrer">
                <div className="icon">
                  <RiYoutubeLine />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-outro">
        <div className="container">
          <div className="footer-header">
            <BondureLogo
              gradientId="footerBondureLogoGradient"
              gradientStops={[
                { offset: "0%", stopColor: "#8b5e3c" },
                { offset: "45%", stopColor: "#591618" },
                { offset: "100%", stopColor: "#2a0b0c" },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
