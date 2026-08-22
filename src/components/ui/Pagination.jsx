import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/cn";

/**
 * Builds a page list with ellipses, e.g. [1, "…", 4, 5, 6, "…", 20].
 * Always shows the first and last page plus a window around the current one.
 */
function buildPages(current, total, window = 1) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = new Set([1, total]);
  for (let i = current - window; i <= current + window; i++) {
    if (i > 1 && i < total) pages.add(i);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const withGaps = [];

  sorted.forEach((page, index) => {
    if (index > 0 && page - sorted[index - 1] > 1) withGaps.push("…");
    withGaps.push(page);
  });

  return withGaps;
}

export default function Pagination({
  page = 1,
  totalPages = 1,
  onChange,
  className,
}) {
  if (totalPages <= 1) return null;

  const pages = buildPages(page, totalPages);

  const navButton =
    "tap flex items-center justify-center rounded-xl border border-line bg-surface text-fg-muted transition hover:bg-surface-3 hover:text-fg disabled:pointer-events-none disabled:opacity-40";

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center justify-center gap-1.5", className)}
    >
      <button
        type="button"
        onClick={() => onChange?.(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
        className={navButton}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((entry, index) =>
        entry === "…" ? (
          <span
            key={`gap-${index}`}
            className="px-1.5 text-fg-faint"
            aria-hidden="true"
          >
            …
          </span>
        ) : (
          <button
            key={entry}
            type="button"
            onClick={() => onChange?.(entry)}
            aria-current={entry === page ? "page" : undefined}
            aria-label={`Page ${entry}`}
            className={cn(
              "tap flex items-center justify-center rounded-xl px-3 text-fluid-sm font-semibold transition",
              entry === page
                ? "bg-brand-600 text-white shadow-brand"
                : "border border-line bg-surface text-fg-muted hover:bg-surface-3 hover:text-fg"
            )}
          >
            {entry}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onChange?.(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
        className={navButton}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
