const { House } = require("./Schema/House");

/**
 * Add a house to the database
 * @param {object} reqObj 
 */
async function addHouse(reqObj) {
    try {
        await House.create({
            name: reqObj.name,
            location: reqObj.location,
            desc: reqObj.desc,
            image: reqObj.image,
            max_people: reqObj.max_people,
            amenities: reqObj.amenities,
            available_dates: reqObj.available_dates,
            price: reqObj.price,
            created_at: reqObj.created_at,
            ownerId: reqObj.ownerId
        });
    } catch (err) {
        throw err;
    }
}

module.exports = {
    addHouse,
}