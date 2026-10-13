import Image from "next/image";

// Official logo files live in public/logo (see docs/brand.md).
const SOURCES = {
  gradient: "/logo/BOS-tech-gradient.svg",
  white: "/logo/BOS-tech-white.svg",
  dark: "/logo/BOS-tech-dark.svg",
  icon: "/logo/BOS-tech-icon.svg",
} as const;

interface LogoProps {
  variant?: keyof typeof SOURCES;
  className?: string;
  /** Above-the-fold use (header, hero): loads eagerly with high fetch priority (Next 16: `priority` is deprecated). */
  priority?: boolean;
}

/** Decorative mark (alt=""): put the accessible name on the surrounding link or heading. */
export function Logo({ variant = "gradient", className, priority = false }: LogoProps) {
  return (
    <Image
      src={SOURCES[variant]}
      alt=""
      width={512}
      height={512}
      unoptimized
      loading={priority ? "eager" : undefined}
      fetchPriority={priority ? "high" : undefined}
      className={className}
    />
  );
}
