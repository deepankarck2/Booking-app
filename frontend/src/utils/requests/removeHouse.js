import axios from "axios";
import requestURLs from "./requestURLs.json";
import { getToken } from "../storage/getToken";

export async function removeHouseRequest(houseId) {
    if (!houseId) throw new Error("HouseId is required");

    const token = getToken();

    if (!token) throw new Error("No token provided");

    try {
        await axios.delete(requestURLs.removeHouse + `?houseId=${houseId}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });
    } catch (err) {
        throw err;
    }
}