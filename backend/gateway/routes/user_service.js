const express = require('express');
const router = express.Router();
const { verifyTokens } = require("../middlewares/verifyTokens");

const controllers = require("../controllers/user_service");

router.post("/login", controllers.loginController);
router.post("/logout", controllers.logoutController);

router.post("/register", controllers.registerController);

router.delete("/deleteUserByEmail/:email", controllers.deleteUserByEmailController);

router.get("/auth", controllers.authController);

router.post("/addMoney", verifyTokens, controllers.addMoneyController);
router.get("/getMoney", controllers.getMoneyController);

module.exports = router;