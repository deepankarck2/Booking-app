const { User } = require("./Schema/User");

async function findUserByEmail(email) {
    try {
        const user = await User.findOne({ email: email });
        return user;

    } catch (err) {
        throw err;
    }
}

async function getMoney(userId) {
    try {
        const user = await User.findById(userId);
        if (user == null) throw new Error("Cannot find user");

        return user.money;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    findUserByEmail,
    getMoney,
}