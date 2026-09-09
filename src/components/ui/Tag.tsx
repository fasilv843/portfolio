import React from "react";

type TagProps = {
  children: React.ReactNode;
  size?: "sm" | "md";
};

/**
 * The chip markup was written out four separate times on the home page and
 * again in ProjectCard, each with slightly different padding. One component,
 * two sizes.
 */
export default function Tag({ children, size = "sm" }: TagProps) {
  const sizing = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm";
  return (
    <span
      className={`text-foreground-muted border-border bg-surface-raised inline-flex items-center rounded border font-mono ${sizing}`}
    >
      {children}
    </span>
  );
}
