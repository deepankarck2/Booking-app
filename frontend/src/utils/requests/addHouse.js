import axios from "axios";
import { getToken } from "../storage/getToken";
import requestURLs from "./requestURLs.json";

export async function addHouseRequest(reqObj) {
    const token = getToken();

    if (!token) throw new Error("No token provided");

    try {
        await axios.post(requestURLs.addHouse, {
            name: reqObj.name,
            location: reqObj.address,
            desc: reqObj.desc,
            image: reqObj.image,
            max_people: reqObj.maxPeople,
            amenities: reqObj.amenities,
            available_dates: reqObj.availableDates,
            price: reqObj.price,
            ownerId: reqObj.ownerId,
        }, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });
    } catch (err) {
        throw err;
    }
}