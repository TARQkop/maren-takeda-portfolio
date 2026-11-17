"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { achievements, images, stats, timeline } from "@/data/content";
import Frame from "../Frame";
import { Reveal, Words } from "../Reveal";

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {value.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

export default function Experience() {
  const line = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: line, offset: ["start 70%", "end 60%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" aria-label="Experience and achievements" className="section-y on-dark bg-ink text-bone">
      <div className="container-x">
        <div className="mb-12 lg:mb-20">
          <Reveal className="eyebrow mb-6 flex items-center gap-4 text-clay-soft">
            <span>05</span>
            <span aria-hidden className="h-px w-12 bg-clay-soft" />
            <span>Experience &amp; achievements</span>
          </Reveal>
          <Words
            as="h2"
            text="Sixteen years of learning from fire."
            className="font-display max-w-4xl text-[clamp(2.4rem,8.4vw,5rem)] leading-[1.02]"
          />
        </div>

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Timeline */}
          <div className="lg:col-span-7">
            <ol ref={line} className="relative ml-2 space-y-12 pl-8 sm:pl-12">
              <span aria-hidden className="absolute bottom-2 left-0 top-2 w-px bg-bone/15" />
              <motion.span
                aria-hidden
                className="absolute bottom-2 left-0 top-2 w-px origin-top bg-clay-soft"
                style={{ scaleY }}
              />
              {timeline.map((t) => (
                <Reveal as="li" key={t.title} className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-[2.45rem] top-2 h-3 w-3 rounded-full border-2 border-clay-soft bg-ink sm:-left-[3.45rem]"
                  />
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span className="eyebrow text-[0.7rem] text-clay-soft tabular-nums">{t.years}</span>
                    <span className="eyebrow rounded-full border border-bone/20 px-2.5 py-0.5 text-[0.58rem] text-muted-dark">
                      {t.kind}
                    </span>
                  </div>
                  <h3 className="font-display mt-3 text-[clamp(1.5rem,5vw,2.2rem)] leading-tight">
                    {t.title}
                  </h3>
                  <p className="mt-1 text-[0.95rem] text-ochre">{t.place}</p>
                  <p className="mt-3 max-w-xl leading-[1.75] text-muted-dark">{t.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>

          {/* Milestones */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="grid grid-cols-2 gap-3">
                <Frame
                  id={images.experience.id}
                  alt={images.experience.alt}
                  sizes="(min-width: 1024px) 20vw, 45vw"
                  parallax={5}
                  className="aspect-[3/4] w-full"
                />
                <Frame
                  id={images.experienceSecondary.id}
                  alt={images.experienceSecondary.alt}
                  sizes="(min-width: 1024px) 20vw, 45vw"
                  className="mt-10 aspect-[3/4] w-full"
                />
              </div>

              <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-9">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dd className="font-display text-[clamp(2.4rem,7vw,3.6rem)] leading-none text-bone">
                      <Counter to={s.value} suffix={s.suffix} />
                    </dd>
                    <dt className="eyebrow mt-2 text-[0.62rem] text-muted-dark">{s.label}</dt>
                  </div>
                ))}
              </dl>

              <div className="mt-12">
                <p className="eyebrow mb-4 text-clay-soft">Recognition</p>
                <ul className="divide-y divide-bone/12 border-y border-bone/12">
                  {achievements.map((a) => (
                    <li key={a.text} className="flex gap-5 py-4">
                      <span className="eyebrow w-10 shrink-0 pt-1 text-[0.7rem] text-ochre tabular-nums">
                        {a.year}
                      </span>
                      <span className="leading-snug">{a.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
