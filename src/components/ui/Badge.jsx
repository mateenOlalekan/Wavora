import { cn } from "../../lib/cn";

const TONES = {
  brand: "bg-brand-50 text-brand-700 ring-brand-200",
  neutral: "bg-surface-3 text-fg-muted ring-line",
  success: "bg-success-soft text-success ring-brand-200",
  warning: "bg-warning-soft text-warning ring-accent-200",
  danger: "bg-danger-soft text-danger ring-red-200",
  info: "bg-info-soft text-info ring-blue-200",
  accent: "bg-accent-50 text-accent-700 ring-accent-200",
  solid: "bg-brand-600 text-white ring-brand-600",
};

const SIZES = {
  sm: "text-2xs px-2 py-0.5 gap-1",
  md: "text-xs px-2.5 py-1 gap-1.5",
  lg: "text-fluid-sm px-3 py-1.5 gap-2",
};

export default function Badge({
  tone = "brand",
  size = "md",
  icon: Icon,
  dot = false,
  ring = true,
  className,
  children,
  ...props
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-semibold whitespace-nowrap",
        ring && "ring-1 ring-inset",
        TONES[tone] ?? TONES.brand,
        SIZES[size] ?? SIZES.md,
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-current"
          aria-hidden="true"
        />
      )}
      {Icon && <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
      {children}
    </span>
  );
}

/** Maps arbitrary status strings onto badge tones. */
export function StatusBadge({ status, className, ...props }) {
  const map = {
    active: "success",
    confirmed: "success",
    completed: "success",
    paid: "success",
    resolved: "success",
    open: "info",
    pending: "warning",
    "checked-in": "info",
    "in-progress": "info",
    scheduled: "info",
    cancelled: "danger",
    failed: "danger",
    "no-show": "danger",
    overdue: "danger",
    inactive: "neutral",
    draft: "neutral",
    refunded: "neutral",
  };

  const label = String(status ?? "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <Badge
      tone={map[status] ?? "neutral"}
      dot
      className={cn("capitalize", className)}
      {...props}
    >
      {label || "Unknown"}
    </Badge>
  );
}
