"use client";

import { ArrowDown } from "lucide-react";
import { person, images, stats } from "@/data/content";
import Frame from "../Frame";
import { Reveal, Words } from "../Reveal";
import { ScrollButton } from "../Button";

const badgeText = "WOOD-FIRED · SALT-GLAZED · HAND-THROWN · ";

export default function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden pt-24 lg:pt-28">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Copy */}
          <div className="relative z-10 flex flex-col lg:col-span-7 lg:min-h-[calc(100svh-9rem)] lg:pb-10">
            <div>
              <Reveal trigger="ready" className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-3 lg:mb-10">
                <span className="eyebrow text-clay">
                  {person.role} — {person.city}
                </span>
                <span className="flex items-center gap-2.5 rounded-full border border-ink/15 py-1.5 pl-3 pr-4 text-[0.8rem]">
                  <span aria-hidden className="relative flex h-2.5 w-2.5">
                    <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-celadon" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-celadon" />
                  </span>
                  {person.availability}
                </span>
              </Reveal>

              <h1 id="hero-title" className="sr-only">
                {person.name} — {person.role}. {person.tagline}
              </h1>
              <Words
                as="p"
                trigger="ready"
                delay={0.15}
                text={person.tagline}
                className="font-display text-[clamp(3rem,13.4vw,5.2rem)] leading-[0.95] sm:text-[clamp(4rem,11vw,6.5rem)] lg:text-[clamp(4.6rem,8vw,9rem)]"
              />
            </div>

            <div className="mt-8 max-w-xl lg:mt-14">
              <Reveal trigger="ready" delay={0.4}>
                <p className="text-[1.05rem] leading-relaxed text-muted sm:text-lg">
                  {person.intro}
                </p>
              </Reveal>
              <Reveal trigger="ready" delay={0.52} className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ScrollButton target="work" className="w-full sm:w-auto">
                  See selected work
                </ScrollButton>
                <ScrollButton target="contact" variant="outline" className="w-full sm:w-auto">
                  Start a commission
                </ScrollButton>
              </Reveal>
            </div>
          </div>

          {/* Photograph */}
          <div className="relative -mx-[var(--gutter)] lg:col-span-5 lg:mx-0">
            <Frame
              id={images.hero.id}
              alt={images.hero.alt}
              sizes="(min-width: 1024px) 40vw, 100vw"
              priority
              trigger="ready"
              parallax={7}
              position="50% 40%"
              className="aspect-[4/5] w-full sm:aspect-[5/4] lg:aspect-auto lg:h-[calc(100svh-11rem)] lg:min-h-0"
            />

            {/* Rotating studio seal — decorative SVG type, not an image asset */}
            <div
              aria-hidden
              className="absolute -bottom-9 right-6 z-10 flex h-28 w-28 items-center justify-center rounded-full bg-bone sm:right-10 sm:h-32 sm:w-32 lg:bottom-24 lg:left-6 lg:right-auto lg:h-36 lg:w-36"
            >
              <svg viewBox="0 0 120 120" className="spin-slow absolute inset-0 h-full w-full">
                <defs>
                  <path id="seal" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
                </defs>
                <text fontSize="9" fill="currentColor" className="text-ink">
                  {/* textLength pins the string to the full circumference (2π·46 ≈ 289) so the ends never collide */}
                  <textPath href="#seal" textLength="286" lengthAdjust="spacing">
                    {badgeText}
                  </textPath>
                </text>
              </svg>
              <ArrowDown size={26} strokeWidth={1.4} className="text-clay" />
            </div>

            <p className="eyebrow mt-4 hidden px-[var(--gutter)] text-[0.66rem] text-muted lg:block lg:px-0">
              Fig. 01 — Throwing at Estúdio Cinza, Porto
            </p>
          </div>
        </div>

        {/* Quick facts */}
        <Reveal as="dl" trigger="ready" delay={0.65} className="mt-20 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-ink/15 py-8 sm:grid-cols-4 lg:mt-24">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="eyebrow order-2 mt-1 text-[0.66rem] text-muted">{s.label}</dt>
              <dd className="font-display text-[clamp(2.2rem,6vw,3.6rem)] leading-none">
                {s.value.toLocaleString("en-US")}
                {s.suffix}
              </dd>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
