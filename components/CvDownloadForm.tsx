"use client";

import { useState, type KeyboardEvent } from "react";
import Link from "next/link";
import {
  LIMITS,
  isValidComments,
  isValidName,
  isValidCompany,
  isValidEmail,
  type CvRequest,
} from "@/lib/cv-request";
import type { UiStrings } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { useResolvedTheme } from "@/lib/use-theme";
import Stepper, { Step } from "./motion/Stepper";
import { TurnstileWidget } from "./TurnstileWidget";

type Status = "idle" | "sending" | "done";
type ErrorKey = keyof UiStrings["cvForm"]["errors"];

const fieldClass =
  "mt-2 w-full rounded-xl border border-[var(--color-control-border)] bg-[var(--nav-surface)] px-4 py-3 text-base text-text placeholder:text-text-muted";

/**
 * CV download in four steps: company, email, comments and a human check. The PDF is only handed out by /api/cv
 * once Cloudflare Turnstile confirms the visitor is human, so the last button stays off until the check passes.
 */
export function CvDownloadForm({
  t,
  locale,
  siteKey,
  privacyHref,
}: {
  t: UiStrings["cvForm"];
  locale: Locale;
  /** Turnstile site key; undefined means the form is not available (production without keys). */
  siteKey: string | undefined;
  privacyHref: string;
}) {
  const theme = useResolvedTheme();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [comments, setComments] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [widgetKey, setWidgetKey] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<ErrorKey | null>(null);
  const [touched, setTouched] = useState({ company: false, email: false });

  if (!siteKey) {
    return <p className="rounded-2xl border border-divider bg-surface p-6 text-text-muted">{t.errors.unavailable}</p>;
  }

  const sending = status === "sending";
  const detailsValid = isValidName(name) && isValidCompany(company) && isValidEmail(email) && isValidComments(comments);
  const valid = [detailsValid, token !== null];

  const submit = async () => {
    if (!token || sending) return;
    setStatus("sending");
    setError(null);
    const body: CvRequest = { name, company, email, comments, locale, token };
    try {
      const response = await fetch("/api/cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const key: ErrorKey = response.status === 403 ? "human" : response.status === 503 ? "unavailable" : "generic";
        throw new Error(key);
      }
      const url = URL.createObjectURL(await response.blob());
      const link = document.createElement("a");
      link.href = url;
      link.download = "Brandon Oviedo FS.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 10_000);
      setStatus("done");
      setStep(3);
    } catch (failure) {
      const key = failure instanceof Error && failure.message in t.errors ? (failure.message as ErrorKey) : "generic";
      setError(key);
      setStatus("idle");
      // A Turnstile token works once: ask for a fresh check.
      setToken(null);
      setWidgetKey(value => value + 1);
    }
  };

  const advance = (event: KeyboardEvent) => {
    if (event.key !== "Enter" || event.shiftKey || (event.target as HTMLElement).tagName === "TEXTAREA") return;
    event.preventDefault();
    if (step === 1) {
      if (detailsValid) setStep(2);
      else setTouched({ company: true, email: true });
    } else if (valid[1]) void submit();
  };

  return (
    <div onKeyDown={advance}>
      <Stepper
        step={step}
        linear
        stepLabel={t.stepLabel}
        onStepChange={setStep}
        onFinalStepCompleted={() => void submit()}
        backButtonText={t.back}
        nextButtonText={t.next}
        completeButtonText={sending ? t.sending : t.download}
        backButtonProps={{ disabled: sending }}
        nextButtonProps={{
          disabled: !valid[Math.min(step, 2) - 1] || sending,
          // The download button does not exist until the human check has passed.
          hidden: step === 2 && token === null,
          // The last step submits instead of moving on.
          onClick: event => {
            if (step === 2) {
              event.preventDefault();
              void submit();
            }
          },
        }}
        completedContent={
          <div role="status" className="py-4">
            <p className="text-xl font-semibold">{t.success.title}</p>
            <p className="mt-2 text-text-muted">{t.success.body}</p>
          </div>
        }
        width="100%"
      >
        <Step title={t.steps.contact}>
          <label htmlFor="cv-name" className="block text-base font-semibold">
            {t.name.label}
          </label>
          <input
            id="cv-name"
            type="text"
            autoComplete="name"
            maxLength={LIMITS.name}
            value={name}
            placeholder={t.name.placeholder}
            className={`${fieldClass} mb-4`}
            onChange={event => setName(event.target.value)}
          />
          <label htmlFor="cv-company" className="block text-base font-semibold">
            {t.company.label}
          </label>
          <input
            id="cv-company"
            type="text"
            autoComplete="organization"
            maxLength={LIMITS.company}
            value={company}
            placeholder={t.company.placeholder}
            aria-invalid={touched.company && !isValidCompany(company)}
            aria-describedby="cv-company-error"
            className={fieldClass}
            onChange={event => setCompany(event.target.value)}
            onBlur={() => setTouched(state => ({ ...state, company: true }))}
          />
          <p id="cv-company-error" role="alert" className="mt-2 min-h-6 text-sm text-accent">
            {touched.company && !isValidCompany(company) ? t.company.error : ""}
          </p>
          <label htmlFor="cv-email" className="block text-base font-semibold">
            {t.email.label}
          </label>
          <input
            id="cv-email"
            type="email"
            autoComplete="email"
            inputMode="email"
            maxLength={LIMITS.email}
            value={email}
            placeholder={t.email.placeholder}
            aria-invalid={touched.email && !isValidEmail(email)}
            aria-describedby="cv-email-error"
            className={fieldClass}
            onChange={event => setEmail(event.target.value)}
            onBlur={() => setTouched(state => ({ ...state, email: true }))}
          />
          <p id="cv-email-error" role="alert" className="mt-2 min-h-6 text-sm text-accent">
            {touched.email && !isValidEmail(email) ? t.email.error : ""}
          </p>
          <label htmlFor="cv-comments" className="block text-base font-semibold">
            {t.comments.label}
          </label>
          <textarea
            id="cv-comments"
            rows={4}
            maxLength={LIMITS.comments}
            value={comments}
            placeholder={t.comments.placeholder}
            className={`${fieldClass} resize-y`}
            onChange={event => setComments(event.target.value)}
          />
          <p className="mt-2 text-sm text-text-muted">
            {LIMITS.comments - comments.length} {t.comments.counter}
          </p>
        </Step>
        <Step title={t.steps.verify}>
          <p className="text-center text-base font-semibold">{t.verify.label}</p>
          <p className="mt-1 text-center text-sm text-text-muted">{t.verify.hint}</p>
          <div className="mt-4 flex justify-center">
            <TurnstileWidget
              key={widgetKey}
              siteKey={siteKey}
              language={locale}
              theme={theme}
              onToken={setToken}
            />
          </div>
          <p role="alert" className="mt-2 min-h-6 text-center text-sm text-accent">
            {error ? t.errors[error] : ""}
          </p>
        </Step>
      </Stepper>
      <p className="mt-4 text-sm text-text-muted">
        {t.privacy}{" "}
        <Link href={privacyHref} className="underline decoration-accent underline-offset-4 hover:text-text">
          {locale === "es" ? "Aviso de privacidad" : "Privacy notice"}
        </Link>
      </p>
    </div>
  );
}
