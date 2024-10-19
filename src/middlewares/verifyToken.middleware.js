import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Token } from '../../DB/models/token.model.js';
dotenv.config();

export const tokenVerification = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
        }

        const validToken = await Token.findOne({ token: authHeader });
        console.log(validToken)
        if (!validToken || !validToken.isValid) {
            return res.status(403).json({ success: false, message: 'Token is invalid or revoked.' });
        }

        const decoded = jwt.verify(authHeader, process.env.TOKEN_SECRET);
        req.user = decoded;

        next();
    } catch (err) {
        return res.status(403).json({ success: false, message: 'Invalid or expired token.' });
    }
};
