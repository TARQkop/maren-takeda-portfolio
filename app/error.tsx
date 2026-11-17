"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-svh flex-col items-start justify-center gap-6 px-[var(--gutter)]">
      <p className="eyebrow text-clay">Something cracked in the kiln</p>
      <h1 className="font-display text-5xl leading-none sm:text-7xl">That didn’t fire properly.</h1>
      <p className="max-w-md text-muted">An unexpected error interrupted the page. Please try again.</p>
      <button
        type="button"
        onClick={reset}
        className="min-h-12 rounded-full bg-ink px-7 text-bone transition-colors hover:bg-clay"
      >
        Try again
      </button>
    </main>
  );
}
