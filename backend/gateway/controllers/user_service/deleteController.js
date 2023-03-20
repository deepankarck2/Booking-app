const axios = require("axios");
const getHTTPErrorCode = require("../utils/getHTTPErrorCode");

async function deleteUserByEmailController(req, res) {
    const email = req.params.email;

    if (!email) return res.status(400).send();

    try {
        await axios.delete(process.env.USER_SERVICE_HOST + `/deleteUserByEmail/${email}`);
        return res.json({ status: "OK" });

    } catch (err) {
        return res.status(getHTTPErrorCode(err)).send();
    }
}

module.exports = {
    deleteUserByEmailController,
}