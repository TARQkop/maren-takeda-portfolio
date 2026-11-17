"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useSetReady } from "./Providers";
import { person } from "@/data/content";
import { lockScroll, unlockScroll } from "@/lib/scroll";

/**
 * Intro: a counter that "fires" from 0 to 100 like a kiln temperature climbing,
 * then the clay-coloured curtain lifts to reveal the hero.
 */
export default function Loader() {
  const setReady = useSetReady();
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    lockScroll();
    let locked = true;
    const release = () => {
      if (!locked) return;
      locked = false;
      unlockScroll();
    };
    const total = reduce ? 350 : 1500;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / total);
      // ease-out so the last few percent linger, like waiting on a kiln
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        release(); // scrolling is available again as soon as the curtain starts lifting
        setVisible(false);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      release();
    };
  }, [reduce]);

  return (
    <AnimatePresence onExitComplete={() => setReady(true)}>
      {visible && (
        <motion.div
          key="loader"
          role="status"
          aria-live="polite"
          aria-label="Loading"
          className="on-dark fixed inset-0 z-[100] flex flex-col justify-between bg-ink p-[var(--gutter)] text-bone"
          exit={{ y: "-100%" }}
          transition={{ duration: reduce ? 0.01 : 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="eyebrow flex items-center justify-between text-muted-dark">
            <span>{person.studio}</span>
            <span>Porto — PT</span>
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-display text-[clamp(2.4rem,9vw,6rem)] leading-[0.95]">
              {person.name}
            </p>
            <p className="eyebrow text-clay-soft">{person.role}</p>
          </div>

          <div>
            <div className="mb-3 flex items-end justify-between">
              <span className="eyebrow text-muted-dark">Firing</span>
              <span className="font-display text-[clamp(3rem,12vw,7rem)] leading-none tabular-nums">
                {String(count).padStart(2, "0")}
                <span className="text-clay-soft">%</span>
              </span>
            </div>
            <div className="h-px w-full bg-bone/20">
              <div
                className="h-px origin-left bg-clay-soft"
                style={{ width: `${count}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
