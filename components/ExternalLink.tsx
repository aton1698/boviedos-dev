import type { ReactNode } from "react";

interface ExternalLinkProps {
  href: string;
  newTabLabel: string;
  className?: string;
  children: ReactNode;
}

/** Opens in a new tab safely and announces it to assistive technology. */
export function ExternalLink({ href, newTabLabel, className, children }: ExternalLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="sr-only"> {newTabLabel}</span>
    </a>
  );
}
