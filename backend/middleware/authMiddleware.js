import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
    let token;

    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // decoded contains userId from generateToken.js
            // select and '-password' to return a string that minus password string even it's hashed
            req.user = await User.findById(decoded.userId).select('-password');

            next();

        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, invalid token')
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token')
    }
})

export { protect }