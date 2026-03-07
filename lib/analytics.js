export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID || "";

// Registrar pageview manual (útil si luego quieres trackear navegación SPA)
export const pageview = (url) => {
  if (!GA_TRACKING_ID) return;
  if (typeof window === "undefined") return;
  if (!window.gtag) return;

  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

// Eventos GA4
export const event = ({ action, category, label, value }) => {
  if (!GA_TRACKING_ID) return;
  if (typeof window === "undefined") return;
  if (!window.gtag) return;

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};