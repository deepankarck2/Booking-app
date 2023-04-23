import axios from "axios"
import requestURLs from "./requestURLs.json";

export async function fetchBookingsByBookerRequest(bookerId) {
    try {
        const res = await axios.get(requestURLs.fetchBookingsByBooker + `?bookerId=${bookerId}`);

        if (!res || !res.data) throw new Error("Couldn't fetch bookings");

        return res.data.bookings;
    } catch (err) {
        throw err;
    }
}