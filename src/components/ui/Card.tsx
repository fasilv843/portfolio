import React from "react";

type CardProps = {
  as?: "div" | "article" | "li";
  children: React.ReactNode;
  className?: string;
};

/**
 * Replaces the `border-border bg-surface rounded-2xl border p-6|p-8` string that
 * was copy-pasted across the home page and the project detail page. Deliberately
 * restrained — rule 2 of the direction is rules over borders, so this is a
 * hairline and a surface, not a gradient edge.
 */
export default function Card({ as = "div", children, className }: CardProps) {
  const Tag = as;
  return (
    <Tag
      className={`border-border bg-surface rounded-lg border p-6 ${className ?? ""}`}
    >
      {children}
    </Tag>
  );
}
