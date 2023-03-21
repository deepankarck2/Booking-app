import axios from "axios";
import requestURLs from "./requestURLs.json";
import { getToken } from "../storage/getToken";

export async function authRequest() {
    const token = getToken();

    if (!token) throw new Error("No token provided");

    try {
        const res = await axios.get(requestURLs.auth, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });

        console.log(res);

    } catch (err) {
        throw err;
    }
}