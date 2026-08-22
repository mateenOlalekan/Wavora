import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "../../lib/cn";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Accessible modal dialog: portalled, focus-trapped, Escape to close,
 * background scroll locked, and focus returned to the trigger on close.
 */
export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  className,
}) {
  const panelRef = useRef(null);
  const previouslyFocused = useRef(null);

  // Remember the trigger so focus can be restored when the dialog closes.
  useEffect(() => {
    if (open) previouslyFocused.current = document.activeElement;
    else previouslyFocused.current?.focus?.();
  }, [open]);

  // Lock background scroll, compensating for the removed scrollbar width so
  // the page behind does not shift.
  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [open]);

  // Escape closes; Tab cycles within the panel.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose?.();
        return;
      }
      if (event.key !== "Tab") return;

      const nodes = panelRef.current?.querySelectorAll(FOCUSABLE);
      if (!nodes?.length) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // Move focus into the panel once it mounts.
  useEffect(() => {
    if (!open) return;
    const target =
      panelRef.current?.querySelector(FOCUSABLE) ?? panelRef.current;
    // Defer so the element exists and the animation has started.
    const raf = requestAnimationFrame(() => target?.focus?.());
    return () => cancelAnimationFrame(raf);
  }, [open]);

  if (!open) return null;

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-[calc(100vw-2rem)]",
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === "string" ? title : undefined}
        tabIndex={-1}
        className={cn(
          "relative z-10 flex max-h-[92dvh] w-full flex-col overflow-hidden bg-surface shadow-2xl",
          "rounded-t-3xl sm:rounded-2xl animate-scale-in",
          sizes[size] ?? sizes.md,
          className
        )}
      >
        {(title || description) && (
          <div className="flex items-start justify-between gap-4 border-b border-line p-5 sm:p-6">
            <div className="min-w-0">
              {title && (
                <h2 className="text-fluid-xl font-bold text-fg">{title}</h2>
              )}
              {description && (
                <p className="mt-1 text-fluid-sm text-fg-muted">
                  {description}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="tap -m-2 flex shrink-0 items-center justify-center rounded-xl p-2 text-fg-subtle transition hover:bg-surface-3 hover:text-fg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        <div className="thin-scrollbar flex-1 overflow-y-auto p-5 sm:p-6">
          {children}
        </div>

        {footer && (
          <div className="flex flex-wrap items-center justify-end gap-3 border-t border-line bg-surface-2 p-4 sm:px-6">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
