import mongoose, { Schema } from 'mongoose';
const LanguageSchema = new Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String },
    enabled: { type: Boolean, default: true }
}, { timestamps: true });
export default mongoose.models.Language || mongoose.model('Language', LanguageSchema);
