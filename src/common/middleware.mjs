import { isAxiosError } from "axios";
import { SerializedResponse } from "./serializedClass.mjs";


export async function authMiddleware(req, res, next) {
    const accessToken = req.headers['authorization'] || req.headers['Authorization'];
    if (!accessToken) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    req.accessToken = accessToken.replace('Bearer ', '');
    next();
}

export function errorHandler(err, req, res, next) {
    if (isAxiosError(err)) {
        if (err.response) {
            console.error('Error:', err.response.data);
            return res.status(err.response.status).json(err.response.data);
        }
        if (err.request) {
            console.error('Error:', err.request);
            return res.status(500).json({ error: 'No response received from server' });
        }
    }
    if (err instanceof SerializedResponse) {
        return res.status(err.statusCode).json(err.data || { error: err.message });
    }
    console.error(err.stack);
    return res.status(err.statusCode || err.status || 500).json({ error: err.message || 'Internal Server Error' });
}