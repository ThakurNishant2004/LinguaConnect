import { ChatService } from '../services/chatService.js';
import { moderateText } from '../services/moderationService.js';
import { getDashboardStats } from '../services/adminService.js';
const svc = new ChatService();
export const setupChatSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('socket connected', socket.id);
        socket.on('authenticate', (userId) => {
            socket.userId = userId;
            socket.emit('authenticated', { userId });
        });
        socket.on('join_conversation', (conversationId) => socket.join(conversationId));
        socket.on('send_message', async (data) => {
            try {
                if (!socket.userId)
                    return socket.emit('error', 'Not auth');
                const { conversationId, receiverId, text, targetLang } = data;
                const mod = moderateText(text);
                if (mod.flagged)
                    return socket.emit('message_blocked', { reason: mod.reason });
                const msg = await svc.sendMessage(socket.userId, receiverId, conversationId || null, text, targetLang);
                io.to(msg.conversationId).emit('receive_message', msg);
                // emit dashboard update
                const stats = await getDashboardStats();
                io.emit('dashboard_update', stats);
            }
            catch (e) {
                socket.emit('error', e.message);
            }
        });
        socket.on('disconnect', () => console.log('socket disconnect', socket.id));
    });
};
