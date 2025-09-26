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
      return "bg-[var(--primary)] text-black hover:brightness-110";
    case "outline":
      return "border border-[var(--border)] text-foreground hover:bg-[var(--muted)]";
    case "ghost":
      return "text-foreground hover:bg-[color-mix(in_oklab,var(--background),white_4%)]";
    default:
      return "bg-[var(--primary)] text-black hover:brightness-110";
  }
}

function Content({ label, icon, iconPosition = "left" }: Pick<CommonProps, "label" | "icon" | "iconPosition">) {
  return (
    <span className="inline-flex items-center gap-2">
      {icon && iconPosition === "left" && icon}
      <span>{label}</span>
      {icon && iconPosition === "right" && icon}
    </span>
  );
}

export default function Button(props: Props) {
  const { label, icon, iconPosition = "left", color = "primary", className } = props;
  const base = `inline-flex items-center px-5 py-2.5 rounded-lg transition-all duration-300 transform hover:scale-[1.02] ${getStyles(color)} ${className ?? ""}`;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={base} {...("onClick" in props ? { onClick: props.onClick } : {})}>
        <Content label={label} icon={icon} iconPosition={iconPosition} />
      </Link>
    );
  }

  return (
    <button type={props.type ?? "button"} onClick={props.onClick} className={base}>
      <Content label={label} icon={icon} iconPosition={iconPosition} />
    </button>
  );
}


