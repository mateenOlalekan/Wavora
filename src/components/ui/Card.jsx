import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";

/**
 * Surface container. Set `interactive` for hover lift on clickable cards,
 * or pass `to` to render the whole card as a router link.
 */
const Card = forwardRef(function Card(
  {
    as,
    to,
    className,
    children,
    padding = "md",
    interactive = false,
    elevated = false,
    ...props
  },
  ref
) {
  const Component = as || (to ? Link : "div");

  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-5 sm:p-6",
    lg: "p-6 sm:p-8",
  };

  return (
    <Component
      ref={ref}
      to={to}
      className={cn(
        "relative rounded-2xl border border-line bg-surface",
        elevated ? "shadow-lg" : "shadow-xs",
        interactive &&
          "transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl focus-visible:-translate-y-1",
        paddings[padding] ?? paddings.md,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
});

export function CardHeader({ className, children, ...props }) {
  return (
    <div className={cn("mb-4 flex items-start gap-3", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ as: Tag = "h3", className, children, ...props }) {
  return (
    <Tag
      className={cn("text-fluid-lg font-bold text-fg", className)}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function CardBody({ className, children, ...props }) {
  return (
    <div className={cn("text-fluid-sm text-fg-muted", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "mt-5 flex flex-wrap items-center gap-3 border-t border-line pt-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/** Square tinted icon tile used in the top-left of most feature cards. */
export function CardIcon({ icon: Icon, className, tone = "brand", ...props }) {
  const tones = {
    brand: "bg-brand-50 text-brand-600",
    accent: "bg-accent-50 text-accent-600",
    info: "bg-info-soft text-info",
    danger: "bg-danger-soft text-danger",
    neutral: "bg-surface-3 text-fg-muted",
  };

  return (
    <div
      className={cn(
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12",
        tones[tone] ?? tones.brand,
        className
      )}
      {...props}
    >
      {Icon && <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />}
    </div>
  );
}

export default Card;
