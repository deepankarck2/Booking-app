const axios = require('axios');
const assert = require('assert');
require("dotenv").config();

const dummyUser = require("./dummyUser.json");

async function registrationTest() {
    describe("Testing the registration routes", async () => {
        it("Create a dummy user using the /register route", async () => {
            try {
                await axios.post(process.env.USER_SERVICE_HOST + "/register", {
                    username: dummyUser.username,
                    email: dummyUser.email,
                    password: dummyUser.password
                });

            } catch (err) {
                assert.fail(err);
            }
        });

        it("Try to add a duplicate user with the same details, should return a 409 status code", async () => {
            try {
                await axios.post(process.env.USER_SERVICE_HOST + "/register", {
                    username: dummyUser.username,
                    email: dummyUser.email,
                    password: dummyUser.password
                });

                // duplicate user has been successfully registered
                assert.fail("Duplicate user detected");
            } catch (err) {
                if (!err) assert.fail("Axios error");
                assert.equal(err.response.status, 409);
            }
        });
    })
}

module.exports = {
    registrationTest,
}