import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "../../lib/cn";
import useCountUp from "../../hooks/useCountUp";

/**
 * Marketing stat: animated number with a label. `value` may be a number, or a
 * string like "50k+" / "24/7" — non-numeric values render as-is.
 */
export function CountStat({ value, label, className, animate = true }) {
  const { ref, display } = useCountUp(value, { enabled: animate });

  return (
    <div ref={ref} className={cn("flex flex-col gap-1 text-center", className)}>
      <span className="text-fluid-4xl font-bold tracking-tight text-brand-600">
        {display}
      </span>
      <span className="text-fluid-sm font-semibold text-fg-muted">{label}</span>
    </div>
  );
}

/**
 * Dashboard KPI tile. `delta` is a signed percentage; positive renders green
 * and negative renders red, with `invertDelta` for metrics where down is good.
 */
export function StatCard({
  label,
  value,
  delta,
  deltaLabel = "vs last month",
  icon: Icon,
  tone = "brand",
  className,
}) {
  const tones = {
    brand: "bg-brand-50 text-brand-600",
    accent: "bg-accent-50 text-accent-600",
    info: "bg-info-soft text-info",
    danger: "bg-danger-soft text-danger",
    neutral: "bg-surface-3 text-fg-muted",
  };

  const positive = typeof delta === "number" && delta >= 0;

  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-surface p-4 shadow-xs transition-shadow hover:shadow-md sm:p-5",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-fluid-sm font-medium text-fg-subtle">{label}</p>
        {Icon && (
          <span
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
              tones[tone] ?? tones.brand
            )}
          >
            <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
          </span>
        )}
      </div>

      <p className="mt-2 text-fluid-3xl font-bold tracking-tight text-fg">
        {value}
      </p>

      {typeof delta === "number" && (
        <div className="mt-2 flex items-center gap-1.5 text-fluid-sm">
          <span
            className={cn(
              "inline-flex items-center gap-0.5 font-semibold",
              positive ? "text-success" : "text-danger"
            )}
          >
            {positive ? (
              <ArrowUpRight className="h-3.5 w-3.5" />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5" />
            )}
            {Math.abs(delta)}%
          </span>
          <span className="truncate text-fg-faint">{deltaLabel}</span>
        </div>
      )}
    </div>
  );
}

export default StatCard;
