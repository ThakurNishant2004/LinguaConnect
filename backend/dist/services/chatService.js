import Conversation from '../models/Conversation.js';
import ChatMessage from '../models/ChatMessage.js';
import { translateText } from './translationService.js'; // NLLB service for chat
import { detectLanguage } from './detectService.js';
import { queryLingoModel } from './lingoModelService.js';
export class ChatService {
    async createChat(senderId, receiverId) {
        const conv = await Conversation.create({
            participants: [senderId, receiverId],
            meta: { unreadCounts: { [senderId]: 0, [receiverId]: 0 } }
        });
        return { conversationId: conv._id.toString(), participants: conv.participants };
    }
    async getChats(userId) {
        const convs = await Conversation.find({ participants: userId })
            .sort({ updatedAt: -1 })
            .lean();
        return convs.map((c) => ({
            ...c,
            unreadCount: (c.meta?.unreadCounts?.[userId] || 0)
        }));
    }
    async sendMessage(senderId, receiverId, conversationId, text, targetLangIso, model = "600M") {
        let conv = conversationId ? await Conversation.findById(conversationId) : null;
        if (!conv) {
            conv = await Conversation.create({
                participants: [senderId, receiverId],
                meta: { unreadCounts: { [senderId]: 0, [receiverId]: 0 } }
            });
            conversationId = conv._id.toString();
        }
        const convId = conversationId;
        const sourceLangIso = detectLanguage(text);
        let translatedText = text;
        if (receiverId === 'lingo-bot') {
            try {
                const botResp = await queryLingoModel(text, convId);
                translatedText = typeof botResp?.reply === 'string' ? botResp.reply : text;
                if (targetLangIso && targetLangIso !== 'en') {
                    const t = await translateText(translatedText, 'en', targetLangIso, model);
                    translatedText = t.translated || translatedText;
                }
            }
            catch (e) {
                console.error('Bot error', e);
                translatedText = text;
            }
        }
        else if (targetLangIso && targetLangIso !== sourceLangIso) {
            try {
                const t = await translateText(text, sourceLangIso, targetLangIso, model);
                translatedText = t.translated;
            }
            catch (e) {
                console.error('Translation error', e);
                translatedText = text;
            }
        }
        const msg = await ChatMessage.create({
            conversationId: convId,
            senderId,
            receiverId,
            text,
            translatedText,
            sourceLang: sourceLangIso,
            targetLang: targetLangIso || sourceLangIso,
            status: 'active'
        });
        // Update conversation meta
        try {
            conv.meta = conv.meta || {};
            conv.meta.unreadCounts = conv.meta.unreadCounts || {};
            conv.meta.unreadCounts[receiverId] = (conv.meta.unreadCounts[receiverId] || 0) + 1;
            conv.lastMessage = { text, translatedText, senderId, createdAt: new Date() };
            await conv.save();
        }
        catch (e) {
            console.warn('Failed conv meta update', e);
        }
        return msg;
    }
    async endConversation(conversationId) {
        await ChatMessage.updateMany({ conversationId }, { status: 'ended' });
        await Conversation.findByIdAndUpdate(conversationId, { 'meta.closedAt': new Date() });
    }
    async exportConversation(conversationId) {
        return ChatMessage.find({ conversationId }).sort({ createdAt: 1 }).lean();
    }
    async resetUnread(conversationId, userId) {
        const conv = await Conversation.findById(conversationId);
        if (!conv)
            throw new Error('Conversation not found');
        conv.meta = conv.meta || {};
        conv.meta.unreadCounts = conv.meta.unreadCounts || {};
        conv.meta.unreadCounts[userId] = 0;
        await conv.save();
        return conv;
    }
}
