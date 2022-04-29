const jwt = require("jsonwebtoken");

const authCheck = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).json({
            message: "TOKEN_NOT_FOUND",
            statusCode: 403,
        });
    }
    try {
        const decoded = jwt.verify(token, "GENERATE_CODE", {
            algorithms: ["HS256"],
        });
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({ message: "INVALID_TOKEN", statusCode: 401 });
    }
    return next();
};

module.exports = authCheck;