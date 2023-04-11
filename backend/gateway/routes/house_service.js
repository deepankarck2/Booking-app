const express = require('express');
const router = express.Router();

const controllers = require("../controllers/house_service");

router.post("/addHouse", controllers.addHouseController);
router.get("/getHousesByOwnerId", controllers.fetchHousesByOwnerIdController);
router.get("/getAllHouses", controllers.fetchAllHousesController);

module.exports = router;