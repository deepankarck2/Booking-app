const jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("../database");

/**
 * Controller for authenticating users with access and refresh tokens 
 * @returns 200 - OK
 * @returns 400 - no access or refresh tokens
 * @returns 401 - access token error or a refresh token dne in cache
 * @returns 403 - refresh token has expired
 * @returns 500 - redis error
 */
async function authController(req, res) {
    const accessToken = req.body.accessToken;
    const refreshToken = req.body.refreshToken;

    if (!accessToken || !refreshToken) return res.status(400).send();

    // decode the access token
    jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET, (err, decodedAccessToken) => {
        // access token is still valid
        if (!err) return res.json({});

        // access token is invalid
        if (!err.message.includes("expire")) return res.status(401).send();

        // check for refresh token 
        jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET, async (err, decodedRefreshToken) => {
            // refresh token is still valid
            if (!err) {
                // check the refresh token is in cache
                try {
                    // token not in cache
                    const result = await db.verifyRefreshToken(decodedRefreshToken.id, refreshToken);
                    console.log(result);
                    if (!result) return res.status(403).send();

                } catch (err) {
                    console.error(err);
                    return res.status(500).send();
                }

                const expiredAccessToken = jwt.decode(accessToken);

                // access and refresh payload must be the same 
                if (expiredAccessToken.id !== decodedRefreshToken.id ||
                    expiredAccessToken.email !== decodedRefreshToken.email ||
                    expiredAccessToken.username !== decodedRefreshToken.username) return res.status(401).send();

                // generate a new access token
                const newPayload = {
                    id: decodedRefreshToken.id,
                    username: decodedRefreshToken.username,
                    email: decodedRefreshToken.email
                };

                const newAccessToken = jwt.sign(newPayload, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_ACCESS_TOKEN_TIME });

                return res.json({
                    newAccessToken,
                });
            }

            // remove the refresh token
            try {
                const expiredRefreshToken = jwt.decode(refreshToken);
                await db.deleteRefreshTokenFromCache(expiredRefreshToken.id, refreshToken);
            } catch (err) {
                console.error(err);
                return res.status(500).send();
            }

            // refresh token has expired, sign the user out
            return res.status(403).send();
        });
    });
}

/**
 * Controller to add a refresh token to the cache
 * @returns 200 - OK 
 * @returns 400 - no refresh token or user id
 * @returns 500 - redis cache error
 */
async function addRefreshTokenController(req, res) {
    const refreshToken = req.body.refreshToken;
    const userId = req.body.id;

    if (!refreshToken || !userId) return res.status(400).send();

    try {
        const reply = await db.addRefreshTokenToCache(userId, refreshToken);
        if (!reply) return res.status(500).send();

        return res.send();
    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }
}

/**
 * Controller to remove a refresh token to the cache
 * @returns 200 - OK 
 * @returns 500 - redis cache error
 */
async function removeRefreshTokenController(req, res) {
    const refreshToken = req.body.refreshToken;
    const userId = req.body.id;

    if (!refreshToken || !userId) return res.status(400).send();

    try {
        await db.deleteRefreshTokenFromCache(userId, refreshToken);
        return res.send();
    } catch (err) {
        return res.status(500).send();
    }
}

module.exports = {
    authController,
    addRefreshTokenController,
    removeRefreshTokenController,
}