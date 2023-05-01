const createHouseTest = require("./createHouse.test");
const deleteHouseTest = require("./deleteHouse.test");
const fetchHouseTest = require("./fetchHouse.test");
const bookingTest = require("./booking.test");

async function startHouseUnitTest() {
    try {
        await createHouseTest();
        await fetchHouseTest();
        await bookingTest();
        await deleteHouseTest();
    } catch (err) {
        console.log(err);
    }
}

startHouseUnitTest();