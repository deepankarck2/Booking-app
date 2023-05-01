const express = require('express');
const router = express.Router();
const { verifyTokens } = require("../middlewares/verifyTokens");
const controllers = require("../controllers/house_service");

router.post("/addHouse", verifyTokens, controllers.addHouseController);
router.get("/getHousesByOwnerId", controllers.fetchHousesByOwnerIdController);
router.get("/getAllHouses", controllers.fetchAllHousesController);
router.delete("/removeHouse", verifyTokens, controllers.removeHouseController);

router.post("/addBooking", verifyTokens, controllers.addBookingController);
router.delete("/removeBooking", verifyTokens, controllers.removeBookingController);
router.get("/fetchBookingsByBookerId", controllers.fetchBookingsByBookerIdController);
router.get("/fetchBookingsByOwnerId", controllers.fetchBookingsByOwnerIdController);

module.exports = router;