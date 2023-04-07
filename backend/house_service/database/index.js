const { initMongoDatabase } = require("./init");
const { addHouse } = require("./insert");
const { deleteHouseById, } = require("./delete");
const { fetchHouseById, fetchHouseByLocation, fetchHousesByOwnerId } = require("./fetch");


module.exports = {
    initMongoDatabase,
    addHouse,
    deleteHouseById,
    fetchHouseById,
    fetchHouseByLocation,
    fetchHousesByOwnerId,
}