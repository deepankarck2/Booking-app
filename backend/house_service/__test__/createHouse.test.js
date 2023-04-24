const axios = require('axios');
const assert = require('assert');
const dummyHouse = require("./dummyHouse.json");
require("dotenv").config();

async function createHouseTest() {
    describe("Testing the insertion routes", async () => {
        it("Create a new house using /addHouse", async () => {
            try {
                const res = await axios.post(process.env.HOUSE_SERVICE_HOST + "/addHouse", {
                    name: dummyHouse.name,
                    location: dummyHouse.location,
                    desc: dummyHouse.desc,
                    image: dummyHouse.image,
                    max_people: dummyHouse.max_people,
                    amenities: dummyHouse.amenities,
                    available_dates: dummyHouse.available_dates,
                    price: dummyHouse.price,
                    ownerId: dummyHouse.ownerId,
                });

                if (!res || !res.data) return assert.fail("No data returned");

                assert.equal("ok", res.data.status.toLowerCase());

            } catch (err) {
                assert.equal(err.response.status, 409);
            }
        });
    });
}

module.exports = createHouseTest;