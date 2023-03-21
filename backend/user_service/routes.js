const express = require('express');
const router = express.Router();

const controllers = require("./controllers");

router.get("/", (req, res) => res.json({ status: "ok" }));

router.post("/login", controllers.loginController);
router.post("/logout", controllers.logoutController);

router.post("/register", controllers.registerController);
router.delete("/deleteUserByEmail/:email", controllers.deleteUserByEmailController);

router.post("/auth", controllers.authController);
router.put("/addRefreshToken", controllers.addRefreshTokenController);
router.post("/removeRefreshToken", controllers.removeRefreshTokenController);

module.exports = router;