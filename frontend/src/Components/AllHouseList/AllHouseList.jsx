import { useContext, useEffect, useState } from "react"
import { getAllHousesRequest } from "../../utils/requests/getAllHouses";
import { UserContext } from "../../Context/UserContext";
import { authRequest } from "../../utils/requests/auth";

export default function AllHouseList() {
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

    async function bookHandler() {

    }

    if (loading) {
        return <div>Loading...</div>
    }

    return <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {houses.map((house, i) => (
      <div key={i} class="bg-white rounded-lg shadow-md p-4">
        <h2 class="text-lg font-bold mb-2">{house.name}</h2>
        <img src={house.image} alt="house-img" class="w-full h-48 object-cover mb-2" />
        <p class="text-gray-800 mb-2">{house.description}</p>
        <p class="text-gray-800 mb-2">Location: {house.location}</p>
        <p class="text-gray-800 mb-2">Price per night: ${house.price}</p>
        {user.email && user.username ? (
          <button onClick={bookHandler} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-2">
            Book
          </button>
        ) : (
          <div class="text-red-600 mt-2">You need to login to place a booking</div>
        )}
      </div>
    ))}
  </div>
}
