import { Link } from "react-router-dom";
import { SeoHead } from "@/components/shared/SeoHead";
import { Button } from "@/components/ui/Button";

export const NotFoundPage = () => (
  <div className="space-y-4 py-8">
    <SeoHead
      meta={{
        title: "Page not found | Altcore Tools Studio",
        description: "The page you requested was not found.",
        canonicalPath: "/404",
        noIndex: true
      }}
    />
    <h1 className="text-3xl font-semibold text-text">404</h1>
    <p className="text-muted">This page does not exist or was moved.</p>
    <Link to="/">
      <Button>Back to tools hub</Button>
    </Link>
  </div>
);
