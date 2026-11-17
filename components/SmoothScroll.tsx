"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenis } from "@/lib/scroll";

/**
 * Lenis smooth scrolling on pointer devices, wired into GSAP's ticker so
 * ScrollTrigger parallax stays perfectly in sync. Touch devices keep native
 * momentum scrolling (best for battery and feel), and users who prefer
 * reduced motion get no smoothing at all.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const root = document.documentElement;
    let idleTimer: number | undefined;
    const onScroll = () => {
      root.classList.add("is-scrolling");
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => root.classList.remove("is-scrolling"), 1100);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(idleTimer);
      root.classList.remove("is-scrolling");
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduce || !finePointer) return;

    const lenis = new Lenis({ lerp: 0.095, smoothWheel: true });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
