const express = require('express');
const router = express.Router();

const controllers = require("./controllers");

router.get("/", (req, res) => res.json({ status: "ok" }));

router.post("/login", controllers.loginController);
router.post("/register", controllers.registerController);

router.delete("/deleteUserByEmail/:email", controllers.deleteUserByEmailController);

module.exports = router;