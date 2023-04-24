const axios = require('axios');
const assert = require('assert');
const dummyHouse = require("./dummyHouse.json");
require("dotenv").config();

let houseId = null;

async function fetchHouseTest() {
    describe("Testing the fetch routes", async () => {
        it("Fetch the newly created house using /getHouseByLocation route", async () => {
            try {
                const res = await axios.get(process.env.HOUSE_SERVICE_HOST + `/getHouseByLocation?location=${dummyHouse.location}`);

                if (!res || !res.data) return assert.fail("No data returned");

                const data = res.data;

                // make sure the id is returned
                assert.ok(data._id);
                houseId = data._id;

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

            } catch (err) {
                assert.fail(err);
            }
        });

        it("Fetch the newly created house using /getHouseById route", async () => {
            try {
                const res = await axios.get(process.env.HOUSE_SERVICE_HOST + `/getHouseById?id=${houseId}`);
                if (!res || !res.data) return assert.fail("No data returned");
                const data = res.data;

                // make sure the id is returned
                assert.ok(data._id);

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

            } catch (err) {
                assert.fail(err);
            }
        });

        it("Fetch the newly created house using /getHousesByOwnerId route", async () => {
            try {
                const res = await axios.get(process.env.HOUSE_SERVICE_HOST + `/getHousesByOwnerId?ownerId=${dummyHouse.ownerId}`);
                if (!res || !res.data) return assert.fail("No data returned");

                // there should be only one house
                assert.equal(1, res.data.houses.length);

                const data = res.data.houses[0];

                // make sure the id is returned
                assert.ok(data._id);

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

            } catch (err) {
                assert.fail(err);
            }
        });


    });
}

module.exports = fetchHouseTest;