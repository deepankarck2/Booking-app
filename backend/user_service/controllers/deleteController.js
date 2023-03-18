const db = require("../database");

async function deleteUserByEmailController(req, res) {
    const email = req.params.email;

    if (!email) return res.status(400).send("No email provided");

    try {
        await db.deleteUserByEmail(email);
        return res.json({ status: "OK" });

    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }
}

module.exports = {
    deleteUserByEmailController,
}