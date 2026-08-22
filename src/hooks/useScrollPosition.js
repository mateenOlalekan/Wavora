import { useEffect, useState } from "react";

/**
 * Tracks vertical scroll offset and reports whether the page has scrolled past
 * `threshold`. Reads are throttled to one per animation frame.
 */
export default function useScrollPosition(threshold = 10) {
  const [state, setState] = useState({ y: 0, scrolled: false });

  useEffect(() => {
    let frame = null;

    const onScroll = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        setState((prev) =>
          prev.y === y ? prev : { y, scrolled: y > threshold }
        );
        frame = null;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return state;
}
