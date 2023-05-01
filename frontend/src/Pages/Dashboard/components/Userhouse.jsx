import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from "../../../Context/UserContext";
import { fetchHousesByOwnerIdRequest } from '../../../utils/requests/fetchHousesByOwnerId';

export default function Userhouse(props) {

  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [userCreatedHouses, setUserCreatedHouses] = useState([]);

  useEffect(() => {
    const auth = async () => {
      try {
        // fetch user created houses if any
        const houses = await fetchHousesByOwnerIdRequest(user.id);
        setUserCreatedHouses(houses);
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <button onClick={() => props.setDashboardPages(0)}>Go Back</button>
      {userCreatedHouses.map((house, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-bold mb-2">{house.name}</h2>
          <img src={house.image} alt="house-img" className="w-full h-48 object-cover mb-2" />
          <p className="text-gray-800 mb-2">{house.description}</p>
          <p className="text-gray-800 mb-2">Location: {house.location}</p>
          <p className="text-gray-800 mb-2">Price per night: ${house.price}</p>
        </div>
      ))}
    </div>
  )
}