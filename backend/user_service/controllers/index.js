const { loginController } = require("./loginController");
const { registerController } = require("./registerController");
const { deleteUserByEmailController } = require("./deleteController");
const { addRefreshTokenController, authController, removeRefreshTokenController } = require("./authControllers");
const { logoutController } = require("./logoutController");



module.exports = {
    loginController,
    logoutController,
    registerController,
    deleteUserByEmailController,
    addRefreshTokenController,
    authController,
    removeRefreshTokenController,
}