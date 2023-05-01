const express = require('express');
const router = express.Router();

const controllers = require("../controllers/house_service");

router.post("/addHouse", controllers.addHouseController);
router.get("/getHousesByOwnerId", controllers.fetchHousesByOwnerIdController);
router.get("/getAllHouses", controllers.fetchAllHousesController);

router.post("/addBooking", controllers.addBookingController);
router.delete("/removeBooking", controllers.removeBookingController);
router.get("/fetchBookingsByBookerId", controllers.fetchBookingsByBookerIdController);
router.get("/fetchBookingsByOwnerId", controllers.fetchBookingsByOwnerIdController);

module.exports = router;