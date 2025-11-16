import { sessions } from "@clerk/clerk-sdk-node";
export const verifyClerkToken = async (sessionId, token) => {
    try {
        const session = await sessions.verifySession(sessionId, token);
        if (!session)
            return null;
        return { id: session.userId };
    }
    catch (err) {
        console.error("Clerk session verification failed:", err);
        return null;
    }
};
