const { addHouseController, addBookingController } = require("./insertController");
const { fetchHousesByOwnerIdController, fetchAllHousesController, fetchBookingsByBookerIdController, fetchBookingsByOwnerIdController } = require("./fetchController");
const { removeBookingController, removeHouseController } = require("./deleteController");

module.exports = {
    addHouseController,
    addBookingController,
    fetchHousesByOwnerIdController,
    fetchAllHousesController,
    removeBookingController,
    removeHouseController,
    fetchBookingsByBookerIdController,
    fetchBookingsByOwnerIdController,
}