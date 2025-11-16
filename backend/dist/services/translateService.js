// services/translationService.ts
import { pipeline } from "@xenova/transformers";
let translator = null;
/**
 * Initialize NLLB translator (one-time)
 */
export const initTranslator = async () => {
    if (!translator) {
        translator = await pipeline("translation", "facebook/nllb-200-distilled-600M" // or "facebook/nllb-200-3.3B" for larger model
        );
        console.log("✅ NLLB translator initialized");
    }
};
/**
 * Translate text from source to target language using NLLB
 */
export const translateText = async (text, srcNLLB, tgtNLLB) => {
    await initTranslator();
    try {
        const output = await translator(text, { src_lang: srcNLLB, tgt_lang: tgtNLLB });
        const translated = output[0]?.translation_text || text;
        return {
            translated,
            sourceLang: srcNLLB,
            targetLang: tgtNLLB,
        };
    }
    catch (err) {
        console.error("Translation failed:", err);
        return {
            translated: text,
            sourceLang: srcNLLB,
            targetLang: tgtNLLB,
        };
    }
};
