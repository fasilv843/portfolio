import Link from "next/link";
import React from "react";

// No "use client": the optional onClick prop does not require it. A component
// without the directive still works inside a client component, and dropping it
// keeps ProjectCard — and therefore the whole project grid on /, /projects and
// every detail page — out of the client bundle.

type ButtonColor = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";
type IconPosition = "left" | "right";

type CommonProps = {
  label: string;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
  color?: ButtonColor;
  size?: ButtonSize;
  className?: string;
};

type AnchorProps = CommonProps & {
  href: string;
  onClick?: never;
  type?: never;
};

type ButtonProps = CommonProps & {
  href?: never;
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  type?: "button" | "submit" | "reset";
};

type Props = AnchorProps | ButtonProps;

function getStyles(color: ButtonColor = "primary") {
  switch (color) {
    case "outline":
      return "border border-border-interactive text-foreground hover:bg-surface-raised";
    case "ghost":
      return "text-foreground hover:bg-surface-raised";
    case "primary":
    default:
      return "bg-primary text-primary-contrast hover:bg-primary-strong";
  }
}

function getSizing(size: ButtonSize = "md") {
  switch (size) {
    case "sm":
      return "px-3.5 py-1.5 text-sm";
    case "lg":
      return "px-7 py-3.5 text-lg";
    case "md":
    default:
      return "px-5 py-2.5";
  }
}

/**
 * `next/link` is for in-app navigation only. Anything else — an external site, a
 * mailto, a same-page anchor — routes through a plain <a>, which is what forced
 * the hand-written anchors this component was meant to replace.
 */
function isInternal(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

function Content({
  label,
  icon,
  iconPosition = "left",
}: Pick<CommonProps, "label" | "icon" | "iconPosition">) {
  return (
    <span className="inline-flex items-center gap-2">
      {icon && iconPosition === "left" && icon}
      <span>{label}</span>
      {icon && iconPosition === "right" && icon}
    </span>
  );
}

export default function Button(props: Props) {
  const {
    label,
    icon,
    iconPosition = "left",
    color = "primary",
    size = "md",
    className,
  } = props;

  // Bare `transition`, never the all-properties variant: v4's default property
  // list already covers colour, opacity, shadow and transform, and does not
  // animate layout. (Naming that class here would be enough for Tailwind to
  // emit a rule for it — it scans comments too. See 2.8.)
  const base = `inline-flex items-center justify-center rounded-md transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${getStyles(color)} ${getSizing(size)} ${className ?? ""}`;

  if ("href" in props && props.href) {
    const { href } = props;

    if (isInternal(href)) {
      return (
        <Link href={href} className={base}>
          <Content label={label} icon={icon} iconPosition={iconPosition} />
        </Link>
      );
    }

    const isHttp = href.startsWith("http");
    return (
      <a
        href={href}
        className={base}
        {...(isHttp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <Content label={label} icon={icon} iconPosition={iconPosition} />
      </a>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      className={base}
    >
      <Content label={label} icon={icon} iconPosition={iconPosition} />
    </button>
  );
}
