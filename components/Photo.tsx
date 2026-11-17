"use client";

import { useState } from "react";
import Image from "next/image";
import { unsplashLoader, photoUrl } from "@/lib/images";
import { cn } from "@/lib/cn";

type PhotoProps = {
  id: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** focal point for object-fit: cover, e.g. "50% 30%" */
  position?: string;
};

/** next/image wrapper: real Unsplash photo, responsive widths, graceful fallback. */
export default function Photo({ id, alt, sizes, priority, className, position }: PhotoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn("photo-fallback absolute inset-0", className)}
      />
    );
  }

  return (
    <Image
      loader={unsplashLoader}
      src={photoUrl(id)}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={72}
      onError={() => setFailed(true)}
      className={cn("object-cover", className)}
      style={position ? { objectPosition: position } : undefined}
    />
  );
}
