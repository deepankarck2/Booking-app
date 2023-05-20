const { loginController } = require("./loginController");
const { registerController, addMoneyController } = require("./insertController");
const { deleteUserByEmailController } = require("./deleteController");
const { authController } = require("./authController");
const { logoutController } = require("./logoutController");
const { getMoneyController } = require("./fetchController");



module.exports = {
    loginController,
    logoutController,
    registerController,
    addMoneyController,
    deleteUserByEmailController,
    authController,
    getMoneyController,
}