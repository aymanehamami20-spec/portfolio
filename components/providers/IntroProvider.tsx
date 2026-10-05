"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type IntroValue = {
  /** True once the loader has finished (or was skipped entirely). */
  ready: boolean;
  complete: () => void;
};

const IntroContext = createContext<IntroValue>({
  ready: true,
  complete: () => {},
});

export function IntroProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const complete = useCallback(() => setReady(true), []);
  const value = useMemo(() => ({ ready, complete }), [ready, complete]);

  return (
    <IntroContext.Provider value={value}>{children}</IntroContext.Provider>
  );
}

export function useIntro(): IntroValue {
  return useContext(IntroContext);
}
