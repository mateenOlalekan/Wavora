import { useId, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "../../lib/cn";

/**
 * Accordion list. Uncontrolled by default; pass `openIndex` + `onToggle` to
 * control it. Set `allowMultiple` to keep several panels open at once.
 */
export default function Accordion({
  items = [],
  defaultOpen = 0,
  allowMultiple = false,
  className,
  itemClassName,
}) {
  const baseId = useId();
  const [open, setOpen] = useState(() =>
    defaultOpen === null || defaultOpen === undefined ? [] : [defaultOpen]
  );

  const isOpen = (index) => open.includes(index);

  const toggle = (index) => {
    setOpen((prev) => {
      if (prev.includes(index)) return prev.filter((i) => i !== index);
      return allowMultiple ? [...prev, index] : [index];
    });
  };

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, index) => {
        const expanded = isOpen(index);
        const buttonId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;
        const Icon = item.icon;

        return (
          <div
            key={item.id ?? item.question ?? index}
            className={cn(
              "overflow-hidden rounded-2xl border bg-surface transition-all duration-300",
              expanded
                ? "border-brand-200 shadow-lg"
                : "border-line shadow-xs hover:border-line-strong",
              itemClassName
            )}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-surface-2 sm:p-5"
              >
                {Icon && (
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors",
                      expanded
                        ? "bg-brand-600 text-white"
                        : "bg-brand-50 text-brand-600"
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                )}

                <span className="min-w-0 flex-1">
                  <span className="block text-fluid-base font-semibold text-fg">
                    {item.question ?? item.title}
                  </span>
                  {item.meta && (
                    <span className="mt-0.5 block text-fluid-sm text-fg-subtle">
                      {item.meta}
                    </span>
                  )}
                </span>

                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300",
                    expanded
                      ? "rotate-180 border-brand-600 bg-brand-600 text-white"
                      : "border-line-strong text-fg-subtle"
                  )}
                  aria-hidden="true"
                >
                  {expanded ? (
                    <Minus className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </span>
              </button>
            </h3>

            {/* Grid-rows trick animates height without measuring the content. */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-all duration-300 ease-out",
                expanded
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <div
                  className={cn(
                    "border-t border-line px-4 py-4 text-fluid-sm leading-relaxed text-fg-muted sm:px-5",
                    Icon && "sm:pl-[4.75rem]"
                  )}
                >
                  {item.answer ?? item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
