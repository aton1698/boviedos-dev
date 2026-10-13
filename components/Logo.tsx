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
}

/** Decorative mark (alt=""): put the accessible name on the surrounding link or heading. */
export function Logo({ variant = "color", className }: LogoProps) {
  return <Image src={SOURCES[variant]} alt="" width={264} height={277} unoptimized className={className} />;
}
