const { initMongoDatabase } = require("./init");
const { addHouse, addBooking } = require("./insert");
const { deleteHouseById, deleteBookingById } = require("./delete");
const {
    fetchHouseById,
    fetchHouseByLocation,
    fetchHousesByOwnerId,
    fetchAllHouses,
    fetchBookingsByBookerId,
    fetchBookingsByHouseOwnerId,
} = require("./fetch");


module.exports = {
    initMongoDatabase,
    addHouse,
    addBooking,
    deleteHouseById,
    deleteBookingById,
    fetchHouseById,
    fetchHouseByLocation,
    fetchHousesByOwnerId,
    fetchAllHouses,
    fetchBookingsByBookerId,
    fetchBookingsByHouseOwnerId,
}