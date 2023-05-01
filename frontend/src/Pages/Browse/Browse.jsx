import { useContext, useEffect, useState } from "react"
import { getAllHousesRequest } from "../../utils/requests/getAllHouses";
import { UserContext } from "../../Context/UserContext";
import { authRequest } from "../../utils/requests/auth";
import House from "./components/House";
import Modal from "./components/Modal";

export default function Browse() {
    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, setUser } = useContext(UserContext);
    const [bookingMode, setBookingMode] = useState(false);
    const [selectedHouse, setSelectedHouse] = useState({});

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
        setBookingMode(true);
        setSelectedHouse(house);
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (bookingMode) {
        return <Modal setBookingMode={setBookingMode} house={selectedHouse} user={user} />
    }

    return <div>
        <h1>Browse</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {houses.map((house) => <House house={house} user={user} key={house._id} bookHandler={bookHandler} />)}
        </div>
    </div>
}