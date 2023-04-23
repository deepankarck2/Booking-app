const db = require("../database");

/**
 * Controller for deleting a house from the database 
 */
async function deleteHouseByIdController(req, res) {
    const id = req.query.id;

    if (!id) return res.status(400).send();

    try {
        await db.deleteHouseById(id);
        return res.send();
    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }
}

async function removeBookingController(req, res) {
    const bookingId = req.query.bookingId;

    if (!bookingId) return res.status(400).send();

    try {
        await db.deleteBooking(bookingId);
        return res.send();
    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }
}

module.exports = {
    deleteHouseByIdController,
    removeBookingController,
}