"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Photo from "./Photo";
import { useReady } from "./Providers";
import { cn } from "@/lib/cn";

type FrameProps = {
  id: string;
  alt: string;
  sizes: string;
  /** Tailwind aspect/size classes for the frame */
  className?: string;
  priority?: boolean;
  /** "view" reveals on scroll, "ready" waits for the loader to finish */
  trigger?: "view" | "ready";
  /** GSAP scroll parallax strength in % of the frame height (0 disables) */
  parallax?: number;
  position?: string;
  children?: ReactNode;
};

const ease = [0.76, 0, 0.24, 1] as const;

/**
 * The signature image treatment: a mask that wipes upward to reveal the
 * photo while the photo settles from 1.25× to 1×, plus an optional subtle
 * scroll parallax (desktop pointers only; off for reduced motion & phones).
 */
export default function Frame({
  id,
  alt,
  sizes,
  className,
  priority,
  trigger = "view",
  parallax = 0,
  position,
  children,
}: FrameProps) {
  const reduce = useReducedMotion();
  const ready = useReady();
  const root = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!parallax || !root.current || !layer.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        layer.current,
        { yPercent: -parallax },
        {
          yPercent: parallax,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });
    return () => mm.revert();
  }, [parallax]);

  const mask = {
    hide: { clipPath: "inset(100% 0% 0% 0%)" },
    show: { clipPath: "inset(0% 0% 0% 0%)" },
  };
  const zoom = { hide: { scale: 1.25 }, show: { scale: 1 } };
  const t = { duration: reduce ? 0.01 : 1.25, ease };

  const driver =
    trigger === "ready"
      ? { initial: "hide", animate: ready ? "show" : "hide" }
      : {
          initial: "hide",
          whileInView: "show",
          viewport: { once: true, margin: "0px 0px -12% 0px" },
        };

  return (
    <motion.div
      ref={root}
      variants={mask}
      transition={t}
      {...driver}
      className={cn("relative overflow-hidden bg-sand", className)}
    >
      <div
        ref={layer}
        className="absolute inset-x-0 will-change-transform"
        style={
          parallax
            ? { top: `-${parallax}%`, bottom: `-${parallax}%` }
            : { top: 0, bottom: 0 }
        }
      >
        <motion.div
          variants={zoom}
          transition={{ ...t, duration: reduce ? 0.01 : 1.6 }}
          className="absolute inset-0"
        >
          <Photo id={id} alt={alt} sizes={sizes} priority={priority} position={position} />
        </motion.div>
      </div>
      {children}
    </motion.div>
  );
}
