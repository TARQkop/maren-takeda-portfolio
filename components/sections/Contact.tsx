"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUp, Check, Copy, Mail, MapPin } from "lucide-react";
import { enquiryTypes, images, person } from "@/data/content";
import Frame from "../Frame";
import { Reveal, Words } from "../Reveal";
import { ActionButton } from "../Button";
import { scrollToId } from "@/lib/scroll";
import { cn } from "@/lib/cn";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const reduce = useReducedMotion();
  const [type, setType] = useState<string>(enquiryTypes[0]);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${person.email}`;
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const next: Errors = {};
    if (name.length < 2) next.name = "Please tell me your name.";
    if (!emailPattern.test(email)) next.email = "That email doesn't look quite right.";
    if (message.length < 12) next.message = "A few more words would help — what are you hoping to make?";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      (e.currentTarget.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    // No backend: the enquiry opens, fully written, in the visitor's mail app.
    const subject = encodeURIComponent(`${type} — enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${person.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const fieldClass =
    "w-full border-0 border-b bg-transparent px-0 py-3.5 text-[1.05rem] text-bone placeholder:text-muted-dark/70 focus:outline-none focus-visible:outline-none focus:border-ochre";

  return (
    <section id="contact" aria-label="Contact" className="on-dark bg-iron text-bone">
      <div className="section-y container-x">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left: message + details */}
          <div className="lg:col-span-6">
            <Reveal className="eyebrow mb-6 flex items-center gap-4 text-clay-soft">
              <span>06</span>
              <span aria-hidden className="h-px w-12 bg-clay-soft" />
              <span>Contact</span>
            </Reveal>
            <Words
              as="h2"
              text="Let's make something that outlasts the meal."
              className="font-display text-[clamp(2.5rem,9.4vw,5.6rem)] leading-[1]"
            />
            <Reveal className="mt-8 max-w-md text-lg leading-relaxed text-muted-dark">
              <p>
                Commissions for 2027 open in January and fill quickly. Tell me about the table, room or occasion, and I'll reply within three working days.
              </p>
            </Reveal>

            <Reveal className="mt-10 space-y-6">
              <div>
                <p className="eyebrow mb-2 text-[0.64rem] text-muted-dark">Email</p>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${person.email}`}
                    className="inline-flex min-h-11 items-center gap-2.5 text-[clamp(1.1rem,5.2vw,1.6rem)] font-medium tracking-tight underline decoration-bone/30 underline-offset-8 transition-colors hover:decoration-ochre"
                  >
                    <Mail size={22} strokeWidth={1.4} aria-hidden />
                    {person.email}
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-bone/25 px-4 text-sm transition-colors hover:border-ochre hover:text-ochre"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-3 text-muted-dark">
                <MapPin size={20} strokeWidth={1.4} className="mt-1 shrink-0 text-ochre" aria-hidden />
                <p>
                  {person.studio}, {person.city}
                  <br />
                  Studio visits by appointment, Tuesday to Friday.
                </p>
              </div>

              <ul className="flex flex-wrap gap-x-7 gap-y-1 pt-2">
                {person.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-1.5 border-b border-transparent text-bone transition-colors hover:border-ochre hover:text-ochre"
                    >
                      {s.label}
                      <span aria-hidden>↗</span>
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="mt-12 hidden lg:block">
              <Frame
                id={images.contact.id}
                alt={images.contact.alt}
                sizes="40vw"
                parallax={4}
                className="aspect-[16/9] w-full"
              />
            </Reveal>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="rounded-2xl bg-ink p-6 sm:p-9">
              <AnimatePresence mode="wait" initial={false}>
                {sent ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="py-10"
                    role="status"
                  >
                    <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-celadon text-ink">
                      <Check size={24} strokeWidth={1.8} />
                    </span>
                    <h3 className="font-display text-3xl leading-tight">Your email is ready to send.</h3>
                    <p className="mt-4 leading-relaxed text-muted-dark">
                      I've opened your mail app with the enquiry written out. Press send there and it comes straight to me. If nothing opened, copy my address above and paste your note in.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSent(false)}
                      className="mt-6 min-h-11 border-b border-bone/40 text-sm hover:border-ochre hover:text-ochre"
                    >
                      Write another note
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    aria-label="Enquiry form"
                    className="space-y-7"
                  >
                    <fieldset>
                      <legend className="eyebrow mb-3 text-[0.64rem] text-muted-dark">I'm enquiring about</legend>
                      <div className="flex flex-wrap gap-2">
                        {enquiryTypes.map((t) => (
                          <label key={t} className="cursor-pointer">
                            <input
                              type="radio"
                              name="type"
                              value={t}
                              checked={type === t}
                              onChange={() => setType(t)}
                              className="peer sr-only"
                            />
                            <span className="inline-flex min-h-11 items-center rounded-full border border-bone/25 px-4 text-[0.9rem] transition-colors peer-checked:border-ochre peer-checked:bg-ochre peer-checked:text-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ochre">
                              {t}
                            </span>
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    <div>
                      <label htmlFor="name" className="eyebrow text-[0.64rem] text-muted-dark">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your name"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={cn(fieldClass, errors.name ? "border-clay-soft" : "border-bone/25")}
                      />
                      {errors.name && (
                        <p id="name-error" role="alert" className="mt-1 text-sm text-clay-soft">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="eyebrow text-[0.64rem] text-muted-dark">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        placeholder="you@example.com"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={cn(fieldClass, errors.email ? "border-clay-soft" : "border-bone/25")}
                      />
                      {errors.email && (
                        <p id="email-error" role="alert" className="mt-1 text-sm text-clay-soft">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className="eyebrow text-[0.64rem] text-muted-dark">
                        Your project
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        placeholder="Tell me about the table, the room, the timeline…"
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "message-error" : undefined}
                        className={cn(fieldClass, "resize-none", errors.message ? "border-clay-soft" : "border-bone/25")}
                      />
                      {errors.message && (
                        <p id="message-error" role="alert" className="mt-1 text-sm text-clay-soft">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <ActionButton type="submit" variant="light" className="w-full">
                      Send enquiry
                    </ActionButton>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Closing line + footer */}
      <div className="border-t border-bone/12">
        <div className="container-x flex flex-col gap-6 py-8 text-sm text-muted-dark sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 Maren Takeda · {person.studio}, {person.city}. Photographs courtesy of Unsplash photographers.
          </p>
          <button
            type="button"
            onClick={() => scrollToId("home")}
            className="group inline-flex min-h-11 items-center gap-2 self-start text-bone hover:text-ochre sm:self-auto"
          >
            Back to top
            <ArrowUp size={16} className="transition-transform group-hover:-translate-y-1" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}
