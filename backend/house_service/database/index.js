const { initMongoDatabase } = require("./init");
const { addHouse, addBooking } = require("./insert");
const { deleteHouseById, } = require("./delete");
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
    fetchHouseById,
    fetchHouseByLocation,
    fetchHousesByOwnerId,
    fetchAllHouses,
    fetchBookingsByBookerId,
    fetchBookingsByHouseOwnerId,
}