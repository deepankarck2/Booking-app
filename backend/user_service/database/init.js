const mongoose = require("mongoose");
require("dotenv").config();

const DATABASE_URL = process.env.MONGO_DB_HOST || "";

/**
 * Estabish a connection to the mongo database
 */
async function initDatabase() {
    try {
        console.log(`Trying to establish database connection`);
        await mongoose.connect(DATABASE_URL);
        console.log(`Connection established`);
    } catch (err) {
        console.error(`Failed to establish database connection`);
        throw err;
    }
}

module.exports = {
    initDatabase,
}

