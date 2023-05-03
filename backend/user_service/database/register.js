const { User } = require("./Schema/User");

/**
 * Add a new user to the database
 * @type {string} username
 * @type {string} email
 * @type {string} password
 * @param {object} registerReq 
 */
async function registerUser(registerReq) {
    const username = registerReq.username;
    const email = registerReq.email;
    const password = registerReq.password;
    const money = registerReq.money;

    try {
        await User.create({
            username, email, password, money
        });
    } catch (err) {
        throw err;
    }

}

module.exports = {
    registerUser,
}