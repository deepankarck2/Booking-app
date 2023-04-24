import React, {useContext,useState,useEffect} from 'react'
import { UserContext } from "./Context/UserContext";
import { fetchHousesByOwnerIdRequest } from './utils/requests/fetchHousesByOwnerId';

const Userhouse = () => {
    const { user, setUser } = useContext(UserContext);
    console.log(user.id);
    const [loading, setLoading] = useState(true);
    const [userCreatedHouses, setUserCreatedHouses] = useState([]);
    useEffect(() => {
        const auth = async () => {
            try {
               
                
                // fetch user created houses if any
                const houses = await fetchHousesByOwnerIdRequest(user.id);
                setUserCreatedHouses(houses);
                console.log(houses);
                setLoading(false);
            } catch (err) {
                console.log(err);
               
            }
        }

        auth();
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }
  return (
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {userCreatedHouses.map((house, i) => (
      <div key={i} class="bg-white rounded-lg shadow-md p-4">
        <h2 class="text-lg font-bold mb-2">{house.name}</h2>
        <img src={house.image} alt="house-img" class="w-full h-48 object-cover mb-2" />
        <p class="text-gray-800 mb-2">{house.description}</p>
        <p class="text-gray-800 mb-2">Location: {house.location}</p>
        <p class="text-gray-800 mb-2">Price per night: ${house.price}</p>
      </div>
    ))}
  </div>
  )
}

export default Userhouse