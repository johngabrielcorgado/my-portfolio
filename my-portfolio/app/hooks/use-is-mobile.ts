"use client";

import { useEffect, useState } from "react";

const DEFAULT_QUERY = "(max-width: 768px)";

export default function useIsMobile(query: string = DEFAULT_QUERY) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const media = window.matchMedia(query);
    const handler = (event?: MediaQueryListEvent) =>
      setIsMobile(event ? event.matches : media.matches);

    handler();

    if (media.addEventListener) {
      media.addEventListener("change", handler);
      return () => media.removeEventListener("change", handler);
    }

    media.addListener(handler);
    return () => media.removeListener(handler);
  }, [query]);

  return isMobile;
}

