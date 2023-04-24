const { addHouseController, addBookingController } = require("./insertController");
const { deleteHouseByIdController } = require("./deleteController");
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
    fetchHouseByIdController,
    fetchHouseByLocationController,
    fetchHousesByOwnerIdController,
    fetchAllHousesController,
    fetchBookingsByBookerIdController,
    fetchBookingsByHouseOwnerIdController,
}