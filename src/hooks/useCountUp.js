import { useEffect, useRef, useState } from "react";

/**
 * Splits a value like "50k+" into { prefix, number, suffix } so the numeric
 * part can be animated while decoration is preserved.
 */
function parseValue(value) {
  if (typeof value === "number") {
    return { prefix: "", number: value, suffix: "" };
  }

  const raw = String(value ?? "");
  const match = raw.match(/^([^\d-]*)(-?[\d,.]+)(.*)$/);
  if (!match) return { prefix: "", number: null, suffix: raw };

  const [, prefix, digits, suffix] = match;
  const number = Number(digits.replace(/,/g, ""));

  return Number.isFinite(number)
    ? { prefix, number, suffix }
    : { prefix: "", number: null, suffix: raw };
}

/**
 * Counts up to `value` once the element scrolls into view.
 * Returns a ref to attach and the string to render.
 *
 *   const { ref, display } = useCountUp("50k+");
 */
export default function useCountUp(value, { duration = 1600, enabled = true } = {}) {
  const { prefix, number, suffix } = parseValue(value);
  const ref = useRef(null);
  const [current, setCurrent] = useState(number === null ? null : 0);

  useEffect(() => {
    if (!enabled || number === null) {
      setCurrent(number);
      return;
    }

    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      setCurrent(number);
      return;
    }

    const node = ref.current;
    if (!node) return;

    let frame;
    let startedAt;

    const step = (timestamp) => {
      if (startedAt === undefined) startedAt = timestamp;
      const progress = Math.min((timestamp - startedAt) / duration, 1);
      // easeOutCubic — fast start, gentle settle
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(number * eased);
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          frame = requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [number, duration, enabled]);

  // Preserve the source value's decimal precision.
  const decimals = String(number ?? "").includes(".")
    ? String(number).split(".")[1].length
    : 0;

  const display =
    current === null
      ? suffix
      : `${prefix}${current.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}${suffix}`;

  return { ref, display };
}
