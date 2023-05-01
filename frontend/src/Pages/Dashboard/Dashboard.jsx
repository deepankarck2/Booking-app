import { useContext, useEffect, useState } from "react"
import { authRequest } from "../../utils/requests/auth";
import { useNavigate } from "react-router-dom";
import { logoutRequest } from "../../utils/requests/logout";
import { UserContext } from "../../Context/UserContext";
import Userhouse from "./components/Userhouse";
import UserBookings from "./components/UserBookings";
import AddHouse from "./components/AddHouse";

const dashboard_pages = {
    dashboard: 0,
    house: 1,
    bookings: 2,
    addHouse: 3
}

export default function Dashboard() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [dashboardPages, setDashboardPages] = useState(dashboard_pages.dashboard);

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

                setLoading(false);
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

    switch (dashboardPages) {
        case dashboard_pages.house:
            return <Userhouse setDashboardPages={setDashboardPages} />

        case dashboard_pages.bookings:
            return <UserBookings setDashboardPages={setDashboardPages} />

        case dashboard_pages.addHouse:
            return <AddHouse setDashboardPages={setDashboardPages} />

        default: break;
    }

    return (<div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Dashboard</h1>
        <div className="w-full max-w-md  p-6 text-center">
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mt-4 ml-4" onClick={() => setDashboardPages(dashboard_pages.house)}> My Houses</button>

        </div>
        <div className="flex justify-center">
            <button
                className="bg-red-500 hover:bg-red-700  text-white font-bold py-2 px-4 rounded-full mt-4 ml-4"
                onClick={() => setDashboardPages(dashboard_pages.addHouse)}
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
                onClick={() => setDashboardPages(dashboard_pages.bookings)}
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