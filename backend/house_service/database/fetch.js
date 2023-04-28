const { House } = require("./Schema/House");
const { Booking } = require("./Schema/Booking");


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

/**
 * Fetch all houses created by a user 
 * @param {string} ownerId 
 */
async function fetchHousesByOwnerId(ownerId) {
    try {
        const houses = await House.find({ ownerId: ownerId });
        return houses;
    } catch (err) {
        throw err;
    }
}

/**
 * Fetch all houses that exist in the database
 */
async function fetchAllHouses() {
    try {
        const houses = await House.find();
        return houses;
    } catch (err) {
        throw err;
    }
}

async function fetchBookingsByBookerId(bookerId) {
    try {
        const bookings = await Booking.find({ booker_id: bookerId });

        // using the bookings document to match the houses' id
        if (bookings.length === 0) return [];

        const houses = [];

        for (const booking of bookings) {
            const house_id = booking.house_id;
            if (!house_id) return;

            const house = await House.findById(house_id);

            if (!house) return;
            houses.push(house);
        }

        return houses;
    } catch (err) {
        throw err;
    }
}

async function fetchBookingsByHouseOwnerId(ownerId) {
    try {
        const bookings = await Booking.find({ house_owner_id: ownerId });
        return bookings;

    } catch (err) {
        throw err;
    }
}

module.exports = {
    fetchHouseById,
    fetchHouseByLocation,
    fetchHousesByOwnerId,
    fetchAllHouses,
    fetchBookingsByBookerId,
    fetchBookingsByHouseOwnerId,
}