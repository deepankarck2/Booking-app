const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    booker_id: {
        type: String,
        required: true,
    },

    house_owner_id: {
        type: String,
        required: true,
    },

    house_id: {
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

    createdAt: {
        type: Date,
        required: true,
    }

});

module.exports = {
    Booking: mongoose.model("Booking", BookingSchema)
};