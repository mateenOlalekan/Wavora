import {
  AlertCircle,
  CheckCircle2,
  Info,
  X,
  TriangleAlert,
} from "lucide-react";
import { cn } from "../../lib/cn";

const TONES = {
  success: {
    wrap: "bg-success-soft border-brand-200 text-brand-800",
    icon: CheckCircle2,
    iconColor: "text-success",
  },
  error: {
    wrap: "bg-danger-soft border-red-200 text-red-800",
    icon: AlertCircle,
    iconColor: "text-danger",
  },
  warning: {
    wrap: "bg-warning-soft border-accent-200 text-accent-800",
    icon: TriangleAlert,
    iconColor: "text-warning",
  },
  info: {
    wrap: "bg-info-soft border-blue-200 text-blue-800",
    icon: Info,
    iconColor: "text-info",
  },
};

/**
 * Inline status message. Errors and warnings announce themselves via
 * role="alert"; success/info use the politer status role.
 */
export default function Alert({
  tone = "info",
  title,
  children,
  onDismiss,
  className,
  icon: IconOverride,
  ...props
}) {
  const config = TONES[tone] ?? TONES.info;
  const Icon = IconOverride ?? config.icon;
  const assertive = tone === "error" || tone === "warning";

  return (
    <div
      role={assertive ? "alert" : "status"}
      aria-live={assertive ? "assertive" : "polite"}
      className={cn(
        "flex items-start gap-3 rounded-xl border p-4 text-fluid-sm",
        config.wrap,
        className
      )}
      {...props}
    >
      <Icon
        className={cn("mt-0.5 h-5 w-5 shrink-0", config.iconColor)}
        aria-hidden="true"
      />

      <div className="min-w-0 flex-1">
        {title && <p className="font-semibold">{title}</p>}
        {children && (
          <div className={cn("leading-relaxed", title && "mt-1 opacity-90")}>
            {children}
          </div>
        )}
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="-m-1 shrink-0 rounded-lg p-1 opacity-60 transition hover:bg-black/5 hover:opacity-100"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
