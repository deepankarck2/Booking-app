const mongoose = require('mongoose');

const HouseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    desc: {
        type: String,
        required: false,
    },

    image: {
        type: String,
        required: false,
    },

    max_people: {
        type: Number,
        required: true,
    },

    amenities: {
        type: [String],
        required: false,
    },

    available_dates: {
        type: [Date],
        required: false,
    },

    price: {
        type: Number,
        required: true,
    },

    created_at: {
        type: Date,
        required: true,
    },

    ownerId: {
        type: String,
        required: true,
    },

    bookings: [{
        booker_id: {
            type: String,
            required: true,
        },

        checkInDate: {
            type: Date,
            required: true,
        },

        checkOutDate: {
            type: Date,
            required: true
        },
    }]
});

module.exports = {
    House: mongoose.model("House", HouseSchema)
};