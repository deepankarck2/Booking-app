const { initDatabase } = require("./init");
const { registerUser } = require("./register");
const { findUserByEmail } = require("./fetch");
const { deleteUserByEmail } = require("./delete");


module.exports = {
    initDatabase,
    registerUser,
    findUserByEmail,
    deleteUserByEmail,
}