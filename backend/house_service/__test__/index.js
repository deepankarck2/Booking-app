const createHouseTest = require("./createHouse.test");
const deleteHouseTest = require("./deleteHouse.test");
const fetchHouseTest = require("./fetchHouse.test");

async function startHouseUnitTest() {
    try {
        await createHouseTest();
        await fetchHouseTest();
        await deleteHouseTest();
    } catch (err) {
        console.log(err);
    }
}

startHouseUnitTest();