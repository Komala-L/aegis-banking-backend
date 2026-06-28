const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized access, token is missing", status: "failed" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized access, user not found", status: "failed" });
        }
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized access, invalid token", status: "failed" });
    }
}

module.exports = { authMiddleware };