import axios from "axios";
import requestURLs from "./requestURLs.json";
import { getToken } from "../storage/getToken";
import { setToken } from "../storage/setToken";


export async function authRequest() {
    const token = getToken();

    if (!token) throw new Error("No token provided");

    try {
        const res = await axios.get(requestURLs.auth, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });

        if (res.data.newAccessToken) {
            setToken(res.data.newAccessToken);
        }

        return res.data;
    } catch (err) {
        throw err;
    }
}