const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateAccessToken(data) {
    return jwt.sign(data, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_ACCESS_TOKEN_TIME });
}

function generateRefreshToken(data) {
    return jwt.sign(data, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: process.env.JWT_REFRESH_TOKEN_TIME });
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
}