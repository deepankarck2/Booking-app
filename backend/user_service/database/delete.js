const { User } = require("./Schema/User");

async function deleteUserByEmail(email) {
    try {
        await User.deleteOne({ email: email });
    } catch (err) {
        throw err;
    }
}

module.exports = {
    deleteUserByEmail,
}