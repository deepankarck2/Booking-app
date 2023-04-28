import { useContext, useEffect, useState } from "react"
import { authRequest } from "../../utils/requests/auth";
import { useNavigate } from "react-router-dom";
import { logoutRequest } from "../../utils/requests/logout";
import { UserContext } from "../../Context/UserContext";
import { fetchHousesByOwnerIdRequest } from "../../utils/requests/fetchHousesByOwnerId";
import { fetchBookingsByBookerRequest } from "../../utils/requests/fetchBookingsByBooker";
import { Link } from "react-router-dom";

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
                console.log(houses);
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
            window.location.reload();
            navigate("/login");


        } catch (err) {
            console.log(err);
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (<div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Dashboard</h1>
        <div className="w-full max-w-md  p-6 text-center">
            <Link to="/userhouse" path>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mt-4 ml-4">
                    My Houses
                </button>

            </Link>
            <hr className="my-4" />
            {/* Add your content here */}
        </div>
        <div className="flex justify-center">
            <button
                className="bg-red-500 hover:bg-red-700  text-white font-bold py-2 px-4 rounded-full mt-4 ml-4"
                onClick={() => navigate("/add-house")}
            >
                Add a house
            </button>
            <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mt-4 ml-4"
                onClick={() => navigate("/browse")}
            >
                Browse Houses
            </button>
            <button
                className="bg-red-500 hover:bg-red-700  text-white font-bold py-2 px-4 rounded-full mt-4 ml-4"

            >
                My Bookings
            </button>
            <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mt-4 ml-4"
                onClick={logoutHandler}
            >
                Logout
            </button>
        </div>
    </div>
    );
}