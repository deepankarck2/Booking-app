const { addHouseController } = require("./insertController");
const { deleteHouseByIdController } = require("./deleteController");
const { fetchHouseByIdController, fetchHouseByLocationController } = require("./fetchController");



module.exports = {
    addHouseController,
    deleteHouseByIdController,
    fetchHouseByIdController,
    fetchHouseByLocationController,
}