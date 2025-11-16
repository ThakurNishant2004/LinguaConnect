import axios from 'axios';
export const queryLingoModel = async (text, conversationId) => {
    try {
        const url = process.env.CHATBOT_API_URL;
        const res = await axios.post(url, { question: text, conversationId });
        // expects { data: { reply: string } } or { reply }
        const data = res.data?.data ?? res.data;
        return { reply: data.reply ?? data };
    }
    catch (err) {
        console.error('Error calling chatbot API', err);
        return { reply: null };
    }
};
