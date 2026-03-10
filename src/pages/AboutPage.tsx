import logo from "@/assets/logo.svg";
import { SeoHead } from "@/components/shared/SeoHead";
import { Card } from "@/components/ui/Card";

export const AboutPage = () => {
  return (
    <div className="space-y-6">
      <SeoHead
        meta={{
          title: "About | Altcore Tools Studio",
          description: "About Altcore Tools Studio and the platform vision.",
          canonicalPath: "/about"
        }}
      />

      <header className="rounded-xl border border-border bg-surface/60 p-6">
        <div className="inline-flex items-center gap-2">
          <img src={logo} alt="Altcore Tools Studio" className="h-7 w-7" />
          <h1 className="text-3xl font-semibold text-text">Altcore Tools Studio</h1>
        </div>
        <p className="mt-3 max-w-3xl text-muted">
          A premium multi-tool hub built for practical daily use. The platform focuses on speed, clean UX, and scalable architecture for developers, creators, gamers and Discord communities.
        </p>
      </header>

      <Card>
        <h2 className="text-lg font-semibold text-text">What we build</h2>
        <p className="mt-3 text-sm leading-7 text-text/90">
          High-utility tools with real workflows: formatting, generation, conversion, naming and content helpers. Most tools are local-first in your browser for fast response and better privacy.
        </p>
      </Card>
    </div>
  );
};
