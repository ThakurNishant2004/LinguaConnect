// services/translationService.ts
import { pipeline } from "@xenova/transformers";
import { mapToNLLB } from "./detectService.js";
// Cache translators to avoid reloading
const translators = {
    "600M": null,
    "3.3B": null,
};
/**
 * Initialize NLLB translator for given model size
 */
export const initTranslator = async (model = "600M") => {
    if (!translators[model]) {
        const modelName = model === "3.3B"
            ? "facebook/nllb-200-3.3B"
            : "facebook/nllb-200-distilled-600M";
        translators[model] = await pipeline("translation", modelName);
        console.log(`✅ NLLB translator (${model}) initialized`);
    }
    return translators[model];
};
/**
 * Translate text from source to target language using NLLB
 */
export const translateText = async (text, srcIso, tgtIso, model = "600M") => {
    try {
        const translator = await initTranslator(model);
        const srcLang = mapToNLLB(srcIso);
        const tgtLang = mapToNLLB(tgtIso);
        const output = await translator(text, { src_lang: srcLang, tgt_lang: tgtLang });
        const translated = output[0]?.translation_text || text;
        return { translated, sourceLang: srcIso, targetLang: tgtIso };
    }
    catch (err) {
        console.error("Translation failed:", err);
        return { translated: text, sourceLang: srcIso, targetLang: tgtIso };
    }
};
