import { readFile } from "node:fs/promises";
import path from "node:path";
import { after } from "next/server";
import { parseCvRequest } from "@/lib/cv-request";
import { notifyCvRequest } from "@/lib/notify";
import { verifyTurnstile } from "@/lib/turnstile";

const FILE_NAME = "Brandon Oviedo FS.pdf";

/**
 * Hands out the CV only after the form is valid and Cloudflare Turnstile confirms a human. The PDF lives in
 * /private (not /public), so there is no direct URL to it. The email to the owner is sent when the CV is handed out.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid" }, { status: 400 });
  }
  const data = parseCvRequest(body);
  if (!data) return Response.json({ error: "invalid" }, { status: 400 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  const human = await verifyTurnstile(data.token, ip);
  if (human === "unavailable") return Response.json({ error: "unavailable" }, { status: 503 });
  if (human === "failed") return Response.json({ error: "human" }, { status: 403 });

  const pdf = await readFile(/*turbopackIgnore: true*/ path.join(/*turbopackIgnore: true*/ process.cwd(), "private", "cv", FILE_NAME));
  // The notification goes out only now that the CV is ready to download, and after the response so it never delays it.
  after(() => notifyCvRequest(data));
  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${FILE_NAME}"`,
      "Cache-Control": "no-store",
    },
  });
}
