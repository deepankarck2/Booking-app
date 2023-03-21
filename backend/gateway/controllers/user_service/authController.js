const axios = require('axios');
require("dotenv").config();
const getHTTPErrorCode = require("../utils/getHTTPErrorCode");

async function authController(req, res) {
    // get access token
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(400).send("No authorization header");
    }

    const line = authHeader.split(" ");

    // no auth token provided
    if (line.length < 2 || line[0] !== 'Bearer') {
        return res.status(401).send("Invalid authorization format");
    }

    const accessToken = line[1];

    // get current refresh token
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).send("No refresh token provided");
    }

    try {
        const result = await axios.post(process.env.USER_SERVICE_HOST + "/auth", { accessToken, refreshToken });
        return res.json(result.data);

    } catch (err) {
        return res.status(getHTTPErrorCode(err)).send();
    }
}

module.exports = {
    authController,
}