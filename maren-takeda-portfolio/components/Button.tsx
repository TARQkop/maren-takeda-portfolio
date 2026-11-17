"use client";

import { ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { scrollToId } from "@/lib/scroll";

type Variant = "solid" | "outline" | "light";

const variants: Record<Variant, { base: string; fill: string }> = {
  solid: { base: "bg-ink text-bone border-ink", fill: "bg-clay" },
  outline: { base: "bg-transparent text-ink border-ink/40 hover:border-clay", fill: "bg-clay" },
  light: { base: "bg-bone text-ink border-bone", fill: "bg-ochre" },
};

type Common = { variant?: Variant; children: ReactNode; className?: string };

const shell = (variant: Variant, className?: string) =>
  cn(
    "group relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-full border px-7 py-3 text-[0.95rem] font-medium transition-colors duration-500",
    variants[variant].base,
    className,
  );

function Inner({ variant, children }: { variant: Variant; children: ReactNode }) {
  const hoverText = variant === "outline" ? "group-hover:text-bone" : variant === "light" ? "" : "";
  return (
    <>
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 translate-y-[101%] rounded-[inherit] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-focus-visible:translate-y-0",
          variants[variant].fill,
        )}
      />
      <span className={cn("relative z-10 flex items-center gap-3 transition-colors duration-500", hoverText)}>
        {children}
        <ArrowUpRight
          aria-hidden
          size={18}
          className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </>
  );
}

/** Button that scrolls to a section on this page. */
export function ScrollButton({
  target,
  variant = "solid",
  className,
  children,
  onClick,
}: Common & { target: string; onClick?: () => void }) {
  return (
    <a
      href={`#${target}`}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
        scrollToId(target);
      }}
      className={shell(variant, className)}
    >
      <Inner variant={variant}>{children}</Inner>
    </a>
  );
}

/** Regular button (submit, actions). */
export function ActionButton({
  variant = "solid",
  className,
  children,
  ...rest
}: Common & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button {...rest} className={shell(variant, className)}>
      <Inner variant={variant}>{children}</Inner>
    </button>
  );
}
