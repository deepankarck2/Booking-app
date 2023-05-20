import axios from "axios";
import requestURLs from "./requestURLs.json";
import { getToken } from "../storage/getToken";

export async function addBookingRequest({ house_id, startDate, endDate, owner_id, price }, user_id,) {
    const token = getToken();
    if (!token) throw new Error("No token provided");

    try {
        await axios.post(requestURLs.addBooking, {
            booker_id: user_id,
            house_owner_id: owner_id,
            house_id: house_id,
            checkInDate: startDate,
            checkOutDate: endDate,
            price: price,
        }, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        })
    } catch (err) {
        throw err;
    }
}