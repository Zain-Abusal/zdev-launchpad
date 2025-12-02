import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { PostHogProvider } from "posthog-js/react";
import * as Sentry from "@sentry/react";

const options = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  defaults: "2025-11-30",
} as const;

const sentryDsn =
  import.meta.env.VITE_SENTRY_DSN ||
  "https://0cd70e769efe0c6f07bd8414c3d2027d@o4510423254761472.ingest.de.sentry.io/4510423259283536";

Sentry.init({
  dsn: sentryDsn,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
  ],
  enableLogs: true,
  tracesSampleRate: 0.5,
  tracePropagationTargets: ["localhost", /^https?:\/\/.+/],
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PostHogProvider apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY} options={options}>
      <App />
    </PostHogProvider>
  </StrictMode>
);
Sentry.logger.info('User triggered test log', { log_source: 'sentry_test' })

