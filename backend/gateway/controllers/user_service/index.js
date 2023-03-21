const { loginController } = require("./loginController");
const { registerController } = require("./registerController");
const { deleteUserByEmailController } = require("./deleteController");
const { authController } = require("./authController");



module.exports = {
    loginController,
    registerController,
    deleteUserByEmailController,
    authController,
}