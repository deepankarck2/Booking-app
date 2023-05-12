import axios from "axios";
import { getToken } from "../storage/getToken";
import requestURLs from "./requestURLs.json";

export async function getMoneyRequest(userId) {
    const token = getToken();
    if (!token) throw new Error("No token provided");

    try {
        const res = await axios.get(requestURLs.getMoney + `?userId=${userId}`);
        if (!res || !res.data) throw new Error("No data available");

        return res.data.amount;
    } catch (err) {
        throw err;
    }
}