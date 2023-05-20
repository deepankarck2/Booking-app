import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from "../../Context/UserContext";
import { fetchHousesByOwnerIdRequest } from '../../utils/requests/fetchHousesByOwnerId';
import { removeHouseRequest } from '../../utils/requests/removeHouse';
import { authRequest } from "../../utils/requests/auth";
import Userhouseinfo from './Userhouseinfo';

export default function Userhouse() {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [userCreatedHouses, setUserCreatedHouses] = useState([]);
  const [showInfoMode, setShowInfoMode] = useState(false);
    const [selectedHouse, setSelectedHouse] = useState({});
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
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    auth();
  }, [])

  async function removeHouseHandler(houseId) {
    try {
      await removeHouseRequest(houseId);
      alert("House removed successfully");
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }
  const info = (house) => {
    setShowInfoMode(true)
    setSelectedHouse(house)
    console.log(house)
}

if(showInfoMode) {
  return <Userhouseinfo house = {selectedHouse} />
}
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {userCreatedHouses.length === 0 ? <div>No created house listings</div> : userCreatedHouses.map((house, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-bold mb-2">{house.name}</h2>
          <img src={house.image} alt="house-img" className="w-full h-48 object-cover mb-2" />
          <p className="text-gray-800 mb-2">{house.description}</p>
          <p className="text-gray-800 mb-2">Location: {house.location}</p>
          <p className="text-gray-800 mb-2">Price per night: ${house.price}</p>
          <div className="flex justify-between mt-4">
 <button
    onClick={() => removeHouseHandler(house._id)}
    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-2"
  >
    Remove Housing
  </button>
  <button onClick={() => info(house)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
    More info
  </button>
</div>
        </div>
      ))}
    </div>
  )
}