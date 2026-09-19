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
    value,
  });
};

/**
 * Evento canónico Mercadeo: "Whatsapp Clic"
 * campaign = slug de marca (schneider, abb, …)
 */
export const trackWhatsAppClick = ({
  buttonName = "Whatsapp Clic",
  pagePath,
  brandSlug = "",
  brandName = "",
  source = "boton",
} = {}) => {
  if (typeof window === "undefined") return;

  const slug = String(brandSlug || "").trim().toLowerCase();
  const path =
    pagePath ||
    (typeof window !== "undefined" ? window.location.pathname : "/") ||
    "/";

  if (window.gtag) {
    try {
      window.gtag("event", "whatsapp_click", {
        button_name: buttonName,
        page_path: path,
        brand_slug: slug,
        brand_name: brandName || slug,
        source,
      });
    } catch {
      // Analytics must not block WhatsApp navigation.
    }
  }

  import("./eqTrack")
    .then(({ eqTrackClick }) => {
      const safeSlug = slug || "sin_marca";
      const id =
        source === "banner_marca"
          ? `whatsapp_banner_${safeSlug}`
          : `whatsapp_clic_${safeSlug}`;
      eqTrackClick({
        buttonId: id,
        label: "Whatsapp Clic",
        pagePath: path,
        campaign: safeSlug,
        href:
          typeof window !== "undefined" ? window.location.href : "",
      });
    })
    .catch(() => {});
};
