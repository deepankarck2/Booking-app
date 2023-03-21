const mongoose = require("mongoose");
const Redis = require("redis");
require("dotenv").config();

const DATABASE_URL = process.env.MONGO_DB_HOST || "";
const redisClient = Redis.createClient({
    url: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
});

/**
 * Establish a connection to the mongo database
 */
async function initMongoDatabase() {
    try {
        console.log(`Trying to establish mongo database connection`);
        await mongoose.connect(DATABASE_URL);
        console.log(`Connection to mongo database established`);
    } catch (err) {
        console.error(`Failed to establish database connection`);
        throw err;
    }
}

/**
 * Establish a connection to the redis cache
 */
async function initAuthDatabase() {
    try {
        console.log(`Trying to establish redis database connection`);
        await redisClient.connect();
        console.log(`Connection to redis cache established`);
    } catch (err) {
        console.error(`Cannot establish a connection to redis`);
        throw err;
    }
}

module.exports = {
    initMongoDatabase,
    initAuthDatabase,
    redisClient,
}

