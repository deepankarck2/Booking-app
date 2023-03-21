const axios = require("axios");
const getHTTPErrorCode = require("../utils/getHTTPErrorCode");
require("dotenv").config();

async function loginController(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email) return res.status(400).send("No email provided");
    if (!password) return res.status(400).send("No password provided");

    try {
        const response = await axios.post(process.env.USER_SERVICE_HOST + "/login", { email, password });

        const data = response.data;

        // no tokens returned
        if (!data || !data.accessToken || !data.refreshToken) return res.status(500).send();

        // send back the refresh token as an httpOnly cookie
        res.cookie("refreshToken", data.refreshToken, { httpOnly: true });

        // added refresh token to redis
        await axios.put(process.env.USER_SERVICE_HOST + "/addRefreshToken", {
            refreshToken: data.refreshToken,
            id: data.id
        });

        return res.json({
            status: "OK",
            id: data.id,
            username: data.username,
            email: data.email,
            accessToken: data.accessToken,
        });

    } catch (err) {
        return res.status(getHTTPErrorCode(err)).send();
    }
}

module.exports = {
    loginController,
}