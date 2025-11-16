// services/detectService.ts
import { franc } from "franc";
// Use require + typing for iso-639-3
const iso6393 = require("iso-639-3");
/**
 * Detect language of the given text
 * Returns ISO 639-1 code (e.g., 'en', 'fr', 'hi')
 */
export const detectLanguage = (text) => {
    const langCode = franc(text); // ISO 639-3 code
    if (langCode === "und")
        return "en";
    const iso = iso6393.find(l => l.iso6393 === langCode);
    return iso?.iso6391 || "en";
};
/**
 * Map ISO 639-1 code to NLLB-200 language code
 */
export const mapToNLLB = (isoCode) => {
    const mapping = {
        en: "eng_Latn",
        fr: "fra_Latn",
        hi: "hin_Deva",
        es: "spa_Latn",
        de: "deu_Latn",
        zh: "zho_Hans",
        ja: "jpn_Jpan",
        ar: "arb_Arab",
        ru: "rus_Cyrl",
        pt: "por_Latn",
    };
    return mapping[isoCode] || "eng_Latn";
};
