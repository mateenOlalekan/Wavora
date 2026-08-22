import { cn } from "../../lib/cn";

/**
 * Horizontally scrollable filter/tab bar. Scrolls rather than wrapping on
 * narrow screens so the row never becomes two ragged lines.
 */
export default function Tabs({
  tabs = [],
  value,
  onChange,
  className,
  variant = "pill",
  ...props
}) {
  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className={cn(
        "no-scrollbar -mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-1",
        variant === "underline" && "gap-0 border-b border-line pb-0",
        className
      )}
      {...props}
    >
      {tabs.map((tab) => {
        const id = tab.id ?? tab;
        const label = tab.label ?? tab;
        const active = id === value;

        return (
          <button
            key={id}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange?.(id)}
            className={cn(
              "tap shrink-0 whitespace-nowrap font-semibold transition-all duration-200",
              variant === "pill" &&
                cn(
                  "rounded-full px-4 py-2 text-fluid-sm",
                  active
                    ? "bg-brand-600 text-white shadow-brand"
                    : "bg-surface text-fg-muted ring-1 ring-line hover:bg-surface-3 hover:text-fg"
                ),
              variant === "underline" &&
                cn(
                  "-mb-px border-b-2 px-4 py-3 text-fluid-sm",
                  active
                    ? "border-brand-600 text-brand-700"
                    : "border-transparent text-fg-subtle hover:border-line-strong hover:text-fg"
                )
            )}
          >
            {tab.icon && (
              <tab.icon className="mr-1.5 inline h-4 w-4 align-[-2px]" />
            )}
            {label}
            {typeof tab.count === "number" && (
              <span
                className={cn(
                  "ml-2 rounded-full px-1.5 py-0.5 text-2xs font-bold",
                  active ? "bg-white/20 text-white" : "bg-surface-3 text-fg-subtle"
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
