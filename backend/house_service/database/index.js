const { initMongoDatabase } = require("./init");
const { addHouse } = require("./insert");
const { deleteHouseById, } = require("./delete");
const { fetchHouseById, fetchHouseByLocation } = require("./fetch");


module.exports = {
    initMongoDatabase,
    addHouse,
    deleteHouseById,
    fetchHouseById,
    fetchHouseByLocation,
}