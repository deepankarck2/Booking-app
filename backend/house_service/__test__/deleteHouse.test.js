const axios = require('axios');
const assert = require('assert');
const dummyHouse = require("./dummyHouse.json");
require("dotenv").config();

async function deleteHouseTest() {
    let houseId = null;

    describe("Testing the deletion routes", async () => {
        it("Get the house id", async () => {
            try {
                const res = await axios.get(process.env.HOUSE_SERVICE_HOST + `/getHouseByLocation?location=${dummyHouse.location}`);
                if (!res || !res.data) return assert.fail("No data returned");

                assert.ok(res.data._id);
                houseId = res.data._id;

            } catch (err) {
                assert.fail(err);
            }
        });

        it("Delete the house document", async () => {
            try {
                await axios.delete(process.env.HOUSE_SERVICE_HOST + `/removeHouse?id=${houseId}`);
            } catch (err) {
                assert.fail(err);
            }
        });

        it("Check to make sure that the house is actually deleted", async () => {
            try {
                const res = await axios.get(process.env.HOUSE_SERVICE_HOST + `/getHouseById?id=${houseId}`);

                if (res.data) return assert.fail("The house still exists in the database");

                assert.fail("Error code 404 did not return");
            } catch (err) {
                if (!err) assert.fail("Axios error");
                assert.equal(err.response.status, 404);
            }
        });
    });
}

module.exports = deleteHouseTest;