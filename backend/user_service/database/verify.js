const { redisClient } = require("./init");

/**
 * Verify the given refresh token exists in the cache
 * @param {string} userId the id of the user
 * @param {string} refreshToken the refresh token
 * @returns {boolean} true if the refresh token exists in the cache false otherwise
 */
async function verifyRefreshToken(userId, refreshToken) {
    try {
        const reply = await redisClient.SISMEMBER(userId, refreshToken);

        return reply;

    } catch (err) {
        throw err;
    }
}

module.exports = {
    verifyRefreshToken,
}