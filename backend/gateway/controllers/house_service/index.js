const { addHouseController, addBookingController } = require("./insertController");
const { fetchHousesByOwnerIdController, fetchAllHousesController, fetchBookingsByBookerIdController, fetchBookingsByOwnerIdController } = require("./fetchController");
const { removeBookingController } = require("./deleteController");

module.exports = {
    addHouseController,
    addBookingController,
    fetchHousesByOwnerIdController,
    fetchAllHousesController,
    removeBookingController,
    fetchBookingsByBookerIdController,
    fetchBookingsByOwnerIdController,
}