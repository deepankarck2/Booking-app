const express = require('express');
const router = express.Router();

const controllers = require("./controllers");

router.post("/login", controllers.loginController);
router.post("/register", controllers.loginController);


module.exports = router;