const jwt = require("jsonwebtoken");
const Blacklist = require("../models/BlacklistModel");
const verifyToken = async (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Access Denied" });

    const isBlacklisted = await Blacklist.findOne({ token });
    if (isBlacklisted) return res.status(401).json({ message: "Token is revoked (Alredy logged out)" });

    try {
        const decoded = jwt.verify(token , process.env.JWT_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token middleware" });
    }
};
module.exports = verifyToken;