import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from "../../Context/UserContext";
import { fetchBookingsByBookerRequest } from "../../utils/requests/fetchBookingsByBooker";
import { removeBookingRequest } from '../../utils/requests/removeBooking';
import { authRequest } from "../../utils/requests/auth";

export default function UserBookings() {
    const { user, setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [userBookings, setUserBookings] = useState([]);

    useEffect(() => {
        const getUserBookings = async () => {
            // authenticate user
            const userData = await authRequest();
            setUser({
                id: userData.id,
                username: userData.username,
                email: userData.email,
            });

            // fetch all bookings made by this user
            const bookings = await fetchBookingsByBookerRequest(userData.id);
            setUserBookings(bookings);
            setLoading(false);
        }
        getUserBookings();
    }, []);

    async function removeBookingHandler(bookingId) {
        try {
            await removeBookingRequest(bookingId);
            alert("Booking removed successfully");
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {userBookings.length === 0 ? <div>No booked bookings</div> : userBookings.map((house, i) => (
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