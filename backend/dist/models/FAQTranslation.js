import mongoose, { Schema } from 'mongoose';
const FAQTranslationSchema = new Schema({
    faqId: { type: Schema.Types.ObjectId, ref: 'FAQ', required: true },
    language: { type: String, required: true },
    translatedText: { type: String, required: true },
}, { timestamps: true });
export default mongoose.models.FAQTranslation || mongoose.model('FAQTranslation', FAQTranslationSchema);
