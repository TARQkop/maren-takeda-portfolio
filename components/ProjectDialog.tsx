"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import type { Project } from "@/data/content";
import Photo from "./Photo";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import { ScrollButton } from "./Button";

type Props = {
  project: Project | null;
  index: number;
  total: number;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function ProjectDialog({ project, index, total, onClose, onStep }: Props) {
  const reduce = useReducedMotion();
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const isOpen = project !== null;

  useEffect(() => {
    if (!isOpen) return;
    lockScroll();
    const opener = document.activeElement as HTMLElement | null;
    closeBtn.current?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key === "ArrowRight") return onStep(1);
      if (e.key === "ArrowLeft") return onStep(-1);
      if (e.key === "Tab" && panel.current) {
        const items = Array.from(panel.current.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      unlockScroll();
      opener?.focus?.({ preventScroll: true });
    };
  }, [isOpen, onClose, onStep]);

  // Back to the top of the panel whenever the project changes
  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
  }, [project?.slug]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="project-dialog"
          className="fixed inset-0 z-[85] flex items-end justify-center bg-ink/70 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.01 : 0.35 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            initial={{ y: reduce ? 0 : "8%", opacity: reduce ? 1 : 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: reduce ? 0 : "6%", opacity: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex h-[94svh] w-full max-w-6xl flex-col overflow-hidden rounded-t-3xl bg-bone sm:h-auto sm:max-h-[90svh] sm:rounded-2xl"
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-5 py-3 sm:px-8">
              <span className="eyebrow text-[0.68rem] text-muted tabular-nums">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onStep(-1)}
                  aria-label="Previous project"
                  className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-ink/5"
                >
                  <ArrowLeft size={20} strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={() => onStep(1)}
                  aria-label="Next project"
                  className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-ink/5"
                >
                  <ArrowRight size={20} strokeWidth={1.5} />
                </button>
                <button
                  ref={closeBtn}
                  type="button"
                  onClick={onClose}
                  aria-label="Close project"
                  className="ml-1 flex h-11 w-11 items-center justify-center rounded-full bg-ink text-bone hover:bg-clay"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            <div
              ref={scroller}
              data-lenis-prevent
              className="grid flex-1 overflow-y-auto overscroll-contain md:grid-cols-2"
            >
              <div className="relative aspect-[4/5] w-full bg-sand md:aspect-auto md:min-h-[32rem]">
                <Photo
                  key={project.image.id}
                  id={project.image.id}
                  alt={project.image.alt}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  priority
                />
              </div>

              <div className="flex flex-col p-6 sm:p-9 lg:p-12">
                <p className="eyebrow text-clay">
                  {project.category} · {project.year}
                </p>
                <h3
                  id="project-dialog-title"
                  className="font-display mt-3 text-[clamp(2.2rem,6vw,3.6rem)] leading-[1]"
                >
                  {project.title}
                </h3>
                <p className="mt-5 text-lg leading-relaxed">{project.summary}</p>
                <p className="mt-5 leading-[1.75] text-muted">{project.story}</p>

                <dl className="mt-8 divide-y divide-ink/12 border-y border-ink/12 text-[0.95rem]">
                  <div className="flex justify-between gap-6 py-3.5">
                    <dt className="eyebrow text-[0.66rem] text-muted">Medium</dt>
                    <dd className="text-right">{project.medium}</dd>
                  </div>
                  <div className="flex justify-between gap-6 py-3.5">
                    <dt className="eyebrow text-[0.66rem] text-muted">Scale</dt>
                    <dd className="text-right">{project.size}</dd>
                  </div>
                </dl>

                <div className="mt-8">
                  <ScrollButton
                    target="contact"
                    onClick={onClose}
                    className="w-full sm:w-auto"
                  >
                    Commission something similar
                  </ScrollButton>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
