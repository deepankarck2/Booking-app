const axios = require('axios');
const getHTTPErrorCode = require("../utils/getHTTPErrorCode");

/**
 * Controller to logout a user
 */
async function logoutController(req, res) {
    const id = req.body.id;
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken || !id) return res.status(400).send();

    try {
        await axios.post(process.env.USER_SERVICE_HOST + "/logout", {
            id, refreshToken
        });

        return res.json({ status: "OK" });

    } catch (err) {
        return res.status(getHTTPErrorCode(err)).send();
    }
}

module.exports = {
    logoutController,
}