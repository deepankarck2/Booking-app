import axios from "axios";
import requestURLs from "./requestURLs.json";

export async function getAllHousesRequest() {
    try {
        const res = await axios.get(requestURLs.getAllHouses);

        if (!res.data) throw new Error("No data provided");

        return res.data.houses || [];

    } catch (err) {
        throw err;
    }
}