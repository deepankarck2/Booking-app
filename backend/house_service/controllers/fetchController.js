const db = require("../database");

/**
 * Controller for getting a house's information using its location 
 */
async function fetchHouseByIdController(req, res) {
    const id = req.query.id;

    if (!id) return res.status(400).send();

    try {
        const house = await db.fetchHouseById(id);
        if (house === null) return res.status(404).send();

        return res.json(house);
    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }
}

/**
 * Controller for getting a house's information using its id 
 */
async function fetchHouseByLocationController(req, res) {
    const location = req.query.location;

    if (!location) return res.status(400).send();

    try {
        const house = await db.fetchHouseByLocation(location);
        if (house === null) return res.status(404).send();

        return res.json(house);

    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }
}

async function fetchHousesByOwnerIdController(req, res) {
    const ownerId = req.query.ownerId;

    if (!ownerId) return res.status(400).send();

    try {
        const houses = await db.fetchHousesByOwnerId(ownerId);

        console.log(houses);
        return res.json({ houses });

    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }
}

async function fetchAllHousesController(req, res) {
    try {
        const houses = await db.fetchAllHouses();
        if (!houses) return res.json({ houses: [] });

        return res.json({ houses: houses });
    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }
}

module.exports = {
    fetchHouseByIdController,
    fetchHouseByLocationController,
    fetchHousesByOwnerIdController,
    fetchAllHousesController,
}
