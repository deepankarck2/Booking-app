import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from "../../../Context/UserContext";
import { fetchBookingsByBookerRequest } from "../../../utils/requests/fetchBookingsByBooker";
import { removeBookingRequest } from '../../../utils/requests/removeBooking';

export default function UserBookings(props) {
    const { user, setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [userBookings, setUserBookings] = useState([]);

    useEffect(() => {
        const getUserBookings = async () => {
            // fetch all bookings made by this user
            const bookings = await fetchBookingsByBookerRequest(user.id);
            setUserBookings(bookings);
            setLoading(false);
        }
        getUserBookings();
    }, []);

    async function removeBookingHandler(bookingId) {
        try {
            await removeBookingRequest(bookingId);
        } catch (err) {
            console.error(err);
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <button onClick={() => props.setDashboardPages(0)}>Go Back</button>
        {userBookings.map((house, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-lg font-bold mb-2">{house.name}</h2>
                <img src={house.image} alt="house-img" className="w-full h-48 object-cover mb-2" />
                <p className="text-gray-800 mb-2">{house.description}</p>
                <p className="text-gray-800 mb-2">Location: {house.location}</p>
                <p className="text-gray-800 mb-2">Price per night: ${house.price}</p>
                <button onClick={() => removeBookingHandler(house.booking_id)}>Remove Booking</button>
            </div>
        ))}
    </div>
}