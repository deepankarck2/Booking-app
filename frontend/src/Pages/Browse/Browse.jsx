import { useContext, useEffect, useState } from "react"
import { getAllHousesRequest } from "../../utils/requests/getAllHouses";
import { UserContext } from "../../Context/UserContext";
import { authRequest } from "../../utils/requests/auth";
import { addBookingRequest } from "../../utils/requests/addBooking";
import { useNavigate } from "react-router-dom";
import House from "./components/House";

export default function Browse() {
    const navigate = useNavigate();
    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        const helper = async () => {
            try {
                // authenticate user
                const userData = await authRequest();
                setUser({
                    id: userData.id,
                    username: userData.username,
                    email: userData.email,
                });
            } catch (err) {
                setUser({});
                console.log(err);
            } finally {
                const houses = await getAllHousesRequest();
                setHouses(houses);
                setLoading(false);
            }
        }

        helper();
    }, [setUser]);

    async function bookHandler(house) {
        try {
            await addBookingRequest({
                house_id: house._id,
                owner_id: house.ownerId,
                startDate: house.available_dates[0],
                endDate: house.available_dates[house.available_dates.length - 1],
            }, user.id);

            navigate("/dashboard");
        } catch (err) {
            console.log(err);
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return <div>
        <h1>Browse</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {houses.map((house) => <House house={house} user={user} key={house._id} />)}
        </div>
    </div>
}