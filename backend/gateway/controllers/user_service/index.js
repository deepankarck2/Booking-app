const { loginController } = require("./loginController");
const { registerController } = require("./registerController");
const { deleteUserByEmailController } = require("./deleteController");


module.exports = {
    loginController,
    registerController,
    deleteUserByEmailController,
}