"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { MotionConfig } from "motion/react";

type ReadyState = { ready: boolean; setReady: (v: boolean) => void };

const ReadyContext = createContext<ReadyState>({ ready: false, setReady: () => {} });

/** `ready` flips to true once the loader curtain has lifted — hero animations wait for it. */
export const useReady = () => useContext(ReadyContext).ready;
export const useSetReady = () => useContext(ReadyContext).setReady;

export default function Providers({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const value = useMemo(() => ({ ready, setReady }), [ready]);
  return (
    <ReadyContext.Provider value={value}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ReadyContext.Provider>
  );
}
