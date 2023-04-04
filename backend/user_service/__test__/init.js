const axios = require("axios");
const assert = require("assert");
require("dotenv").config();

async function initializationTest() {
  describe("Initialization Test", async () => {
    it(`Test to make sure that the user service is at ${process.env.USER_SERVICE_HOST}`, async () => {
      try {
        await axios.get(process.env.USER_SERVICE_HOST);
      } catch (err) {
        assert.fail(err);
      }
    });
  });
}

module.exports = {
  initializationTest,
};
