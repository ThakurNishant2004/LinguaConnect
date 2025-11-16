let tokenizer = null;
let model = null;
export const initChatbot = async () => {
    try {
        const { AutoTokenizer, AutoModelForSeq2SeqLM } = await import('@xenova/transformers');
        tokenizer = await AutoTokenizer.from_pretrained(process.env.CHATBOT_MODEL);
        model = await AutoModelForSeq2SeqLM.from_pretrained(process.env.CHATBOT_MODEL);
        console.log('✅ Chatbot model loaded');
    }
    catch (e) {
        console.warn('❌ Chatbot init failed', e);
    }
};
export const generateReply = async (question, maxLength = 512) => {
    if (!model || !tokenizer)
        await initChatbot();
    const inputIds = tokenizer.encode(question, { return_tensors: 'pt' });
    const output = await model.generate(inputIds, { max_length: maxLength });
    const reply = tokenizer.decode(output[0], { skip_special_tokens: true });
    return reply;
};
