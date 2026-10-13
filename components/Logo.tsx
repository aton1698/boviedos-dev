import Image from "next/image";

// Official logo files live in public/logo (see docs/brand.md).
const SOURCES = {
  color: "/logo/logo-bos-pulse-flow.svg",
  white: "/logo/logo-bos-pulse-flow-blanco.svg",
  mono: "/logo/logo-bos-pulse-flow-monocromatico.svg",
} as const;

interface LogoProps {
  variant?: keyof typeof SOURCES;
  className?: string;
  /** Above-the-fold use (header, hero): loads eagerly and is preloaded. */
  priority?: boolean;
}

/** Decorative mark (alt=""): put the accessible name on the surrounding link or heading. */
export function Logo({ variant = "color", className, priority = false }: LogoProps) {
  return <Image src={SOURCES[variant]} alt="" width={264} height={277} unoptimized priority={priority} className={className} />;
}
