import express from 'express';
import { generateReply } from '../services/chatbotService.js';
import { sendResponse } from '../utils/responseHandler.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();
router.use(authMiddleware);
router.post('/reply', async (req, res) => {
    try {
        const { question } = req.body;
        if (!question)
            return sendResponse(res, 400, 'question required');
        const reply = await generateReply(question);
        sendResponse(res, 200, 'OK', { reply });
    }
    catch (e) {
        sendResponse(res, 500, 'Reply failed', { error: e.message });
    }
});
export default router;
