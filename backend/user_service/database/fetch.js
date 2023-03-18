const { User } = require("./Schema/User");

async function findUserByEmail(email) {
    try {
        const user = await User.findOne({ email: email });
        return user;

    } catch (err) {
        throw err;
    }
}

module.exports = {
    findUserByEmail,
}