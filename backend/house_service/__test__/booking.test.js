const axios = require('axios');
const assert = require('assert');
const dummyHouse = require("./dummyHouse.json");
const dummyBooking = require("./dummyBooking.json");
require("dotenv").config();

let houseId = null;
let houseOwnerId = null;
let bookingId = null;

async function bookingTest() {
    describe("Testing the booking routes", async () => {
        it("Get the house id", async () => {
            try {
                const res = await axios.get(process.env.HOUSE_SERVICE_HOST + `/getHouseByLocation?location=${dummyHouse.location}`);

                if (!res || !res.data) return assert.fail("No data returned");

                const data = res.data;

                // make sure the id is returned
                assert.ok(data._id);
                houseId = data._id;

                assert.ok(data.ownerId);
                houseOwnerId = data.ownerId;
            } catch (err) {
                assert.fail(err);
            }
        });

        it("Create a new booking into the house", async () => {
            try {
                await axios.post(process.env.HOUSE_SERVICE_HOST + "/addBooking", {
                    booker_id: dummyBooking.booker_id,
                    house_owner_id: houseOwnerId,
                    house_id: houseId,
                    checkInDate: dummyBooking.checkInDate,
                    checkOutDate: dummyBooking.checkOutDate
                });
            } catch (err) {
                assert.fail(err);
            }
        });

        it("Check to make sure that the booking exists", async () => {
            try {
                const res = await axios.get(process.env.HOUSE_SERVICE_HOST + `/fetchBookingsByBookerId?bookerId=${dummyBooking.booker_id}`);
                if (!res || !res.data) return assert.fail("No data returned");

                const bookings = res.data.bookings;
                assert.equal(bookings.length, 1);

                const data = bookings[0];
                assert.ok(data.booking_id);
                bookingId = data.booking_id;

                // verify that everything is correct
                assert.equal(data.name, dummyHouse.name);
                assert.equal(data.location, dummyHouse.location);
                assert.equal(data.desc, dummyHouse.desc);
                assert.deepEqual(data.max_people, dummyHouse.max_people);
                assert.deepEqual(data.price, dummyHouse.price);
                assert.equal(data.ownerId, dummyHouse.ownerId);

                assert.deepEqual(JSON.stringify(data.amenities), JSON.stringify(dummyHouse.amenities));

                // check the dates
                dummyHouse.available_dates.forEach((date, i) => {
                    const dummyDate = new Date(date);

                    assert.equal(dummyDate.toISOString(), data.available_dates[i]);

                });

                assert.equal(new Date(dummyBooking.checkInDate).toISOString(), data.checkInDate);
                assert.equal(new Date(dummyBooking.checkOutDate).toISOString(), data.checkOutDate);

            } catch (err) {
                assert.fail(err);
            }
        });

        it("Remove the booking", async () => {
            try {
                await axios.delete(process.env.HOUSE_SERVICE_HOST + `/removeBooking?bookingId=${bookingId}`);
            } catch (err) {
                assert.fail(err);
            }
        });

        it("Check to make sure that the booking is removed", async () => {
            try {
                const res = await axios.get(process.env.HOUSE_SERVICE_HOST + `/fetchBookingsByBookerId?bookerId=${dummyBooking.booker_id}`);
                if (!res || !res.data) return assert.fail("No data returned");

                const data = res.data.bookings;

                assert.equal(data.length, 0);
            } catch (err) {
                assert.fail(err);
            }
        });
    });
}

module.exports = bookingTest;