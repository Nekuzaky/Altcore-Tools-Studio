import { en } from "@/i18n/en";
import { fr } from "@/i18n/fr";

export const translations = { en, fr } as const;
export type TranslationKey = keyof typeof en;
