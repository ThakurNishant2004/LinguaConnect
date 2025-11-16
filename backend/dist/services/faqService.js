import FAQ from '../models/FAQ.js';
import FAQTranslation from '../models/FAQTranslation.js';
import Language from '../models/Language.js';
import { translateText } from './translationService.js';
import { sendResponse } from '../utils/responseHandler.js';
export const uploadFAQ = async (req, res) => {
    try {
        const { title, content, category, language } = req.body;
        const defaultLang = language || 'en';
        const faq = await FAQ.create({ title, content, category, defaultLanguage: defaultLang });
        const langs = await Language.find({ enabled: true });
        // Translate FAQ to all enabled languages
        await Promise.all(langs.map(async (l) => {
            const t = await translateText(content, defaultLang, l.code);
            await FAQTranslation.create({
                faqId: faq._id,
                language: l.code,
                translatedText: t.translated
            });
        }));
        sendResponse(res, 200, 'FAQ uploaded and translated', faq);
    }
    catch (err) {
        sendResponse(res, 500, 'FAQ upload failed', err.message);
    }
};
export const getFAQ = async (req, res) => {
    try {
        const id = req.query.id;
        const lang = req.query.lang;
        if (!id)
            return sendResponse(res, 400, 'FAQ id required');
        if (lang) {
            const tr = await FAQTranslation.findOne({ faqId: id, language: lang });
            if (tr)
                return sendResponse(res, 200, 'FAQ fetched', tr);
        }
        const faq = await FAQ.findById(id);
        sendResponse(res, 200, 'FAQ fetched', faq);
    }
    catch (err) {
        sendResponse(res, 500, 'Fetch failed', err.message);
    }
};
