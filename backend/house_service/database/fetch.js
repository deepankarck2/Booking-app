const { House } = require("./Schema/House");

/**
 * Get a house given its id
 * @param {string} id 
 * @returns house json object null otherwise
 */
async function fetchHouseById(id) {
    try {
        const house = await House.findById(id);
        return house;
    } catch (err) {
        throw err;
    }
}

/**
 * Get a house given its location
 * @param {string} location 
 * @returns house json object null otherwise
 */
async function fetchHouseByLocation(location) {
    try {
        const house = await House.findOne({ location: location });
        return house;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    fetchHouseById,
    fetchHouseByLocation,
}