export function trackEvent(
  name: string,
  payload?: Record<string, unknown>
): void {
  // TODO: Plug in your analytics provider here (e.g. Plausible, PostHog, etc.).
  // Example:
  //   window.plausible?.(name, { props: payload });
  // For now we just log to the console in development.
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.log("[analytics]", name, payload ?? {});
  }
}

