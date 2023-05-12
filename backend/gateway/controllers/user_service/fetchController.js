const axios = require('axios');
const getHTTPErrorCode = require("../utils/getHTTPErrorCode");
require("dotenv").config();

async function getMoneyController(req, res) {
    const userId = req.query.userId;

    if (!userId) return res.status(400).send();

    try {
        const response = await axios.get(process.env.USER_SERVICE_HOST + `/getMoney?userId=${userId}`);

        if (!response || !response.data) return res.status(500).send();

        return res.json({ amount: response.data.amount });
    } catch (err) {
        return res.status(getHTTPErrorCode(err)).send();
    }
}

module.exports = {
    getMoneyController,
}