import mongoose, { Schema } from 'mongoose';
const ConversationSchema = new Schema({
    participants: { type: [String], required: true },
    meta: {
        type: Object,
        default: { unreadCounts: {} },
    },
    lastMessage: {
        text: { type: String },
        translatedText: { type: String },
        senderId: { type: String },
        createdAt: { type: Date },
    },
}, { timestamps: true });
export default mongoose.models.Conversation ||
    mongoose.model('Conversation', ConversationSchema);
