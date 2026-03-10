import { promises as fs } from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const configDir = path.join(rootDir, "src", "config");
const publicDir = path.join(rootDir, "public");
const outputPath = path.join(publicDir, "sitemap.xml");

const readText = (filePath) => fs.readFile(filePath, "utf8");

const extractQuotedValues = (input) => {
  const values = [];
  const regex = /"([^"]+)"/g;
  let match = regex.exec(input);
  while (match) {
    values.push(match[1]);
    match = regex.exec(input);
  }
  return values;
};

const unique = (items) => [...new Set(items)];

const resolveSiteUrl = async () => {
  const envUrl = process.env.VITE_SITE_URL?.trim();
  if (envUrl) return envUrl.replace(/\/+$/, "");

  const siteConfigPath = path.join(configDir, "site.ts");
  const siteConfigContent = await readText(siteConfigPath);
  const domainMatch = siteConfigContent.match(/domain:\s*"([^"]+)"/);
  if (domainMatch?.[1]) return domainMatch[1].replace(/\/+$/, "");

  return "https://tools.altcore.fr";
};

const getStaticRoutes = async () => {
  const routesPath = path.join(configDir, "routes.ts");
  const routesContent = await readText(routesPath);
  const staticMatch = routesContent.match(/staticRoutes\s*=\s*\[([\s\S]*?)\]\s*as const/);
  if (!staticMatch) return ["/"];
  return extractQuotedValues(staticMatch[1]).filter((value) => value.startsWith("/"));
};

const getCategoryRoutes = async () => {
  const categoriesPath = path.join(configDir, "categories.ts");
  const categoriesContent = await readText(categoriesPath);
  const slugs = [];
  const slugRegex = /slug:\s*"([^"]+)"/g;
  let match = slugRegex.exec(categoriesContent);
  while (match) {
    slugs.push(match[1]);
    match = slugRegex.exec(categoriesContent);
  }
  return slugs.map((slug) => `/category/${slug}`);
};

const getToolRoutes = async () => {
  const toolsPath = path.join(configDir, "tools.ts");
  const toolsContent = await readText(toolsPath);
  const routes = [];
  const routeRegex = /route:\s*"([^"]+)"/g;
  let match = routeRegex.exec(toolsContent);
  while (match) {
    const route = match[1];
    if (route.startsWith("/")) routes.push(route);
    match = routeRegex.exec(toolsContent);
  }
  return routes;
};

const getPriority = (route) => {
  if (route === "/") return "1.0";
  if (route === "/all-tools") return "0.95";
  if (route.startsWith("/category/")) return "0.85";
  if (route.startsWith("/tools/")) return "0.8";
  return "0.7";
};

const getChangeFreq = (route) => {
  if (route === "/" || route === "/all-tools") return "daily";
  if (route.startsWith("/category/")) return "weekly";
  if (route.startsWith("/tools/")) return "weekly";
  return "monthly";
};

const buildSitemapXml = (siteUrl, routes) => {
  const lastmod = new Date().toISOString().split("T")[0];
  const urls = routes
    .map((route) => {
      const loc = `${siteUrl}${route === "/" ? "" : route}`;
      return [
        "  <url>",
        `    <loc>${loc}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${getChangeFreq(route)}</changefreq>`,
        `    <priority>${getPriority(route)}</priority>`,
        "  </url>"
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    "</urlset>",
    ""
  ].join("\n");
};

const run = async () => {
  const [siteUrl, staticRoutes, categoryRoutes, toolRoutes] = await Promise.all([
    resolveSiteUrl(),
    getStaticRoutes(),
    getCategoryRoutes(),
    getToolRoutes()
  ]);

  const routes = unique([...staticRoutes, ...categoryRoutes, ...toolRoutes]);
  const sitemap = buildSitemapXml(siteUrl, routes);

  await fs.mkdir(publicDir, { recursive: true });
  await fs.writeFile(outputPath, sitemap, "utf8");

  console.log(`Sitemap generated: ${outputPath}`);
  console.log(`Total URLs: ${routes.length}`);
};

run().catch((error) => {
  console.error("Failed to generate sitemap.xml");
  console.error(error);
  process.exit(1);
});
