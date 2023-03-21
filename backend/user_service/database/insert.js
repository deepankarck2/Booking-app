const { redisClient } = require("./init");

/**
 * Add a new refresh token to the cache
 * @param {string} userId the id of the user
 * @param {string} refreshToken the refresh token
 * @returns true if the refresh token has been successfully added to the cache false otherwise
 */
async function addRefreshTokenToCache(userId, refreshToken) {
    try {
        const reply = await redisClient.SADD(userId, refreshToken);
        return reply === 1;

    } catch (err) {
        throw err;
    }
}

module.exports = {
    addRefreshTokenToCache,
}