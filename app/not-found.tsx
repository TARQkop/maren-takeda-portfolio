import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-start justify-center gap-6 px-[var(--gutter)]">
      <p className="eyebrow text-clay">404</p>
      <h1 className="font-display text-5xl leading-none sm:text-7xl">This pot was never thrown.</h1>
      <p className="max-w-md text-muted">The page you’re looking for doesn’t exist, but the studio is open.</p>
      <Link
        href="/"
        className="inline-flex min-h-12 items-center rounded-full bg-ink px-7 text-bone transition-colors hover:bg-clay"
      >
        Back to the studio
      </Link>
    </main>
  );
}
