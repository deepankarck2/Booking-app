const { loginController } = require("./loginController");
const { registerController } = require("./registerController");
const { deleteUserByEmailController } = require("./deleteController");
const { addRefreshTokenController, authController, removeRefreshTokenController } = require("./authControllers");


module.exports = {
    loginController,
    registerController,
    deleteUserByEmailController,
    addRefreshTokenController,
    authController,
    removeRefreshTokenController,
}