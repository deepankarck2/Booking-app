const axios = require('axios');
require("dotenv").config();
const getHTTPErrorCode = require("../utils/getHTTPErrorCode");

async function removeBookingController(req, res) {
    const bookingId = req.query.bookingId;

    if (bookingId === undefined || bookingId === "") return res.status(400).send();

    try {
        await axios.delete(process.env.HOUSE_SERVICE_HOST + `/removeBooking?bookingId=${bookingId}`);
        return res.send();
    } catch (err) {
        return res.status(getHTTPErrorCode(err)).send();
    }
}

async function removeHouseController(req, res) {
    const houseId = req.query.houseId;

    if (houseId === undefined || houseId === "") return res.status(400).send();

    try {
        await axios.delete(process.env.HOUSE_SERVICE_HOST + `/removeHouse?id=${houseId}`);
        return res.send();

    } catch (err) {
        return res.status(getHTTPErrorCode(err)).send();
    }
}

module.exports = {
    removeBookingController,
    removeHouseController,
}