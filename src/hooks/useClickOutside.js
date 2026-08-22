import { useEffect, useRef } from "react";

/**
 * Calls `handler` when a pointer press or focus lands outside `ref`.
 * Uses `pointerdown` so the callback fires before click handlers inside.
 */
export default function useClickOutside(handler, enabled = true) {
  const ref = useRef(null);
  const handlerRef = useRef(handler);

  // Keep the latest handler without re-binding listeners each render.
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!enabled) return;

    const onPointerDown = (event) => {
      const node = ref.current;
      if (node && !node.contains(event.target)) handlerRef.current?.(event);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("focusin", onPointerDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("focusin", onPointerDown);
    };
  }, [enabled]);

  return ref;
}
