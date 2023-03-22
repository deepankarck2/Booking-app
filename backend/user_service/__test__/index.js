const { initializationTest } = require("./init");
const { registrationTest } = require("./register");
const { deletionTest } = require("./delete");
const { loginTest } = require("./login");


async function unitTest() {
    try {
        await initializationTest();
        await registrationTest();
        await loginTest();
        await deletionTest();
    } catch (err) {
        console.error(`There was an error performing the unit test`);
    }
}

unitTest();