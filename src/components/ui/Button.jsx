import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { cn } from "../../lib/cn";

const VARIANTS = {
  primary:
    "bg-brand-600 text-white shadow-brand hover:bg-brand-700 active:bg-brand-800 disabled:bg-brand-300",
  secondary:
    "bg-fg text-surface hover:opacity-90 active:opacity-80",
  outline:
    "border border-line-strong bg-surface text-fg hover:bg-surface-3 active:bg-surface-3",
  soft:
    "bg-brand-50 text-brand-700 hover:bg-brand-100 active:bg-brand-200",
  ghost:
    "text-fg-muted hover:bg-surface-3 hover:text-fg active:bg-surface-3",
  danger:
    "bg-danger text-white hover:brightness-110 active:brightness-95",
  link:
    "text-brand-600 underline-offset-4 hover:underline p-0 h-auto shadow-none",
};

const SIZES = {
  xs: "text-xs px-2.5 py-1.5 gap-1.5 rounded-md",
  sm: "text-sm px-3.5 py-2 gap-1.5 rounded-lg",
  md: "text-fluid-sm px-5 py-2.5 gap-2 rounded-xl",
  lg: "text-fluid-base px-6 py-3 gap-2 rounded-xl",
  xl: "text-fluid-lg px-8 py-4 gap-2.5 rounded-2xl",
  icon: "p-2.5 rounded-xl",
};

/**
 * Polymorphic button. Renders a <button> by default, a react-router <Link>
 * when `to` is passed, or an <a> when `href` is passed.
 */
const Button = forwardRef(function Button(
  {
    as,
    to,
    href,
    variant = "primary",
    size = "md",
    className,
    children,
    loading = false,
    disabled = false,
    icon: Icon,
    iconRight: IconRight,
    fullWidth = false,
    type = "button",
    ...props
  },
  ref
) {
  const Component = as || (to ? Link : href ? "a" : "button");
  const isDisabled = disabled || loading;

  const classes = cn(
    "inline-flex items-center justify-center font-semibold whitespace-nowrap",
    "transition-all duration-200 select-none",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500",
    "disabled:pointer-events-none disabled:opacity-60",
    variant !== "link" && "tap",
    VARIANTS[variant] ?? VARIANTS.primary,
    SIZES[size] ?? SIZES.md,
    fullWidth && "w-full",
    className
  );

  // Only real <button> elements understand `disabled`/`type`.
  const nativeProps =
    Component === "button"
      ? { type, disabled: isDisabled }
      : { "aria-disabled": isDisabled || undefined };

  return (
    <Component
      ref={ref}
      to={to}
      href={href}
      className={classes}
      {...nativeProps}
      {...props}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden="true" />
      ) : (
        Icon && <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
      )}
      {children}
      {IconRight && !loading && (
        <IconRight className="h-4 w-4 shrink-0" aria-hidden="true" />
      )}
    </Component>
  );
});

export default Button;
