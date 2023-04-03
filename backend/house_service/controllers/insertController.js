const db = require("../database");

/**
 * Controller for adding a house into the database 
 */
async function addHouseController(req, res) {
    const name = req.body.name;
    const location = req.body.location;
    const desc = req.body.desc || null;
    const image = req.body.image || null;
    const max_people = req.body.max_people;
    const amenities = req.body.amenities || [];
    const available_dates = req.body.available_dates || [];
    const price = req.body.price;

    if (!name || !location || !max_people || !price) return res.status(400).json({ status: "Missing required body fields" });

    // change available date into Date format
    for (let i = 0; i < available_dates.length; i++) {
        const date = new Date(available_dates[i]);

        // invalid format
        if (date.toString().toLowerCase() === 'invalid date') return res.status(400).json({ status: "Invalid date(s)" });

        available_dates[i] = new Date(date)
    }


    try {
        await db.addHouse({
            name, location, desc, image, max_people,
            amenities, available_dates, price, created_at: new Date(),
        });

        return res.json({ status: 'OK' });
    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }
}

module.exports = {
    addHouseController,
}