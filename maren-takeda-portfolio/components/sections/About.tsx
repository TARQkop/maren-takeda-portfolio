"use client";

import { images } from "@/data/content";
import Frame from "../Frame";
import { Reveal, Words } from "../Reveal";

const facts = [
  ["Born", "Lisbon, 1990"],
  ["Studio", "Estúdio Cinza, Porto"],
  ["Clay", "Douro river clay, local ash"],
  ["Fires", "Wood · gas · salt"],
  ["Languages", "Português · 日本語 · English"],
] as const;

export default function About() {
  return (
    <section id="about" aria-label="About Maren Takeda" className="section-y">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Heading column */}
          <div className="lg:col-span-5">
            <Reveal className="eyebrow mb-6 flex items-center gap-4 text-clay">
              <span>02</span>
              <span aria-hidden className="h-px w-12 bg-clay" />
              <span>About</span>
            </Reveal>
            <Words
              as="h2"
              text="Half Portuguese tile, half Japanese kiln."
              className="font-display text-[clamp(2.4rem,8.4vw,4.4rem)] leading-[1.02]"
            />

            {/* Images: stacked and offset on mobile, layered on desktop */}
            <div className="relative mt-12 lg:mt-16">
              <Frame
                id={images.aboutMain.id}
                alt={images.aboutMain.alt}
                sizes="(min-width: 1024px) 38vw, 82vw"
                parallax={6}
                position="50% 45%"
                className="aspect-[4/5] w-[82%] lg:w-[78%]"
              />
              <div className="absolute -bottom-10 right-0 w-[46%] sm:w-[40%] lg:-bottom-14 lg:w-[44%]">
                <Frame
                  id={images.aboutSecondary.id}
                  alt={images.aboutSecondary.alt}
                  sizes="(min-width: 1024px) 18vw, 40vw"
                  className="aspect-square w-full border-[6px] border-bone"
                />
              </div>
            </div>
          </div>

          {/* Story column */}
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-28">
            <Reveal className="space-y-6 text-[1.05rem] leading-[1.75] text-muted sm:text-lg">
              <p className="font-display text-[clamp(1.5rem,4.6vw,2.1rem)] leading-[1.25] tracking-tight text-ink">
                I grew up between two workbenches: my mother restoring eighteenth-century azulejos in Lisbon, my grandfather throwing rice bowls in Mashiko.
              </p>
              <p>
                Both taught me the same thing in different languages: a surface is a record of attention. At eighteen I thought that meant perfection. By thirty, after three years of apprenticeship in Japan and a winter spent rebuilding a collapsed kiln arch with my bare hands, I understood it meant honesty.
              </p>
              <p>
                Today I make tableware, vessels and installations from clay I dig myself along the Douro, finished with glazes mixed from local ash and fired with wood. Chefs ask me to make plates that make guests slow down. Architects ask for vessels that hold a room together. I say yes only when I can make something worth the fire.
              </p>
            </Reveal>

            <Reveal className="mt-12 border-l-2 border-clay pl-6 sm:pl-8">
              <p className="eyebrow mb-3 text-clay">Philosophy</p>
              <blockquote className="font-display text-[clamp(1.6rem,5vw,2.4rem)] leading-[1.2]">
                “Make things that get better with use. Anything else is just decoration waiting to be forgotten.”
              </blockquote>
            </Reveal>

            <Reveal as="dl" className="mt-14 divide-y divide-ink/12 border-y border-ink/12">
              {facts.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="eyebrow text-[0.68rem] text-muted">{k}</dt>
                  <dd className="text-right text-[0.98rem]">{v}</dd>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
