import { profile } from "@/content";
import type { CvRequest } from "./cv-request";

/**
 * Emails the owner that someone downloaded the CV through Resend (https://resend.com, free tier). Without RESEND_API_KEY it only
 * logs, so local development works. Failure never blocks the download: it is logged and reported to the caller.
 */
export async function notifyCvRequest(request: CvRequest): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const lines = [
    ...(request.name ? [`Nombre: ${request.name}`] : []),
    `Empresa: ${request.company}`,
    `Correo: ${request.email}`,
    `Idioma del sitio: ${request.locale === "es" ? "español" : "inglés"}`,
    `Comentarios: ${request.comments || "(ninguno)"}`,
  ];
  if (!key) {
    console.warn("[cv] RESEND_API_KEY is not set; CV download not emailed:\n" + lines.join("\n"));
    return false;
  }
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || "boviedos.dev <onboarding@resend.dev>",
        to: [process.env.CV_NOTIFY_TO || profile.email],
        reply_to: request.email,
        // One line only: the visitor controls the company name.
        subject: `Alguien de ${request.company} descargó tu CV`.replace(/\s+/g, " "),
        text: lines.join("\n"),
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) console.error(`[cv] Resend answered ${response.status}`);
    return response.ok;
  } catch (error) {
    console.error("[cv] could not email the CV request", error);
    return false;
  }
}
