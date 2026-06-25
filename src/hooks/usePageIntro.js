import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const SESSION_KEY = "portfolio_intro_played";

/**
 * Runs the home page entrance animation.
 *
 * The hook uses sessionStorage to detect if the visitor already saw the full
 * intro during the current browser session. On the first visit, it plays the
 * complete cinematic sequence. On later visits, it plays a shorter version.
 *
 * Elements are selected with data-intro attributes to avoid depending on CSS
 * class names.
 *
 * @returns {{ isFirstVisit: boolean }} First visit state for the current session.
 */
export function usePageIntro() {
  const isFirstVisit = !sessionStorage.getItem(SESSION_KEY);
  const tlRef = useRef(null);

  useLayoutEffect(() => {
    sessionStorage.setItem(SESSION_KEY, "1");

    const base = isFirstVisit ? 0 : 0;
    const els = document.querySelectorAll("[data-intro]");

    gsap.set(els, { autoAlpha: 0 });

    const bg = document.querySelector('[data-intro="bg"]');
    const header = document.querySelector('[data-intro="header"]');
    const photo = document.querySelector('[data-intro="photo"]');
    const halo = document.querySelector('[data-intro="halo"]');
    const badge = document.querySelector('[data-intro="badge"]');
    const h1Words = document.querySelectorAll('[data-intro="h1-word"]');
    const desc = document.querySelector('[data-intro="desc"]');
    const ctas = document.querySelector('[data-intro="ctas"]');
    const pills = document.querySelector('[data-intro="pills"]');
    const divider = document.querySelector('[data-intro="divider"]');
    const sections = document.querySelectorAll('[data-intro="section"]');

    const tl = gsap.timeline({ delay: base });
    tlRef.current = tl;

    if (isFirstVisit) {
      tl.to(
        bg,
        {
          autoAlpha: 1,
          duration: 2.2,
          ease: "power1.inOut",
        },
        0.35,
      );

      if (bg) {
        gsap.fromTo(
          bg,
          { scale: 0.98, filter: "brightness(0)" },
          {
            scale: 1,
            filter: "brightness(1)",
            duration: 2.5,
            ease: "power2.out",
            delay: 0.35,
          },
        );
      }

      tl.fromTo(
        header,
        { autoAlpha: 0, y: -24, filter: "blur(8px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          clearProps: "filter",
        },
        0.7,
      );

      tl.fromTo(
        photo,
        { autoAlpha: 0, scale: 0.88, filter: "blur(16px)" },
        {
          autoAlpha: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "expo.out",
          clearProps: "filter",
        },
        0.9,
      );

      tl.fromTo(
        halo,
        { autoAlpha: 0, scale: 0.6 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 1.4,
          ease: "expo.out",
        },
        1.0,
      );

      if (badge) {
        tl.fromTo(
          badge,
          { autoAlpha: 0, y: 10, filter: "blur(6px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.6,
            ease: "power3.out",
            clearProps: "filter",
          },
          1.0,
        );
      }

      if (h1Words.length) {
        tl.fromTo(
          h1Words,
          { autoAlpha: 0, y: 18, filter: "blur(6px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out",
            clearProps: "filter",
          },
          1.1,
        );
      }

      tl.fromTo(
        desc,
        { autoAlpha: 0, y: 14 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
        },
        1.45,
      );

      tl.fromTo(
        ctas,
        { autoAlpha: 0, y: 10 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        1.65,
      );

      tl.fromTo(
        pills,
        { autoAlpha: 0, y: 8 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
        },
        1.8,
      );

      tl.fromTo(
        divider,
        { autoAlpha: 0, scaleX: 0 },
        {
          autoAlpha: 1,
          scaleX: 1,
          duration: 0.8,
          ease: "power2.inOut",
          transformOrigin: "left center",
        },
        2.0,
      );

      tl.fromTo(
        sections,
        { autoAlpha: 0, y: 24, filter: "blur(8px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.85,
          stagger: 0.15,
          ease: "power3.out",
          clearProps: "filter",
        },
        2.15,
      );
    } else {
      tl.to(
        [bg, header],
        {
          autoAlpha: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        0,
      );

      tl.fromTo(
        [photo, halo],
        { autoAlpha: 0, y: 12 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
        },
        0.1,
      );

      if (badge) {
        tl.fromTo(
          badge,
          { autoAlpha: 0, y: 6 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          0.15,
        );
      }

      tl.fromTo(
        h1Words,
        { autoAlpha: 0, y: 8 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.05,
          ease: "power2.out",
        },
        0.2,
      );

      tl.fromTo(
        [desc, ctas, pills],
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
        },
        0.35,
      );

      tl.to(
        [divider, ...sections],
        {
          autoAlpha: 1,
          duration: 0.4,
          stagger: 0.06,
          ease: "power2.out",
        },
        0.45,
      );
    }

    return () => {
      tl.kill();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { isFirstVisit };
}
