const { House } = require("./Schema/House");

/**
 * Delete a house given its id
 * @param {string} houseId 
 */
async function deleteHouseById(houseId) {
    try {
        await House.deleteOne({ _id: houseId });
    } catch (err) {
        throw err;
    }
}

module.exports = {
    deleteHouseById,
}