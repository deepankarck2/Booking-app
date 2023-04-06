const axios = require('axios');
require("dotenv").config();
const getHTTPErrorCode = require("../utils/getHTTPErrorCode");

async function addHouseController(req, res) {
    const name = req.body.name;
    const location = req.body.location;
    const desc = req.body.desc || null;
    const image = req.body.image || null;
    const max_people = req.body.max_people;
    const amenities = req.body.amenities || [];
    const available_dates = req.body.available_dates || [];
    const price = req.body.price;
    const ownerId = req.body.ownerId;

    const authHeader = req.headers?.authorization;

    if (!authHeader) {
        return res.status(400).send("No authorization header");
    }

    const line = authHeader.split(" ");

    // no auth token provided
    if (line.length < 2 || line[0] !== 'Bearer') {
        return res.status(401).send("Invalid authorization format");
    }

    const accessToken = line[1];
    const refreshToken = req.cookies.refreshToken;

    try {
        // check authorization
        await axios.post(process.env.USER_SERVICE_HOST + "/auth", {
            accessToken, refreshToken
        });

        // add the house
        await axios.post(process.env.HOUSE_SERVICE_HOST + "/addHouse", {
            name, location, desc, image, max_people, amenities, available_dates,
            price, ownerId
        });

        return res.json({ status: "OK" });
    } catch (err) {
        return res.status(getHTTPErrorCode(err)).send();
    }

}

module.exports = {
    addHouseController,
}