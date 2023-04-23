import { useContext, useEffect, useState } from "react"
import { authRequest } from "../../utils/requests/auth";
import { useNavigate } from "react-router-dom";
import { logoutRequest } from "../../utils/requests/logout";
import { UserContext } from "../../Context/UserContext";
import { fetchHousesByOwnerIdRequest } from "../../utils/requests/fetchHousesByOwnerId";
import { fetchBookingsByBookerRequest } from "../../utils/requests/fetchBookingsByBooker";

export default function Dashboard() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [userCreatedHouses, setUserCreatedHouses] = useState([]);
    const [userBookings, setUserBookings] = useState([]);

    useEffect(() => {
        const auth = async () => {
            try {
                // authenticate user
                const userData = await authRequest();
                setUser({
                    id: userData.id,
                    username: userData.username,
                    email: userData.email,
                });

                // fetch user created houses if any
                const houses = await fetchHousesByOwnerIdRequest(userData.id);
                setUserCreatedHouses(houses);

                // fetch all bookings made by this user
                const bookings = await fetchBookingsByBookerRequest(userData.id);
                setUserBookings(bookings);
                setLoading(false);
                console.log(userData.id);
            } catch (err) {
                console.log(err);
                navigate("/login");
            }
        }

        auth();
    }, [navigate])

    async function logoutHandler() {
        try {
            await logoutRequest(user.id);
            navigate("/login");

        } catch (err) {
            console.log(err);
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return <div>
        <h1>Dashboard</h1>
        <div>Hello, {user.username}</div>
        <div>
            <h2>My Created Listings</h2>
            <hr></hr>
            <div>
                {userCreatedHouses.map((house, i) => {
                    return <div key={i}>{JSON.stringify(house)}</div>
                })}
            </div>
        </div>
        <div>
            <h2>My Bookings</h2>
            <hr></hr>
            <div>
                {userBookings.map((booking, i) => {
                    return <div key={i}>{JSON.stringify(booking)}</div>
                })}
            </div>
        </div>
        <button onClick={() => navigate("/add-house")}>Add a house</button>
        <br></br>
        <button onClick={() => navigate("/browse")}>Browse Houses</button>
        <br></br>
        <button onClick={logoutHandler}>Logout</button>
    </div>
}