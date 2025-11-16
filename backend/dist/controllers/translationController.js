import { sendResponse } from '../utils/responseHandler.js';
import { translateText } from '../services/translationService.js';
import { detectLanguage } from '../services/detectService.js';
export const translate = async (req, res) => {
    try {
        const { text, targetLang, sourceLang } = req.body;
        if (!text || !targetLang)
            return sendResponse(res, 400, 'text and targetLang required');
        const src = sourceLang || detectLanguage(text);
        const out = await translateText(text, src, targetLang);
        sendResponse(res, 200, 'OK', out);
    }
    catch (e) {
        sendResponse(res, 500, 'Translation failed', { error: e.message });
    }
};
export const detect = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text)
            return sendResponse(res, 400, 'text required');
        const lang = detectLanguage(text);
        sendResponse(res, 200, 'OK', { lang });
    }
    catch (e) {
        sendResponse(res, 500, 'Detect failed', { error: e.message });
    }
};
