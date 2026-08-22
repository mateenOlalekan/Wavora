import { Loader2 } from "lucide-react";
import { cn } from "../../lib/cn";

export default function Spinner({ size = "md", className, label = "Loading" }) {
  const sizes = { xs: "h-3.5 w-3.5", sm: "h-4 w-4", md: "h-6 w-6", lg: "h-8 w-8", xl: "h-12 w-12" };

  return (
    <Loader2
      role="status"
      aria-label={label}
      className={cn("animate-spin text-brand-600", sizes[size] ?? sizes.md, className)}
    />
  );
}

/** Grey placeholder block with a shimmer sweep. */
export function Skeleton({ className, rounded = "rounded-lg", ...props }) {
  return (
    <div
      aria-hidden="true"
      className={cn("shimmer", rounded, className)}
      {...props}
    />
  );
}

export function SkeletonText({ lines = 3, className }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-3.5"
          // Last line is shorter so it reads as a paragraph, not a block.
          style={{ width: i === lines - 1 ? "62%" : "100%" }}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className, media = true }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-line bg-surface",
        className
      )}
    >
      {media && <Skeleton className="h-48 w-full" rounded="rounded-none" />}
      <div className="space-y-3 p-5">
        <Skeleton className="h-5 w-3/4" />
        <SkeletonText lines={2} />
        <Skeleton className="h-9 w-28 rounded-xl" />
      </div>
    </div>
  );
}

/** Grid of skeleton cards, for list pages while data loads. */
export function SkeletonGrid({ count = 6, className, ...props }) {
  return (
    <div
      className={cn(
        "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} {...props} />
      ))}
    </div>
  );
}

/** Centred full-area loading state. */
export function LoadingBlock({ label = "Loading…", className }) {
  return (
    <div
      className={cn(
        "flex min-h-60 w-full flex-col items-center justify-center gap-3",
        className
      )}
    >
      <Spinner size="lg" />
      <p className="text-fluid-sm text-fg-subtle">{label}</p>
    </div>
  );
}
