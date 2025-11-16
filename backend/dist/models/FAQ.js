import mongoose, { Schema } from 'mongoose';
const FAQSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String },
    defaultLanguage: { type: String, default: 'en' },
}, { timestamps: true });
export default mongoose.models.FAQ || mongoose.model('FAQ', FAQSchema);
