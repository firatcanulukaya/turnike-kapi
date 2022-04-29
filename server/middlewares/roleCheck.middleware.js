const ErrorService = require("../services/error.service");
const {ADMIN} = require("../constants");

const roleCheck = (allowed = []) => {
    return (req, res, next) => {
        if (allowed.includes(req.user.roleId) || req.user.roleId === ADMIN) {
            next();
        } else {
            console.error(
                `${req.ip} | ${req.user.id} - tried to access ${req.originalUrl}`
            );
            return ErrorService(res, {
                statusCode: 403,
                message: "NOT_AUTHORIZED",
            });
        }
    };
};

module.exports = roleCheck;