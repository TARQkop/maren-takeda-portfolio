"use client";

import { useCallback, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { projects } from "@/data/content";
import Frame from "../Frame";
import { Reveal, Words } from "../Reveal";
import ProjectDialog from "../ProjectDialog";
import { cn } from "@/lib/cn";

export default function Work() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [slide, setSlide] = useState(0);
  const track = useRef<HTMLUListElement>(null);
  const ticking = useRef(false);

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setOpenIndex((i) => (i === null ? i : (i + dir + projects.length) % projects.length)),
    [],
  );

  // Mobile carousel: keep the "02 / 06" counter in sync with the snapped card
  const onScroll = () => {
    if (ticking.current || !track.current) return;
    ticking.current = true;
    requestAnimationFrame(() => {
      const el = track.current;
      ticking.current = false;
      if (!el) return;
      const center = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      Array.from(el.children).forEach((child, i) => {
        const c = child as HTMLElement;
        const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setSlide(best);
    });
  };

  return (
    <section id="work" aria-label="Selected work" className="section-y bg-sand">
      <div className="container-x">
        <div className="mb-12 flex flex-col gap-8 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal className="eyebrow mb-6 flex items-center gap-4 text-clay">
              <span>03</span>
              <span aria-hidden className="h-px w-12 bg-clay" />
              <span>Selected work</span>
            </Reveal>
            <Words
              as="h2"
              text="Six bodies of work, forty fires."
              className="font-display max-w-3xl text-[clamp(2.4rem,8.4vw,5rem)] leading-[1.02]"
            />
          </div>
          <Reveal className="max-w-sm text-muted">
            <p>
              Tap any piece to read the story behind it. Everything shown was thrown, glazed and fired in my own studio.
            </p>
          </Reveal>
        </div>

        {/* Phones: snap carousel · md+: editorial offset grid */}
        <ul
          ref={track}
          onScroll={onScroll}
          aria-label="Projects"
          className="no-scrollbar -mx-[var(--gutter)] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-2 md:mx-0 md:grid md:snap-none md:grid-cols-12 md:gap-x-10 md:gap-y-16 md:overflow-visible md:px-0 lg:gap-x-14"
        >
          {projects.map((p, i) => (
            <li
              key={p.slug}
              className={cn(
                "w-[78vw] max-w-[24rem] shrink-0 snap-center md:w-auto md:max-w-none md:shrink md:snap-align-none",
                p.layout,
              )}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                data-cursor="View"
                aria-haspopup="dialog"
                aria-label={`Open project: ${p.title}, ${p.year}`}
                className="group block w-full text-left"
              >
                <div className="relative [&_img]:transition-transform [&_img]:duration-[900ms] [&_img]:ease-[var(--ease-out-expo)] group-hover:[&_img]:scale-[1.05] group-focus-visible:[&_img]:scale-[1.05]">
                  <Frame
                    id={p.image.id}
                    alt={p.image.alt}
                    sizes="(min-width: 1024px) 45vw, (min-width: 768px) 55vw, 78vw"
                    parallax={i % 2 === 0 ? 5 : 3}
                    className={cn("w-full", p.ratio)}
                  />
                  <span
                    aria-hidden
                    className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-bone text-ink transition-all duration-500 group-hover:bg-clay group-hover:text-bone md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
                  >
                    <Plus size={22} strokeWidth={1.5} />
                  </span>
                </div>

                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-[clamp(1.5rem,5.5vw,2.1rem)] leading-tight">
                    <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-700 group-hover:bg-[length:100%_1px]">
                      {p.title}
                    </span>
                  </h3>
                  <span className="eyebrow shrink-0 text-[0.68rem] text-muted tabular-nums">{p.year}</span>
                </div>
                <p className="eyebrow mt-2 text-[0.64rem] text-clay">{p.category}</p>
                <p className="mt-3 max-w-md text-[0.97rem] leading-relaxed text-muted">{p.summary}</p>
                <p className="mt-2 text-[0.82rem] text-muted/80">{p.size}</p>
              </button>
            </li>
          ))}
        </ul>

        {/* Phone carousel counter */}
        <div aria-hidden className="mt-6 flex items-center gap-4 md:hidden">
          <span className="eyebrow text-[0.7rem] tabular-nums">
            {String(slide + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
          <span className="relative h-px flex-1 bg-ink/15">
            <span
              className="absolute left-0 top-0 h-px bg-clay transition-all duration-500"
              style={{
                width: `${100 / projects.length}%`,
                transform: `translateX(${slide * 100}%)`,
              }}
            />
          </span>
          <span className="eyebrow text-[0.7rem] text-muted">Swipe</span>
        </div>
      </div>

      <ProjectDialog
        project={openIndex === null ? null : projects[openIndex]}
        index={openIndex ?? 0}
        total={projects.length}
        onClose={close}
        onStep={step}
      />
    </section>
  );
}
