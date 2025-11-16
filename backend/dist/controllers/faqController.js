import FAQ from "../models/FAQ.js";
import FAQTranslation from "../models/FAQTranslation.js";
import Language from "../models/Language.js";
import * as translationService from "../services/translationService.js";
import { detectLanguage, mapToNLLB } from "../services/detectService.js";
import { sendResponse } from "../utils/responseHandler.js";
/**
 * Upload a new FAQ and automatically translate into all enabled languages
 */
export const uploadFAQ = async (req, res) => {
    try {
        const { title, content, category, language } = req.body;
        if (!title || !content) {
            return sendResponse(res, 400, "Title and content are required");
        }
        // Detect default language if not provided
        const defaultLang = language || detectLanguage(content);
        // Create main FAQ entry
        const faq = await FAQ.create({
            title,
            content,
            category,
            defaultLanguage: defaultLang,
        });
        // Fetch all enabled languages
        const langs = await Language.find({ enabled: true });
        // Translate FAQ content in parallel
        await Promise.all(langs.map(async (l) => {
            try {
                // Skip translation if same as default
                if (l.code === defaultLang)
                    return;
                const translated = await translationService.translateText(content, mapToNLLB(defaultLang), mapToNLLB(l.code));
                await FAQTranslation.create({
                    faqId: faq._id,
                    language: l.code,
                    translatedText: translated.translated,
                });
            }
            catch (e) {
                console.error(`Translation failed for ${l.code}:`, e);
            }
        }));
        sendResponse(res, 200, "FAQ uploaded and translated", faq);
    }
    catch (error) {
        console.error(error);
        const message = error instanceof Error ? error.message : String(error);
        sendResponse(res, 500, "FAQ upload failed", message);
    }
};
/**
 * Fetch FAQ by ID, optionally returning translation if 'lang' query param is provided
 */
export const getFAQ = async (req, res) => {
    try {
        const id = req.query.id;
        const lang = req.query.lang;
        if (!id)
            return sendResponse(res, 400, "FAQ id is required");
        // Fetch translated version if language specified
        if (lang) {
            const translation = await FAQTranslation.findOne({ faqId: id, language: lang });
            if (translation)
                return sendResponse(res, 200, "FAQ fetched", translation);
        }
        // Fallback to main FAQ
        const faq = await FAQ.findById(id);
        if (!faq)
            return sendResponse(res, 404, "FAQ not found");
        sendResponse(res, 200, "FAQ fetched", faq);
    }
    catch (error) {
        console.error(error);
        const message = error instanceof Error ? error.message : String(error);
        sendResponse(res, 500, "Failed to fetch FAQ", message);
    }
};
