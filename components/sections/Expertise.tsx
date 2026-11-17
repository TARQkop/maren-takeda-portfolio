"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { expertise, process, skills } from "@/data/content";
import Photo from "../Photo";
import { Reveal, Words } from "../Reveal";
import { cn } from "@/lib/cn";

export default function Expertise() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const current = expertise[active];

  return (
    <section id="expertise" aria-label="Expertise and services" className="section-y">
      <div className="container-x">
        <div className="mb-12 lg:mb-20">
          <Reveal className="eyebrow mb-6 flex items-center gap-4 text-clay">
            <span>04</span>
            <span aria-hidden className="h-px w-12 bg-clay" />
            <span>Expertise &amp; services</span>
          </Reveal>
          <Words
            as="h2"
            text="What I can make for you."
            className="font-display max-w-4xl text-[clamp(2.4rem,8.4vw,5rem)] leading-[1.02]"
          />
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Interactive list (accordion on phones, with preview image on desktop) */}
          <div className="lg:col-span-7">
            <ul className="border-t border-ink/15">
              {expertise.map((item, i) => {
                const isActive = i === active;
                return (
                  <li key={item.n} className="border-b border-ink/15">
                    <h3>
                      <button
                        type="button"
                        id={`exp-tab-${i}`}
                        aria-expanded={isActive}
                        aria-controls={`exp-panel-${i}`}
                        onClick={() => setActive(i)}
                        onMouseEnter={() => window.matchMedia("(hover: hover)").matches && setActive(i)}
                        className="group flex min-h-16 w-full items-center gap-4 py-5 text-left sm:gap-7"
                      >
                        <span
                          className={cn(
                            "eyebrow w-7 shrink-0 text-[0.7rem] transition-colors",
                            isActive ? "text-clay" : "text-muted",
                          )}
                        >
                          {item.n}
                        </span>
                        <span
                          className={cn(
                            "font-display flex-1 text-[clamp(1.55rem,5.6vw,2.6rem)] leading-[1.1] transition-all duration-500",
                            isActive ? "translate-x-0 text-ink" : "text-ink/55 group-hover:text-ink",
                          )}
                        >
                          {item.title}
                        </span>
                        <span
                          aria-hidden
                          className={cn(
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/25 transition-all duration-500",
                            isActive && "rotate-45 border-clay bg-clay text-bone",
                          )}
                        >
                          <Plus size={18} strokeWidth={1.5} />
                        </span>
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          id={`exp-panel-${i}`}
                          role="region"
                          aria-labelledby={`exp-tab-${i}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: reduce ? 0.01 : 0.6, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-8 sm:pl-[3.75rem]">
                            {/* phone / tablet preview image inside the panel */}
                            <div className="relative mb-6 aspect-[4/3] overflow-hidden bg-sand lg:hidden">
                              <Photo
                                id={item.image.id}
                                alt={item.image.alt}
                                sizes="(min-width: 640px) 60vw, 100vw"
                              />
                            </div>
                            <p className="max-w-xl text-lg leading-relaxed">{item.blurb}</p>
                            <ul className="mt-5 space-y-2.5 text-[0.98rem] text-muted">
                              {item.details.map((d) => (
                                <li key={d} className="flex gap-3">
                                  <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-clay" />
                                  {d}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Desktop sticky preview */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden bg-sand">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={current.image.id}
                    className="absolute inset-0"
                    initial={{ clipPath: "inset(0 0 100% 0)", scale: 1.12 }}
                    animate={{ clipPath: "inset(0 0 0% 0)", scale: 1 }}
                    exit={{ opacity: 0.6 }}
                    transition={{ duration: reduce ? 0.01 : 0.9, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <Photo
                      id={current.image.id}
                      alt={current.image.alt}
                      sizes="40vw"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              <p className="eyebrow mt-4 text-[0.66rem] text-muted">
                {current.n} — {current.title}
              </p>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-20 lg:mt-28">
          <Reveal className="eyebrow mb-6 text-muted">Working knowledge</Reveal>
          {reduce ? (
            <ul className="flex flex-wrap gap-2.5">
              {skills.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-ink/20 px-4 py-2 text-[0.9rem]"
                >
                  {s}
                </li>
              ))}
            </ul>
          ) : (
            <Reveal className="overflow-hidden">
              <div className="skills-marquee-track flex w-max">
                {[false, true].map((duplicate) => (
                  <ul
                    key={String(duplicate)}
                    aria-hidden={duplicate || undefined}
                    className="flex shrink-0 gap-2.5 pr-2.5"
                  >
                    {skills.map((s) => (
                      <li
                        key={s}
                        className="rounded-full border border-ink/20 px-4 py-2 text-[0.9rem] transition-colors duration-300 hover:border-clay hover:bg-clay hover:text-bone"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </Reveal>
          )}
        </div>

        {/* Process */}
        <div className="mt-20 lg:mt-28">
          <Reveal className="eyebrow mb-8 text-clay">How a commission works</Reveal>
          <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((s, i) => (
              <Reveal
                as="li"
                key={s.n}
                delay={i * 0.08}
                className="group border-t border-ink/20 pt-5 transition-colors duration-300 hover:border-clay"
              >
                <span className="font-display text-3xl text-clay transition-transform duration-300 group-hover:translate-x-1">
                  {s.n}
                </span>
                <h3 className="font-display mt-3 text-2xl transition-colors duration-300 group-hover:text-clay">
                  {s.title}
                </h3>
                <p className="mt-2 text-[0.96rem] leading-relaxed text-muted transition-colors duration-300 group-hover:text-ink">
                  {s.text}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
