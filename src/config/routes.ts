import { categories } from "@/config/categories";
import { toolsConfig } from "@/config/tools";

export const staticRoutes = ["/", "/all-tools", "/about"] as const;
export const categoryRoutes = categories.map((category) => `/category/${category.slug}`);
export const toolRoutes = toolsConfig.map((tool) => tool.route);

export const sitemapReadyRoutes = [...staticRoutes, ...categoryRoutes, ...toolRoutes];
