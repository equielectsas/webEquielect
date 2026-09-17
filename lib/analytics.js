export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID || "";

export const pageview = (url) => {
  if (!GA_TRACKING_ID) return;
  if (typeof window === "undefined") return;
  if (!window.gtag) return;

  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

export const event = ({ action, category, label, value }) => {
  if (!GA_TRACKING_ID) return;
  if (typeof window === "undefined") return;
  if (!window.gtag) return;

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    event_label: label,
    value,
  });
};

export const trackWhatsAppClick = ({ buttonName = "WhatsApp", pagePath } = {}) => {
  if (typeof window === "undefined") return;

  if (window.gtag) {
    try {
      window.gtag("event", "whatsapp_click", {
        button_name: buttonName,
        page_path: pagePath || window.location.pathname,
      });
    } catch {
      // Analytics must not block WhatsApp navigation.
    }
  }

  // Nuestro Analytics (Mercadeo) — independiente de GA
  import("./eqTrack")
    .then(({ eqTrackClick }) => {
      eqTrackClick({
        buttonId: "marca_whatsapp",
        label: buttonName,
        pagePath: pagePath || window.location.pathname,
      });
    })
    .catch(() => {});
};