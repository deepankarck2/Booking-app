const { initAuthDatabase, initMongoDatabase, redisClient } = require("./init");
const { registerUser } = require("./register");
const { findUserByEmail, getMoney } = require("./fetch");
const { deleteUserByEmail, deleteAllRefreshTokensFromCache, deleteRefreshTokenFromCache } = require("./delete");
const { addRefreshTokenToCache, addMoney } = require("./insert");
const { verifyRefreshToken } = require("./verify");

module.exports = {
    initAuthDatabase,
    redisClient,
    initMongoDatabase,
    registerUser,
    findUserByEmail,
    deleteUserByEmail,
    addRefreshTokenToCache,
    verifyRefreshToken,
    deleteRefreshTokenFromCache,
    deleteAllRefreshTokensFromCache,
    addMoney,
    getMoney,
}