import axios from "axios"
import { deleteToken } from "../storage/deleteToken";
import requestURLs from "./requestURLs.json";

export async function logoutRequest(id) {
    try {
        await axios.post(requestURLs.logout, { id }, { withCredentials: true });

        // delete token
        deleteToken();

    } catch (err) {
        throw err;
    }
}