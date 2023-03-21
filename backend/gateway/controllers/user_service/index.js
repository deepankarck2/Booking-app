const { loginController } = require("./loginController");
const { registerController } = require("./registerController");
const { deleteUserByEmailController } = require("./deleteController");
const { authController } = require("./authController");
const { logoutController } = require("./logoutController");



module.exports = {
    loginController,
    logoutController,
    registerController,
    deleteUserByEmailController,
    authController,
}