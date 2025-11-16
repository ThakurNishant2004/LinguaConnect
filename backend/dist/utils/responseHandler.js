export const sendResponse = (res, statusCode, message, data) => {
    res.status(statusCode).json({ success: statusCode < 400, message, data });
};
export const success = (message, data) => ({ status: 'success', message, data });
export const failure = (message, error) => ({ status: 'error', message, error: error?.message || error });
