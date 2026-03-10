type AnalyticsEvent = {
  name: string;
  payload?: Record<string, string | number | boolean>;
};

type GtagWindow = Window &
  typeof globalThis & {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };

const getAnalyticsId = () => (import.meta.env.VITE_ANALYTICS_ID as string | undefined)?.trim();

const asWindow = () => window as GtagWindow;

export const initAnalytics = (): void => {
  const id = getAnalyticsId();
  if (!id || typeof window === "undefined") return;

  const w = asWindow();
  const scriptId = "altcore-ga4-script";
  if (!document.getElementById(scriptId)) {
    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    document.head.appendChild(script);
  }

  if (!w.dataLayer) {
    w.dataLayer = [];
  }
  if (!w.gtag) {
    w.gtag = function gtag(...args: unknown[]) {
      w.dataLayer?.push(args);
    };
    w.gtag("js", new Date());
    w.gtag("config", id, { send_page_view: false });
  }
};

export const trackPageView = (path: string): void => {
  const id = getAnalyticsId();
  const w = asWindow();
  if (!id || !w.gtag) {
    if (import.meta.env.DEV) console.debug("[analytics] page_view", path);
    return;
  }

  w.gtag("event", "page_view", {
    page_title: document.title,
    page_location: window.location.href,
    page_path: path
  });
};

export const trackEvent = ({ name, payload = {} }: AnalyticsEvent): void => {
  const id = getAnalyticsId();
  const w = asWindow();
  if (!id || !w.gtag) {
    if (import.meta.env.DEV) console.debug("[analytics]", name, payload);
    return;
  }
  w.gtag("event", name, payload);
};

