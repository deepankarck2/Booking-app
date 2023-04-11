const axios = require('axios');
require("dotenv").config();
const getHTTPErrorCode = require("../utils/getHTTPErrorCode");

async function fetchHousesByOwnerIdController(req, res) {
    const ownerId = req.query.ownerId;

    if (!ownerId) return res.status(400).send();

    try {
        const response = await axios.get(process.env.HOUSE_SERVICE_HOST + `/getHousesByOwnerId?ownerId=${ownerId}`);

        if (!response.data) return res.status(500).send();

        return res.json({ houses: response.data.houses });

    } catch (err) {
        console.log(err);
        return res.status(getHTTPErrorCode(err)).send();
    }
}

async function fetchAllHousesController(req, res) {
    try {
        const response = await axios.get(process.env.HOUSE_SERVICE_HOST + "/getAllHouses");
        if (!response.data) return res.status(500).send();

        return res.json({ houses: response.data.houses });
    } catch (err) {
        return res.status(getHTTPErrorCode(err)).send();
    }
}

module.exports = {
    fetchHousesByOwnerIdController,
    fetchAllHousesController,
}