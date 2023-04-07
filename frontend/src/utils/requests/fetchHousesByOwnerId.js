import axios from "axios";
import requestURLs from "./requestURLs.json";

export async function fetchHousesByOwnerIdRequest(ownerId) {
    try {
        const res = await axios.get(requestURLs.fetchHousesByOwnerId + `?ownerId=${ownerId}`);
        const data = res.data;

        return data.houses || [];
    } catch (err) {
        throw err;
    }
}