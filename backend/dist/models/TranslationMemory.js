import mongoose, { Schema } from 'mongoose';
const MemorySchema = new Schema({
    source: { type: String, required: true, index: true },
    translated: { type: String, required: true },
    sourceLang: { type: String, required: true },
    targetLang: { type: String, required: true },
    usageCount: { type: Number, default: 1 }
}, { timestamps: true });
export default mongoose.models.TranslationMemory || mongoose.model('TranslationMemory', MemorySchema);
