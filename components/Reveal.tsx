"use client";

import { type ElementType, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useReady } from "./Providers";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "p" | "li" | "span" | "h2" | "h3" | "ul" | "dl";
  trigger?: "view" | "ready";
};

/** Fade-and-rise for blocks of content. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as = "div",
  trigger = "view",
}: RevealProps) {
  const reduce = useReducedMotion();
  const ready = useReady();
  const Tag = motion[as] as ElementType;
  const t = {
    duration: reduce ? 0.01 : 0.9,
    delay: reduce ? 0 : delay,
    ease: [0.16, 1, 0.3, 1] as const,
  };
  const variants = { hide: { opacity: 0, y }, show: { opacity: 1, y: 0 } };
  const driver =
    trigger === "ready"
      ? { initial: "hide", animate: ready ? "show" : "hide" }
      : {
          initial: "hide",
          whileInView: "show",
          viewport: { once: true, margin: "0px 0px -10% 0px" },
        };
  return (
    <Tag variants={variants} transition={t} {...driver} className={className}>
      {children}
    </Tag>
  );
}

type WordsProps = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p";
  trigger?: "view" | "ready";
};

/**
 * Headline reveal: every word slides up out of its own mask. Because the
 * split is per-word (not per-line), text wraps naturally at any viewport.
 */
export function Words({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  as = "h2",
  trigger = "view",
}: WordsProps) {
  const reduce = useReducedMotion();
  const ready = useReady();
  const Tag = motion[as] as ElementType;
  const words = text.split(" ");

  const container = {
    hide: {},
    show: { transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: reduce ? 0 : delay } },
  };
  const word = {
    hide: { y: "112%" },
    show: {
      y: "0%",
      transition: { duration: reduce ? 0.01 : 1, ease: [0.16, 1, 0.3, 1] as const },
    },
  };
  const driver =
    trigger === "ready"
      ? { initial: "hide", animate: ready ? "show" : "hide" }
      : {
          initial: "hide",
          whileInView: "show",
          viewport: { once: true, margin: "0px 0px -10% 0px" },
        };

  return (
    <Tag variants={container} {...driver} className={cn(className)} aria-label={text}>
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          aria-hidden
          className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]"
        >
          <motion.span variants={word} className="inline-block will-change-transform">
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
