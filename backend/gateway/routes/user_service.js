const express = require('express');
const router = express.Router();

const controllers = require("../controllers/user_service");

router.post("/login", controllers.loginController);
router.post("/register", controllers.registerController);

router.delete("/deleteUserByEmail/:email", controllers.deleteUserByEmailController);

module.exports = router;