const bcrypt = require("bcryptjs");

function _genSalt(saltVal = 10) {
    return bcrypt.genSaltSync(saltVal);
}

function encryptPassword(password) {
    return bcrypt.hashSync(password, _genSalt());
}

module.exports = {
    encryptPassword,
}