const axios = require("axios");
const assert = require("assert");
require("dotenv").config();

const dummyUser = require("./dummyUser.json");
let refreshToken = null;
let userId = null;

async function loginTest() {
  describe("Testing the login routes", async () => {
    it("Login the dummy user", async () => {
      try {
        const res = await axios.post(process.env.USER_SERVICE_HOST + "/login", {
          email: dummyUser.email,
          password: dummyUser.password,
        });

        if (!res || !res.data) return assert.fail("No data returned");

        // assert the returned data
        assert.equal(res.data.email, dummyUser.email);
        assert.equal(res.data.username, dummyUser.username);
        assert.ok(res.data.id);
        assert.ok(res.data.accessToken);
        assert.ok(res.data.refreshToken);

        refreshToken = res.data.accessToken;
        userId = res.data.id;
      } catch (err) {
        assert.fail(err);
      }
    });

    it("Logout the dummy user", async () => {
      try {
        await axios.post(process.env.USER_SERVICE_HOST + "/logout", {
          id: userId,
          refreshToken: refreshToken,
        });
      } catch (err) {
        assert.fail(err);
      }
    });
  });
}

module.exports = {
  loginTest,
};
