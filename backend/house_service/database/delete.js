const { House } = require("./Schema/House");
const { Booking } = require("./Schema/Booking");

/**
 * Delete a house given its id
 * @param {string} houseId 
 */
async function deleteHouseById(houseId) {
    try {
        await House.deleteOne({ _id: houseId });
    } catch (err) {
        throw err;
    }
}

async function deleteBookingById(bookingId) {
    try {
        await Booking.deleteOne({ _id: bookingId });
    } catch (err) {
        throw err;
    }
}

module.exports = {
    deleteHouseById,
    deleteBookingById,
}