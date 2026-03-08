const Token = require("../models/token");
const crypto = require("crypto");
const { AppError, ErrorType } = require("../utility/appError");

class TokenCRUD {
    #tokenType = ["email_verify", "password_reset", "email_change", "invite"];
    #tokenExpireMinute = {
        email_verify: 24 * 60, //1 day
        password_reset: 15, //15 min
        email_change: 60, //1 hour
        invite: 7 * 24 * 60, //7 days
    };

    async createToken(userId, type, newEmail = "") {
        if (!this.#tokenType.includes(type))
            throw new AppError(
                "invalid token type",
                ErrorType.INTERNAL_ERROR,
                "Token CRUD - createToken",
            );
        const tokenBody = crypto.randomBytes(32).toString("hex");
        const expiresAt = new Date(
            Date.now() + this.#tokenExpireMinute[type] * 60 * 1000,
        );
        await Token.create({
            userId,
            type,
            token: tokenBody,
            expiresAt,
            ...(newEmail && { newEmail }),
        });
        return tokenBody;
    }

    async verifyToken(tokenBody) {
        const token = await Token.findOne({ token: tokenBody });
        if (!token || token.expiresAt < new Date()) {
            if (token) await token.deleteOne();
            throw new AppError(
                "Invalid or Expired Token",
                ErrorType.INVALID_TOKEN,
                "Token CRUD - verifyToken"
            );
        }
        const result = {
            userId: token.userId,
            type: token.type,
            email: token.newEmail ?? undefined,
        };
        await token.deleteOne();
        return result;
    }

    //call this only when user requre new token
    async deleteToken(userId, type) {
        await Token.deleteOne({ userId, type });
    }
}

module.exports = new TokenCRUD();
