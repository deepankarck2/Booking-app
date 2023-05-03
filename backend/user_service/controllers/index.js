const { loginController } = require("./loginController");
const { registerController, addMoneyController } = require("./insertController");
const { deleteUserByEmailController } = require("./deleteController");
const { addRefreshTokenController, authController, removeRefreshTokenController } = require("./authControllers");
const { logoutController } = require("./logoutController");
const { getMoneyController } = require("./fetchController");


module.exports = {
    loginController,
    logoutController,
    registerController,
    addMoneyController,
    deleteUserByEmailController,
    addRefreshTokenController,
    authController,
    removeRefreshTokenController,
    getMoneyController,
}