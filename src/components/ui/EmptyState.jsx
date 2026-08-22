import { Inbox } from "lucide-react";
import { cn } from "../../lib/cn";
import Button from "./Button";

/** Placeholder shown when a list or search returns nothing. */
export default function EmptyState({
  icon: Icon = Inbox,
  title = "Nothing here yet",
  description,
  action,
  actionTo,
  onAction,
  className,
  children,
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-line-strong bg-surface px-6 py-14 text-center",
        className
      )}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-3">
        <Icon className="h-7 w-7 text-fg-faint" aria-hidden="true" />
      </div>

      <h3 className="text-fluid-lg font-bold text-fg">{title}</h3>

      {description && (
        <p className="mt-2 max-w-sm text-fluid-sm text-fg-muted">
          {description}
        </p>
      )}

      {action && (
        <Button
          className="mt-6"
          to={actionTo}
          onClick={onAction}
          size="sm"
          variant="primary"
        >
          {action}
        </Button>
      )}

      {children}
    </div>
  );
}
