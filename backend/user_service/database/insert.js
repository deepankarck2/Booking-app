const { redisClient } = require("./init");
const { User } = require("./Schema/User");

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

async function addMoney(userId, amount) {
    try {
        const user = await User.findById(userId);
        if (user == null) throw new Error("Cannot find user");

        user.money += amount;

        await user.save();
    } catch (err) {
        throw err;
    }
}

module.exports = {
    addRefreshTokenToCache,
    addMoney,
}