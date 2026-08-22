import { cn } from "../../lib/cn";

/** Full-bleed page section with consistent vertical rhythm. */
export default function Section({
  as: Tag = "section",
  id,
  className,
  containerClassName,
  children,
  size = "md",
  tone = "default",
  bleed = false,
  ...props
}) {
  const sizes = {
    sm: "section-y-sm",
    md: "section-y",
    lg: "section-y-lg",
    none: "",
  };

  const tones = {
    default: "bg-surface-2",
    surface: "bg-surface",
    tinted: "bg-brand-50/60",
    inverted: "bg-fg text-surface",
    none: "",
  };

  return (
    <Tag
      id={id}
      className={cn(
        "relative w-full",
        sizes[size] ?? sizes.md,
        tones[tone] ?? tones.default,
        className
      )}
      {...props}
    >
      {bleed ? (
        children
      ) : (
        <div className={cn("container-page relative z-10", containerClassName)}>
          {children}
        </div>
      )}
    </Tag>
  );
}

/** Small uppercase label above a section title. */
export function Eyebrow({ className, children, ...props }) {
  return (
    <span
      className={cn(
        "inline-block text-fluid-sm font-semibold uppercase tracking-[0.12em] text-brand-600",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

/**
 * Standard section heading block: eyebrow, title, description.
 * `align="center"` centres and constrains the text width.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  as: Tag = "h2",
  className,
  titleClassName,
  children,
}) {
  const alignment =
    align === "center"
      ? "text-center items-center mx-auto max-w-3xl"
      : "text-left items-start";

  return (
    <div className={cn("flex flex-col gap-3", alignment, className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {title && (
        <Tag
          className={cn(
            "text-fluid-4xl font-bold tracking-tight text-fg",
            titleClassName
          )}
        >
          {title}
        </Tag>
      )}
      {description && (
        <p
          className={cn(
            "text-fluid-lg leading-relaxed text-fg-muted",
            align === "center" ? "max-w-2xl" : "max-w-xl"
          )}
        >
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

/** Decorative blurred background blobs. Purely visual. */
export function SectionBlobs({ className }) {
  return (
    <div
      className={cn("absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <div className="blob -left-20 top-0 h-64 w-64 bg-brand-200/50 sm:h-80 sm:w-80" />
      <div className="blob -right-24 bottom-0 h-72 w-72 bg-accent-200/40 sm:h-96 sm:w-96" />
    </div>
  );
}
