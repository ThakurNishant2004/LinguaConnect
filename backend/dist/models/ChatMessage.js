import mongoose, { Schema } from 'mongoose';
const ChatMessageSchema = new Schema({
    conversationId: { type: String, required: true },
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    text: { type: String, required: true },
    translatedText: { type: String },
    sourceLang: { type: String, default: 'auto' },
    targetLang: { type: String, default: 'en' },
    status: { type: String, enum: ['active', 'ended'], default: 'active' },
}, { timestamps: true });
export default mongoose.models.ChatMessage ||
    mongoose.model('ChatMessage', ChatMessageSchema);
