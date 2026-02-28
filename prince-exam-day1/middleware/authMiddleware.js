const jwt = require('jsonwebtoken');
const JWT_SECRET = 'mysecretkey123'; // hardcoded secret

module.exports = function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Access denied" });

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.admin = verified;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};