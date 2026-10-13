import type { ReactNode } from "react";

interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  className?: string;
  children: ReactNode;
}

/** Brand section heading: spaced eyebrow with a short rule, then the H2. */
export function SectionHeading({ id, eyebrow, className = "", children }: SectionHeadingProps) {
  return (
    <>
      <p className="eyebrow" aria-hidden="true">
        {eyebrow}
      </p>
      <h2 id={id} className={`mt-6 ${className}`.trim()}>
        {children}
      </h2>
    </>
  );
}
