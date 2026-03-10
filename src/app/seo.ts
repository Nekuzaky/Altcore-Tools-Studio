import { siteConfig } from "@/config/site";

export type SeoMeta = {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  keywords?: string[];
  noIndex?: boolean;
};

const upsertMeta = (selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
};

const upsertLink = (selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector<HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
};

export const applySeo = (meta: SeoMeta) => {
  const canonical = meta.canonicalPath
    ? new URL(meta.canonicalPath, siteConfig.domain).toString()
    : siteConfig.domain;
  const ogImage = new URL(meta.ogImage ?? "/og/default-tools.jpg", siteConfig.domain).toString();
  const robots = meta.noIndex
    ? "noindex,nofollow,noarchive"
    : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";

  document.title = meta.title;
  upsertMeta('meta[name="description"]', { name: "description", content: meta.description });
  upsertMeta('meta[name="robots"]', { name: "robots", content: robots });
  if (meta.keywords?.length) {
    upsertMeta('meta[name="keywords"]', { name: "keywords", content: meta.keywords.join(", ") });
  }
  upsertLink('link[rel="canonical"]', { rel: "canonical", href: canonical });

  upsertMeta('meta[property="og:title"]', { property: "og:title", content: meta.title });
  upsertMeta('meta[property="og:description"]', {
    property: "og:description",
    content: meta.description
  });
  upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
  upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: siteConfig.name });
  upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonical });
  upsertMeta('meta[property="og:image"]', { property: "og:image", content: ogImage });
  upsertMeta('meta[property="og:image:alt"]', {
    property: "og:image:alt",
    content: `${siteConfig.name} preview image`
  });
  upsertMeta('meta[property="og:locale"]', { property: "og:locale", content: "en_US" });
  upsertMeta('meta[property="og:locale:alternate"]', {
    property: "og:locale:alternate",
    content: "fr_FR"
  });

  upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
  upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: meta.title });
  upsertMeta('meta[name="twitter:description"]', {
    name: "twitter:description",
    content: meta.description
  });
  upsertMeta('meta[name="twitter:site"]', { name: "twitter:site", content: siteConfig.twitterHandle });
  upsertMeta('meta[name="twitter:creator"]', { name: "twitter:creator", content: siteConfig.twitterHandle });
  upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: ogImage });
  upsertMeta('meta[name="twitter:image:alt"]', {
    name: "twitter:image:alt",
    content: `${siteConfig.name} preview image`
  });
};

