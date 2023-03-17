const mongoose = require("mongoose");
require("dotenv").config();

const DATABASE_URL = process.env.MONGO_DB_HOST || "";

async function initDatabase() {
    try {
        console.log(`Trying to establish database connection`);
        await mongoose.connect(DATABASE_URL);
    } catch (err) {
        console.error(`Failed to establish database connection`);
        throw err;
    }
}

module.exports = {
    initDatabase,
}

