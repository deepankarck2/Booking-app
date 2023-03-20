import axios from "axios";
import requestURLs from "./requestURLs.json";

export async function registerRequest(username, email, password) {
    try {
        await axios.post(requestURLs.register, { username, email, password });
    } catch (err) {
        throw err;
    }
}