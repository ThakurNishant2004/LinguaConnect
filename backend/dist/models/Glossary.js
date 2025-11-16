import mongoose, { Schema } from 'mongoose';
const GlossarySchema = new Schema({
    sourceTerm: { type: String, required: true },
    targetTerm: { type: String, required: true },
    sourceLang: { type: String, required: true },
    targetLang: { type: String, required: true }
}, { timestamps: true });
export default mongoose.models.Glossary || mongoose.model('Glossary', GlossarySchema);
