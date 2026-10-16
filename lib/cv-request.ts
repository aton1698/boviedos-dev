/** Data the CV form sends, and the rules both the form and the API apply to it. */
export interface CvRequest {
  /** Optional: may be empty. */
  name: string;
  company: string;
  email: string;
  comments: string;
  locale: "en" | "es";
  /** Cloudflare Turnstile response token. */
  token: string;
}

export const LIMITS = { name: 120, company: 120, email: 254, comments: 1000 } as const;

// Deliberately simple: anything with one "@" and a dot in the domain. The address is only used to reply.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidName = (value: string) => value.length <= LIMITS.name;
export const isValidCompany = (value: string) => value.trim().length >= 2 && value.trim().length <= LIMITS.company;
export const isValidEmail = (value: string) => value.length <= LIMITS.email && EMAIL.test(value.trim());
export const isValidComments = (value: string) => value.length <= LIMITS.comments;

/** Narrows an unknown JSON body to a CvRequest, or returns null when any field is missing or invalid. */
export function parseCvRequest(body: unknown): CvRequest | null {
  if (typeof body !== "object" || body === null) return null;
  const { name = "", company, email, comments, locale, token } = body as Record<string, unknown>;
  if (typeof name !== "string" || !isValidName(name)) return null;
  if (typeof company !== "string" || !isValidCompany(company)) return null;
  if (typeof email !== "string" || !isValidEmail(email)) return null;
  if (typeof comments !== "string" || !isValidComments(comments)) return null;
  if (locale !== "en" && locale !== "es") return null;
  if (typeof token !== "string" || token.length === 0 || token.length > 4096) return null;
  return { name: name.trim(), company: company.trim(), email: email.trim(), comments: comments.trim(), locale, token };
}
