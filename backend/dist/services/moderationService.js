const blacklisted = ['badword1', 'badword2'];
export const moderateText = (text) => {
    const lower = (text || '').toLowerCase();
    for (const w of blacklisted)
        if (lower.includes(w))
            return { flagged: true, reason: 'profanity' };
    return { flagged: false };
};
