const { encryptPassword } = require("../utils/encrypt");
const db = require("../database");

async function registerController(req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    // make sure the required fields are filled
    if (!username) return res.status(400).send("No username provided");
    if (!email) return res.status(400).send("No email provided");
    if (!password) return res.status(400).send("No password provided");

    try {
        const user = await db.findUserByEmail(email);

        if (user) return res.status(409).send("User already registered");

        await db.registerUser({
            username, email, password: encryptPassword(password),
            money: 0
        });

        return res.json({ status: "OK" });
    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }
}

async function addMoneyController(req, res) {
    const userId = req.body.userId;
    const amount = req.body.amount;

    if (!userId || !amount) return res.status(400).send();

    try {
        await db.addMoney(userId, amount);
        return res.send();
    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }
}

module.exports = {
    registerController,
    addMoneyController,
}