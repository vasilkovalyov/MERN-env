const TokenModel = require('../models/token');
const ApiError = require('../exeptions/api-error');
const { ACCESS_TOKEN, REFRESH_TOKEN } = require('../config').JWT
const jwt = require('jsonwebtoken');

class TokenService {
    async generateTokens(payload) {
        const accessToken = await jwt.sign(payload, ACCESS_TOKEN.TOKEN, { expiresIn: ACCESS_TOKEN.EXPIRES_IN });
        const refreshToken = await jwt.sign(payload, REFRESH_TOKEN.TOKEN, { expiresIn: REFRESH_TOKEN.EXPIRES_IN });

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await TokenModel.findOne({ user: userId })

        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }

        const token = await TokenModel.create({ user: userId, refreshToken})
        return token
    }

    async removeToken(refreshToken) {
        const tokenData = await TokenModel.findOneAndRemove({refreshToken: refreshToken});
        return tokenData
    }

    async validateAccessToken(accessToken) {
        try {
            const userData = await jwt.verify(accessToken, ACCESS_TOKEN.TOKEN);
            return userData
        } catch(e) {
            return null
        }
    }

    async validateRefreshToken(refreshToken) {
        try {
            const userData = await jwt.verify(refreshToken, REFRESH_TOKEN.TOKEN);
            return userData
        } catch(e) {
            throw ApiError.UnauthorizedError()
        }
    }

    async findToken(refreshToken) {
        const tokenData = await TokenModel.findOne({ refreshToken })
        return tokenData
    }
}

module.exports = new TokenService()