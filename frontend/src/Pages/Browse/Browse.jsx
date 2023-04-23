import { useContext, useEffect, useState } from "react"
import { getAllHousesRequest } from "../../utils/requests/getAllHouses";
import { UserContext } from "../../Context/UserContext";
import { authRequest } from "../../utils/requests/auth";
import { addBookingRequest } from "../../utils/requests/addBooking";
import { useNavigate } from "react-router-dom";

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
        {houses.map((house, i) => {
            return <div key={i}>
                <div>{house.name}</div>
                <img src={house.image} alt="house-img" width="256" />
                <div>{JSON.stringify(house)}</div>

                {user.email && user.username ? <button onClick={() => bookHandler(house)}>Book</button> : <div>You need to login to place a booking</div>}

                <br></br>
            </div>
        })}
    </div>
}