import * as Sentry from "@sentry/react";

const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;
const SENTRY_ENV = import.meta.env.VITE_SENTRY_ENV || import.meta.env.MODE || "development";

export const initSentry = () => {
  if (!SENTRY_DSN) return;

  Sentry.init({
    dsn: SENTRY_DSN,
    environment: SENTRY_ENV,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllInputs: true,
      }),
    ],
    tracesSampleRate: 0.2, // adjust to your needs
    replaysSessionSampleRate: 0.05,
    replaysOnErrorSampleRate: 1.0,
  });
};

export { Sentry };
