const ApiError = require('../exeptions/api-error')
const tokenService = require('../service/tokenService')

module.exports = async function(req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader) return next(ApiError.UnauthorizedError());

        const userData = await tokenService.validateAccessToken(authorizationHeader);

        if(!userData) return next(ApiError.UnauthorizedError());
        req.user = userData;
        next();
    } catch(e) {
        return next(ApiError.UnauthorizedError());
    }
}
