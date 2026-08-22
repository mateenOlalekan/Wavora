import { forwardRef, useId, useState } from "react";
import { AlertCircle, Check, Eye, EyeOff } from "lucide-react";
import { cn } from "../../lib/cn";

const baseControl = cn(
  "w-full rounded-xl border bg-surface text-fg placeholder:text-fg-faint",
  "transition-colors duration-200 outline-none",
  "disabled:cursor-not-allowed disabled:bg-surface-3 disabled:text-fg-faint"
);

function controlState(invalid) {
  return invalid
    ? "border-danger focus:border-danger focus:ring-2 focus:ring-danger/25"
    : "border-line-strong focus:border-brand-500 focus:ring-2 focus:ring-brand-500/25";
}

/**
 * Label + control + help/error wrapper. Generates an id and wires up
 * aria-describedby / aria-invalid so screen readers announce errors.
 */
export function Field({
  label,
  htmlFor,
  error,
  hint,
  required = false,
  className,
  children,
}) {
  const generatedId = useId();
  const id = htmlFor || generatedId;
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label
          htmlFor={id}
          className="mb-1.5 block text-fluid-sm font-medium text-fg"
        >
          {label}
          {required && (
            <span className="ml-0.5 text-danger" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      {typeof children === "function"
        ? children({ id, describedBy, invalid: Boolean(error) })
        : children}

      {error ? (
        <p
          id={`${id}-error`}
          className="mt-1.5 flex items-start gap-1.5 text-fluid-sm text-danger"
        >
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-fluid-sm text-fg-subtle">
          {hint}
        </p>
      ) : null}

      {/* Referenced by children rendered via the render-prop form */}
      <span hidden>{describedBy}</span>
    </div>
  );
}

export const Input = forwardRef(function Input(
  { className, invalid = false, icon: Icon, size = "md", ...props },
  ref
) {
  const sizes = {
    sm: Icon ? "py-2 pl-9 pr-3 text-fluid-sm" : "px-3 py-2 text-fluid-sm",
    md: Icon ? "py-2.5 pl-10 pr-3.5" : "px-3.5 py-2.5",
    lg: Icon ? "py-3 pl-11 pr-4 text-fluid-lg" : "px-4 py-3 text-fluid-lg",
  };

  const control = (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        baseControl,
        controlState(invalid),
        sizes[size] ?? sizes.md,
        className
      )}
      {...props}
    />
  );

  if (!Icon) return control;

  return (
    <div className="relative">
      <Icon
        className={cn(
          "pointer-events-none absolute top-1/2 -translate-y-1/2 text-fg-faint",
          size === "sm" ? "left-3 h-4 w-4" : "left-3.5 h-[18px] w-[18px]"
        )}
        aria-hidden="true"
      />
      {control}
    </div>
  );
});

export const PasswordInput = forwardRef(function PasswordInput(
  { className, invalid = false, ...props },
  ref
) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        ref={ref}
        type={visible ? "text" : "password"}
        aria-invalid={invalid || undefined}
        className={cn(
          baseControl,
          controlState(invalid),
          "py-2.5 pl-3.5 pr-11",
          className
        )}
        {...props}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        className="absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-fg-subtle transition hover:bg-surface-3 hover:text-fg"
      >
        {visible ? (
          <EyeOff className="h-[18px] w-[18px]" />
        ) : (
          <Eye className="h-[18px] w-[18px]" />
        )}
      </button>
    </div>
  );
});

export const Textarea = forwardRef(function Textarea(
  { className, invalid = false, rows = 4, ...props },
  ref
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      aria-invalid={invalid || undefined}
      className={cn(
        baseControl,
        controlState(invalid),
        "resize-y px-3.5 py-2.5 leading-relaxed",
        className
      )}
      {...props}
    />
  );
});

export const Select = forwardRef(function Select(
  { className, invalid = false, children, ...props },
  ref
) {
  return (
    <div className="relative">
      <select
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(
          baseControl,
          controlState(invalid),
          "cursor-pointer appearance-none py-2.5 pl-3.5 pr-10",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <svg
        className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M6 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
});

export const Checkbox = forwardRef(function Checkbox(
  { label, description, className, id: idProp, ...props },
  ref
) {
  const generatedId = useId();
  const id = idProp || generatedId;

  return (
    <div className={cn("flex items-start gap-3", className)}>
      <span className="relative flex h-5 items-center">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          className="peer h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-md border border-line-strong bg-surface transition checked:border-brand-600 checked:bg-brand-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
          {...props}
        />
        <Check
          className="pointer-events-none absolute left-0.5 top-0.5 h-4 w-4 text-white opacity-0 transition-opacity peer-checked:opacity-100"
          strokeWidth={3}
          aria-hidden="true"
        />
      </span>

      {(label || description) && (
        <label htmlFor={id} className="cursor-pointer select-none">
          {label && (
            <span className="block text-fluid-sm font-medium text-fg">
              {label}
            </span>
          )}
          {description && (
            <span className="mt-0.5 block text-fluid-sm text-fg-subtle">
              {description}
            </span>
          )}
        </label>
      )}
    </div>
  );
});

/** Accessible on/off switch. Controlled via `checked` + `onChange`. */
export function Switch({ checked, onChange, label, disabled = false, id: idProp }) {
  const generatedId = useId();
  const id = idProp || generatedId;

  return (
    <div className="flex items-center gap-3">
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500",
          checked ? "bg-brand-600" : "bg-line-strong",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <span
          className={cn(
            "inline-block h-4.5 w-4.5 rounded-full bg-white shadow transition-transform duration-200",
            checked ? "translate-x-[1.4rem]" : "translate-x-1"
          )}
          style={{ height: "1.125rem", width: "1.125rem" }}
        />
      </button>
      {label && (
        <label
          htmlFor={id}
          className="cursor-pointer select-none text-fluid-sm font-medium text-fg"
        >
          {label}
        </label>
      )}
    </div>
  );
}

export default Input;
