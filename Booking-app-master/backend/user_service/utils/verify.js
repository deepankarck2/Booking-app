const bcrypt = require("bcryptjs");

function verifyPassword(password, encryptedPassword) {
    return bcrypt.compareSync(password, encryptedPassword);
}

module.exports = {
    verifyPassword
}