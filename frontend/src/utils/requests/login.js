import axios from "axios";
import requestURLs from "./requestURLs.json";

export async function loginRequest(email, password) {
    try {
        const res = await axios.post(requestURLs.login, { email, password }, {
            withCredentials: true,
        });

        const data = res.data;
        if (!data) throw new Error("No data received");

        // put access token into local storage
        localStorage.setItem("token", data.accessToken);

        localStorage.setItem("id", data.id);
    } catch (err) {
        throw err;
    }
}