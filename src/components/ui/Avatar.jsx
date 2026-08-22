import { cn } from "../../lib/cn";

/** Derives up to two initials from a display name. */
function initialsFrom(name = "") {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const SIZES = {
  xs: "h-7 w-7 text-2xs",
  sm: "h-9 w-9 text-xs",
  md: "h-11 w-11 text-fluid-sm",
  lg: "h-14 w-14 text-fluid-lg",
  xl: "h-20 w-20 text-fluid-2xl",
};

export default function Avatar({
  src,
  name = "",
  size = "md",
  className,
  status,
  ring = false,
  ...props
}) {
  const dimension = SIZES[size] ?? SIZES.md;

  return (
    <span className={cn("relative inline-flex shrink-0", className)} {...props}>
      {src ? (
        <img
          src={src}
          alt={name ? `${name}'s avatar` : "Avatar"}
          loading="lazy"
          className={cn(
            "rounded-full object-cover",
            dimension,
            ring && "ring-2 ring-surface"
          )}
        />
      ) : (
        <span
          aria-hidden={name ? undefined : "true"}
          title={name || undefined}
          className={cn(
            "flex items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 font-bold text-white",
            dimension,
            ring && "ring-2 ring-surface"
          )}
        >
          {initialsFrom(name)}
        </span>
      )}

      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full ring-2 ring-surface",
            size === "xs" || size === "sm" ? "h-2 w-2" : "h-3 w-3",
            status === "online" && "bg-success",
            status === "away" && "bg-warning",
            status === "offline" && "bg-fg-faint",
            status === "busy" && "bg-danger"
          )}
          aria-label={status}
        />
      )}
    </span>
  );
}

/** Overlapping row of avatars with an optional "+N" overflow chip. */
export function AvatarGroup({ people = [], max = 4, size = "sm", className }) {
  const shown = people.slice(0, max);
  const overflow = people.length - shown.length;

  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex -space-x-2.5">
        {shown.map((person, i) => (
          <Avatar
            key={person.id ?? person.name ?? i}
            src={person.avatar}
            name={person.name}
            size={size}
            ring
          />
        ))}
        {overflow > 0 && (
          <span
            className={cn(
              "flex items-center justify-center rounded-full bg-surface-3 font-semibold text-fg-muted ring-2 ring-surface",
              SIZES[size] ?? SIZES.sm
            )}
          >
            +{overflow}
          </span>
        )}
      </div>
    </div>
  );
}
