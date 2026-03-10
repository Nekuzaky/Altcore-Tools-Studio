import { RouterProvider } from "react-router-dom";
import { I18nProvider } from "@/app/i18n";
import { router } from "@/app/router";
import { ThemeProvider } from "@/app/theme";

export const AppProviders = () => (
  <ThemeProvider>
    <I18nProvider>
      <RouterProvider router={router} />
    </I18nProvider>
  </ThemeProvider>
);

