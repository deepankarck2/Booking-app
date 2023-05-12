import axios from "axios";
import { getToken } from "../storage/getToken";
import requestURLs from "./requestURLs.json";

export async function addMoneyRequest(userId, amount) {
    const token = getToken();
    if (!token) throw new Error("No token provided");

    try {
        await axios.post(requestURLs.addMoney, {
            userId, amount
        }, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        })
    } catch (err) {
        throw err;
    }
}