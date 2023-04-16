const { initMongoDatabase } = require("./init");
const { addHouse } = require("./insert");
const { deleteHouseById, } = require("./delete");
const { fetchHouseById, fetchHouseByLocation, fetchHousesByOwnerId, fetchAllHouses } = require("./fetch");


module.exports = {
    initMongoDatabase,
    addHouse,
    deleteHouseById,
    fetchHouseById,
    fetchHouseByLocation,
    fetchHousesByOwnerId,
    fetchAllHouses,
}