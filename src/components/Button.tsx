"use client";

import Link from "next/link";
import React from "react";

type ButtonColor = "primary" | "outline" | "ghost";
type IconPosition = "left" | "right";

type CommonProps = {
  label: string;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
  color?: ButtonColor;
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
    case "primary":
      return "bg-primary text-primary-contrast hover:bg-primary-strong";
    case "outline":
      return "border border-border-interactive text-foreground hover:bg-surface-raised";
    case "ghost":
      return "text-foreground hover:bg-surface-raised";
    default:
      return "bg-primary text-primary-contrast hover:bg-primary-strong";
  }
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
    className,
  } = props;
  const base = `inline-flex items-center px-5 py-2.5 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${getStyles(color)} ${className ?? ""}`;

  if ("href" in props && props.href) {
    return (
      <Link
        href={props.href}
        className={base}
        {...("onClick" in props ? { onClick: props.onClick } : {})}
      >
        <Content label={label} icon={icon} iconPosition={iconPosition} />
      </Link>
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
