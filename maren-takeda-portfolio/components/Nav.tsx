"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { nav, person } from "@/data/content";
import { scrollToId, lockScroll, unlockScroll } from "@/lib/scroll";
import { cn } from "@/lib/cn";
import { useReady } from "./Providers";

export default function Nav() {
  const reduce = useReducedMotion();
  const ready = useReady();
  const [active, setActive] = useState<string>("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  // Highlight the section currently crossing the middle of the viewport
  useEffect(() => {
    const els = nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu: lock scroll, Escape to close, focus management, close on desktop resize
  useEffect(() => {
    if (!open) return;
    lockScroll();
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      unlockScroll();
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
      toggleRef.current?.focus({ preventScroll: true });
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    // let the menu start closing / scroll unlock before travelling
    window.setTimeout(() => scrollToId(id), open ? 380 : 0);
  };

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: ready ? 0 : -24, opacity: ready ? 1 : 0 }}
        transition={{ duration: reduce ? 0.01 : 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-[80] transition-[background-color,backdrop-filter,border-color] duration-500",
          scrolled && !open
            ? "border-b border-ink/10 bg-bone/88 backdrop-blur-md"
            : "border-b border-transparent",
        )}
      >
        <div className="container-x flex h-16 items-center justify-between lg:h-20">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              go("home");
            }}
            aria-label={`${person.name} — back to top`}
            className={cn(
              "font-display text-xl leading-none transition-colors duration-500",
              open ? "text-bone" : "text-ink",
            )}
          >
            Maren&nbsp;Takeda
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {nav.slice(1).map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      go(item.id);
                    }}
                    aria-current={active === item.id ? "true" : undefined}
                    className="group relative flex items-baseline gap-2 py-2 text-[0.92rem]"
                  >
                    <span className="eyebrow text-[0.62rem] text-clay">{item.n}</span>
                    <span>{item.label}</span>
                    <span
                      aria-hidden
                      className={cn(
                        "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-clay transition-transform duration-500 ease-[var(--ease-out-expo)]",
                        active === item.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={cn(
              "-mr-2 flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-500 lg:hidden",
              open ? "text-bone" : "text-ink",
            )}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "x" : "m"}
                initial={{ rotate: -80, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 80, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="flex"
              >
                {open ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "circle(0% at calc(100% - 2.2rem) 2.2rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.2rem) 2.2rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.2rem) 2.2rem)" }}
            transition={{ duration: reduce ? 0.01 : 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="on-dark fixed inset-0 z-[75] flex flex-col bg-ink px-[var(--gutter)] pb-8 pt-24 text-bone lg:hidden"
          >
            <ul className="flex flex-1 flex-col justify-center gap-1 overflow-y-auto">
              {nav.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 36 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    delay: reduce ? 0 : 0.18 + i * 0.06,
                    duration: reduce ? 0.01 : 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <a
                    ref={i === 0 ? firstLink : undefined}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      go(item.id);
                    }}
                    aria-current={active === item.id ? "true" : undefined}
                    className="flex min-h-14 items-baseline gap-4 border-b border-bone/10 py-2"
                  >
                    <span className="eyebrow w-7 text-[0.7rem] text-clay-soft">{item.n}</span>
                    <span
                      className={cn(
                        "font-display text-[clamp(2.1rem,9.5vw,3.4rem)] leading-[1.1]",
                        active === item.id && "text-clay-soft",
                      )}
                    >
                      {item.label}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: reduce ? 0 : 0.65, duration: 0.5 }}
              className="mt-6 flex flex-col gap-2 text-sm text-muted-dark"
            >
              <span className="flex items-center gap-2">
                <span aria-hidden className="h-2 w-2 rounded-full bg-celadon" />
                {person.availability}
              </span>
              <a href={`mailto:${person.email}`} className="min-h-11 py-2 text-bone underline underline-offset-4">
                {person.email}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
