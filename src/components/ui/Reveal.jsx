import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/cn";

/**
 * Reveals its children when they scroll into view. Falls back to visible
 * immediately when IntersectionObserver is unavailable or the user prefers
 * reduced motion.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  direction = "up",
  once = true,
  className,
  threshold = 0.12,
  ...props
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, threshold]);

  const hidden = {
    up: "translate-y-6",
    down: "-translate-y-6",
    left: "translate-x-6",
    right: "-translate-x-6",
    none: "scale-[0.98]",
  };

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
        visible
          ? "translate-x-0 translate-y-0 scale-100 opacity-100"
          : cn("opacity-0", hidden[direction] ?? hidden.up),
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
