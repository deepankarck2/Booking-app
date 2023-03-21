const db = require('../database');

async function logoutController(req, res) {
    const id = req.body.id;
    const refreshToken = req.body.refreshToken;

    if (!refreshToken || !id) return res.status(400).send();

    try {
        await db.deleteRefreshTokenFromCache(id, refreshToken);
        return res.json({ status: "OK" });

    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }
}

module.exports = {
    logoutController,
}