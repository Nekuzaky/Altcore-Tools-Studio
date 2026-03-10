import { useEffect } from "react";
import { applySeo, type SeoMeta } from "@/app/seo";

type SeoHeadProps = {
  meta: SeoMeta;
};

export const SeoHead = ({ meta }: SeoHeadProps) => {
  useEffect(() => {
    applySeo(meta);
  }, [meta]);

  return null;
};

