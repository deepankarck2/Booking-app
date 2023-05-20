const db = require("../database");

async function getMoneyController(req, res) {
    const userId = req.query.userId;

    if (!userId) return res.status(400).send();

    try {
        const amount = await db.getMoney(userId);
        return res.json({ amount: amount });
    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }
}

module.exports = {
    getMoneyController,
}