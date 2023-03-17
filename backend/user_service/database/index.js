const { initDatabase } = require("./init");
const { registerUser } = require("./register");
const { findUserByEmail } = require("./fetch");


module.exports = {
    initDatabase,
    registerUser,
    findUserByEmail,
}