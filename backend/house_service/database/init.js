const mongoose = require("mongoose");
require("dotenv").config();

const DATABASE_URL = process.env.MONGO_DB_HOST || "";

/**
 * Establish a connection to the mongo database
 */
async function initMongoDatabase() {
    try {
        console.log(`Trying to establish mongo house database connection`);
        await mongoose.connect(DATABASE_URL);
        console.log(`Connection to mongo house database established`);
    } catch (err) {
        console.error(`Failed to establish database connection`);
        throw err;
    }
}
module.exports = {
    initMongoDatabase,
}

