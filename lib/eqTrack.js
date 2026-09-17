/**
 * Tracker propio Equielect → webEquielectBackend /marketing-events
 * Convive con Google Analytics; Mercadeo solo lee estos eventos.
 */

const SESSION_KEY = "eq_analytics_sid";

const PROD_API =
  "https://webequielect-backend-403be357d449.herokuapp.com/api";

function getApiBase() {
  const raw = String(
    process.env.NEXT_PUBLIC_BACKEND_SERVER_URL || ""
  )
    .trim()
    .replace(/\/$/, "");

  const isBrowser = typeof window !== "undefined";
  const host = isBrowser ? window.location.hostname : "";
  const onLocalHost =
    !isBrowser || host === "localhost" || host === "127.0.0.1";
  const pointsToLocal = /localhost|127\.0\.0\.1/.test(raw);

  // En equielect.com.co / Vercel: nunca enviar a localhost aunque el env esté mal.
  if (isBrowser && !onLocalHost && (!raw || pointsToLocal)) {
    return PROD_API;
  }

  if (raw) return raw;
  return onLocalHost ? "http://localhost:3900/api" : PROD_API;
}

function getSessionId() {
  if (typeof window === "undefined") return "";
  try {
    let sid = window.sessionStorage.getItem(SESSION_KEY);
    if (!sid) {
      sid =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `eq_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
      window.sessionStorage.setItem(SESSION_KEY, sid);
    }
    return sid;
  } catch {
    return "";
  }
}

function sendEvent(payload) {
  if (typeof window === "undefined") return;

  const body = JSON.stringify({
    ...payload,
    pagePath: payload.pagePath || window.location.pathname || "/",
    referrer: payload.referrer || document.referrer || "",
    sessionId: payload.sessionId || getSessionId(),
    userAgent: navigator.userAgent || "",
  });

  const url = `${getApiBase()}/marketing-events`;

  try {
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
      mode: "cors",
    }).catch(() => {});
  } catch {
    try {
      if (typeof navigator !== "undefined" && navigator.sendBeacon) {
        const blob = new Blob([body], { type: "application/json" });
        navigator.sendBeacon(url, blob);
      }
    } catch {
      /* never block UX */
    }
  }
}

export function eqPageview(pagePath) {
  sendEvent({
    type: "page_view",
    pagePath: pagePath || (typeof window !== "undefined" ? window.location.pathname : "/"),
  });
}

export function eqTrackClick({
  buttonId,
  label = "",
  href = "",
  campaign = "",
  pagePath,
} = {}) {
  if (!buttonId) return;
  sendEvent({
    type: "click",
    buttonId: String(buttonId),
    label: label || String(buttonId),
    href: href || "",
    campaign: campaign || "",
    pagePath,
  });
}

/** Alias compatible con analytics.js existente */
export function trackWhatsAppClickEq({
  buttonName = "WhatsApp",
  buttonId = "whatsapp",
  pagePath,
} = {}) {
  eqTrackClick({
    buttonId,
    label: buttonName,
    pagePath,
    href:
      typeof window !== "undefined" ? window.location.href : "",
  });
}

export const eqTrack = {
  pageview: eqPageview,
  event: (action, params = {}) => {
    if (action === "click" || params.buttonId) {
      eqTrackClick(params);
      return;
    }
    if (action === "page_view") {
      eqPageview(params.pagePath);
    }
  },
  click: eqTrackClick,
};

export default eqTrack;
