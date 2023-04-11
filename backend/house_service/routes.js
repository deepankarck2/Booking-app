const express = require('express');
const router = express.Router();

const controllers = require("./controllers");

router.get("/", (req, res) => res.json({ status: "ok" }));

router.post("/addHouse", controllers.addHouseController);
router.delete("/removeHouse", controllers.deleteHouseByIdController);

router.get("/getHouseById", controllers.fetchHouseByIdController);
router.get("/getHouseByLocation", controllers.fetchHouseByLocationController);
router.get("/getHousesByOwnerId", controllers.fetchHousesByOwnerIdController);
router.get("/getAllHouses", controllers.fetchAllHousesController);

module.exports = router;