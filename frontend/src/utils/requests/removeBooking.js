import axios from "axios";
import requestURLs from "./requestURLs.json";
import { getToken } from "../storage/getToken";

export async function removeBookingRequest(bookingId) {
    if (!bookingId) throw new Error("BookingId is required");

    const token = getToken();

    if (!token) throw new Error("No token provided");

    try {
        await axios.delete(requestURLs.removeBooking + `?bookingId=${bookingId}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });

        return;
    } catch (err) {
        throw err;
    }
}