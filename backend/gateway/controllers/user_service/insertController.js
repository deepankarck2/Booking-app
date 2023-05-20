const axios = require('axios');
const getHTTPErrorCode = require("../utils/getHTTPErrorCode");
require("dotenv").config();

async function registerController(req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    if (!username || !email || !password) return res.status(400).send();

    try {
        await axios.post(process.env.USER_SERVICE_HOST + "/register", { username, email, password });
        return res.json({ status: "OK" });

    } catch (err) {
        return res.status(getHTTPErrorCode(err)).send();
    }
}

async function addMoneyController(req, res) {
    const amount = req.body.amount;
    const userId = req.body.userId;

    if (!amount || !userId) return res.status(400).send();

    try {
        await axios.post(process.env.USER_SERVICE_HOST + "/addMoney", {
            amount, userId
        });

        return res.send();
    } catch (err) {
        return res.status(getHTTPErrorCode(err)).send();
    }
}

module.exports = {
    registerController,
    addMoneyController,
}