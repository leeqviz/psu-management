"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

// Combine Next.js LinkProps with standard HTML Anchor props
type ConditionalLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    children: ReactNode;
    isDisabled?: boolean;
  };

export function ConditionalLink({
  children,
  href,
  onClick,
  target,
  isDisabled = false,
  ...props
}: ConditionalLinkProps) {
  const pathname = usePathname();

  // We check if it's an object and cast it to ensure TS knows 'pathname' exists
  const destination = typeof href === "object" ? href.pathname : href;

  // Clean comparison to ensure we don't crash on undefined/null
  const isActive = pathname === destination;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (isDisabled) {
      e.preventDefault();
      return;
    }

    // 1. Run any parent onClick handler first
    if (onClick) {
      onClick(e);
    }

    // 2. Check for special click behavior.
    // If the user wants to open a new tab, WE MUST LET THEM.
    // We check for:
    // - target="_blank"
    // - Modifier keys (Command, Control, Alt, Shift)
    if (
      target === "_blank" ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    ) {
      return;
    }

    // 3. Standard Navigation Logic:
    // If we are simply clicking (no new tab) AND we are on the current page...
    if (isActive) {
      e.preventDefault();
    }
  };

  return (
    <Link
      href={isDisabled ? "" : href}
      onClick={handleClick}
      target={target}
      aria-disabled={isDisabled}
      aria-current={isActive ? "page" : undefined}
      {...props}
    >
      {children}
    </Link>
  );
}
