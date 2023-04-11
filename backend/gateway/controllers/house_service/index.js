const { addHouseController } = require("./insertController");
const { fetchHousesByOwnerIdController, fetchAllHousesController } = require("./fetchController");


module.exports = {
    addHouseController,
    fetchHousesByOwnerIdController,
    fetchAllHousesController,
}