"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { projects, type Project } from "@/data/content";
import Frame from "../Frame";
import { Reveal, Words } from "../Reveal";
import ProjectDialog from "../ProjectDialog";
import { cn } from "@/lib/cn";

/** Conveyor speed on phones, in CSS pixels per second. */
const BELT_SPEED = 38;
/** How long the belt stays paused after the visitor lets go of it. */
const RESUME_DELAY = 1800;

function Card({
  p,
  index,
  clone,
  onOpen,
}: {
  p: Project;
  index: number;
  clone?: boolean;
  onOpen: (i: number) => void;
}) {
  return (
    <li
      // The second copy exists only to make the phone belt loop seamlessly
      aria-hidden={clone || undefined}
      className={cn(
        "w-[78vw] max-w-[24rem] shrink-0 md:w-auto md:max-w-none md:shrink",
        clone && "md:hidden",
        p.layout,
      )}
    >
      <button
        type="button"
        onClick={() => onOpen(index)}
        data-cursor="View"
        aria-haspopup="dialog"
        aria-label={`Open project: ${p.title}, ${p.year}`}
        tabIndex={clone ? -1 : undefined}
        className="group block w-full text-left"
      >
        <div className="relative [&_img]:transition-transform [&_img]:duration-[900ms] [&_img]:ease-[var(--ease-out-expo)] group-hover:[&_img]:scale-[1.05] group-focus-visible:[&_img]:scale-[1.05]">
          <Frame
            id={p.image.id}
            alt={clone ? "" : p.image.alt}
            sizes="(min-width: 1024px) 45vw, (min-width: 768px) 55vw, 78vw"
            parallax={index % 2 === 0 ? 5 : 3}
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
  );
}

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
  const open = useCallback((i: number) => setOpenIndex(i), []);

  // Phone counter: which project is currently in the middle of the belt
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
      setSlide(best % projects.length);
    });
  };

  // Conveyor belt (phones only): glide left forever, loop seamlessly over the
  // duplicated set, pause while touched or off-screen or while a project is open.
  useEffect(() => {
    const el = track.current;
    if (!el) return;

    const phone = window.matchMedia("(max-width: 767px)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");

    let raf = 0;
    let last = 0;
    let pos = 0;
    let synced = false;
    let pausedUntil = 0;
    let visible = false;

    const hold = () => {
      pausedUntil = Infinity;
    };
    const release = () => {
      pausedUntil = performance.now() + RESUME_DELAY;
    };

    const loopWidth = () => {
      const first = el.children[0] as HTMLElement | undefined;
      const clone = el.children[projects.length] as HTMLElement | undefined;
      return first && clone ? clone.offsetLeft - first.offsetLeft : 0;
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(64, now - (last || now));
      last = now;

      if (!visible || now < pausedUntil) {
        synced = false; // the visitor (or momentum) moved it: re-read the position afterwards
        return;
      }
      if (!synced) {
        pos = el.scrollLeft;
        synced = true;
      }
      const w = loopWidth();
      if (!w) return;

      pos += (BELT_SPEED * dt) / 1000;
      if (pos >= w) pos -= w;
      el.scrollLeft = pos;
    };

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.2 });
    io.observe(el);

    const start = () => {
      cancelAnimationFrame(raf);
      last = 0;
      synced = false;
      if (phone.matches && !calm.matches) raf = requestAnimationFrame(frame);
    };

    el.addEventListener("touchstart", hold, { passive: true });
    el.addEventListener("touchend", release, { passive: true });
    el.addEventListener("touchcancel", release, { passive: true });
    el.addEventListener("pointerdown", hold, { passive: true });
    el.addEventListener("pointerup", release, { passive: true });
    phone.addEventListener("change", start);
    calm.addEventListener("change", start);
    start();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      el.removeEventListener("touchstart", hold);
      el.removeEventListener("touchend", release);
      el.removeEventListener("touchcancel", release);
      el.removeEventListener("pointerdown", hold);
      el.removeEventListener("pointerup", release);
      phone.removeEventListener("change", start);
      calm.removeEventListener("change", start);
    };
  }, []);

  // Keep the belt still while a project dialog is open
  useEffect(() => {
    const el = track.current;
    if (!el || openIndex === null) return;
    el.dispatchEvent(new Event("touchstart"));
    return () => {
      el.dispatchEvent(new Event("touchend"));
    };
  }, [openIndex]);

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

        {/* Phones: self-moving conveyor belt (swipe to take over) · md+: editorial offset grid */}
        <ul
          ref={track}
          onScroll={onScroll}
          aria-label="Projects"
          className="no-scrollbar -mx-[var(--gutter)] flex gap-4 overflow-x-auto px-[var(--gutter)] pb-2 md:mx-0 md:grid md:grid-cols-12 md:gap-x-10 md:gap-y-16 md:overflow-visible md:px-0 lg:gap-x-14"
        >
          {projects.map((p, i) => (
            <Card key={p.slug} p={p} index={i} onOpen={open} />
          ))}
          {projects.map((p, i) => (
            <Card key={`${p.slug}-clone`} p={p} index={i} clone onOpen={open} />
          ))}
        </ul>

        {/* Phone counter */}
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
          <span className="eyebrow text-[0.7rem] text-muted">Drag</span>
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
