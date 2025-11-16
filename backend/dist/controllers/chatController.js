import { ChatService } from '../services/chatService.js';
import { sendResponse } from '../utils/responseHandler.js';
const svc = new ChatService();
export const createChat = async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;
        const out = await svc.createChat(senderId, receiverId);
        sendResponse(res, 200, 'OK', out);
    }
    catch (e) {
        sendResponse(res, 500, 'Create chat failed', { error: e.message });
    }
};
export const getChats = async (req, res) => {
    try {
        const userId = req.query.userId;
        const out = await svc.getChats(userId);
        sendResponse(res, 200, 'OK', out);
    }
    catch (e) {
        sendResponse(res, 500, 'Get chats failed', { error: e.message });
    }
};
export const sendMessage = async (req, res) => {
    try {
        const { senderId, receiverId, conversationId, text, targetLang } = req.body;
        const msg = await svc.sendMessage(senderId, receiverId, conversationId || null, text, targetLang);
        sendResponse(res, 200, 'Message sent', msg);
    }
    catch (e) {
        sendResponse(res, 500, 'Send failed', { error: e.message });
    }
};
export const endConversation = async (req, res) => {
    try {
        await svc.endConversation(req.params.conversationId);
        sendResponse(res, 200, 'Ended');
    }
    catch (e) {
        sendResponse(res, 500, 'End failed', { error: e.message });
    }
};
export const exportConversation = async (req, res) => {
    try {
        const msgs = await svc.exportConversation(req.params.conversationId);
        res.header('Content-Type', 'application/json');
        res.attachment(`conversation_${req.params.conversationId}.json`);
        res.send(msgs);
    }
    catch (e) {
        sendResponse(res, 500, 'Export failed', { error: e.message });
    }
};
