const { addHouseController, addBookingController } = require("./insertController");
const { deleteHouseByIdController, removeBookingController } = require("./deleteController");
const {
    fetchHouseByIdController,
    fetchHouseByLocationController,
    fetchHousesByOwnerIdController,
    fetchAllHousesController,
    fetchBookingsByBookerIdController,
    fetchBookingsByHouseOwnerIdController
} = require("./fetchController");




module.exports = {
    addHouseController,
    addBookingController,
    deleteHouseByIdController,
    removeBookingController,
    fetchHouseByIdController,
    fetchHouseByLocationController,
    fetchHousesByOwnerIdController,
    fetchAllHousesController,
    fetchBookingsByBookerIdController,
    fetchBookingsByHouseOwnerIdController,
}