const axios = require("axios");
const getHTTPErrorCode = require("../controllers/utils/getHTTPErrorCode");
require("dotenv").config();

/**
 * Middleware to verify that the frontend request contains the right credentials (i.e. access token and refresh token)
 * 
 * @returns 400 - invalid authorization header
 * @returns 401 - no access token or refresh token
 */
async function verifyTokens(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(400).send();
    }

    const line = authHeader.split(" ");

    // no auth token provided
    if (line.length < 2 || line[0] !== 'Bearer') {
        return res.status(401).send();
    }

    const accessToken = line[1];

    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).send();
    }

    // ping auth service
    try {
        const response = await axios.post(process.env.USER_SERVICE_HOST + "/auth", { accessToken, refreshToken });

        if (response.data?.newAccessToken) {
            req.newAccessToken = response.data.newAccessToken;
        }

        return next();
    } catch (err) {
        return res.status(getHTTPErrorCode(err)).send();
    }
}

module.exports = {
    verifyTokens,
}