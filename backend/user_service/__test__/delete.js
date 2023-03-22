const axios = require('axios');
const assert = require('assert');
require("dotenv").config();

const dummyUser = require("./dummyUser.json");

async function deletionTest() {
    describe("Testing the deletion routes", async () => {
        it("Delete the dummy user using the /deleteUserByEmail route", async () => {
            try {
                await axios.delete(process.env.USER_SERVICE_HOST + `/deleteUserByEmail/${dummyUser.email}`);
            } catch (err) {
                assert.fail(err);
            }
        });

        it("Test to make sure that the user is deleted", async () => {
            try {
                await axios.delete(process.env.USER_SERVICE_HOST + `/login/`, {
                    email: dummyUser.email,
                    password: dummyUser.password
                });

                // user successfully logged in, the user still in db
                assert.fail("User still exist in the database");
            } catch (err) {
                if (!err) assert.fail("Axios error");
                assert.equal(err.response.status, 404);
            }
        });
    });
}

module.exports = {
    deletionTest,
}