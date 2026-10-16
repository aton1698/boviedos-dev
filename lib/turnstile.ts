import { isProduction } from "./site";

// Cloudflare's public test keys: the widget always passes. Used only outside production, so the form works
// locally and in previews without setting anything up.
const TEST_SITE_KEY = "1x00000000000000000000AA";
const TEST_SECRET_KEY = "1x0000000000000000000000000000000AA";

/** Site key for the widget, or undefined when production has none configured (the form then shows as unavailable). */
export function turnstileSiteKey(): string | undefined {
  return process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || (isProduction ? undefined : TEST_SITE_KEY);
}

function turnstileSecret(): string | undefined {
  return process.env.TURNSTILE_SECRET_KEY || (isProduction ? undefined : TEST_SECRET_KEY);
}

export type TurnstileResult = "ok" | "failed" | "unavailable";

/** Asks Cloudflare whether the token is a real, unused challenge solution. */
export async function verifyTurnstile(token: string, ip: string | null): Promise<TurnstileResult> {
  const secret = turnstileSecret();
  if (!secret) return "unavailable";
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      signal: AbortSignal.timeout(8000),
    });
    const result: { success?: boolean } = await response.json();
    return result.success === true ? "ok" : "failed";
  } catch {
    return "unavailable";
  }
}
