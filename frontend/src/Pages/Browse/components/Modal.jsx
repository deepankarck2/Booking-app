import { useRef } from "react";
import { addBookingRequest } from "../../../utils/requests/addBooking";
import { useNavigate } from "react-router-dom";

export default function Modal(props) {
    const navigate = useNavigate();
    const bookStartDateRef = useRef();
    const bookEndDateRef = useRef();


    const house = props.house || {};
    const user = props.user || {};

    async function submitHandler() {
        const startDate = bookStartDateRef.current.value;
        const endDate = bookEndDateRef.current.value;

        // check to make sure start and end dates are valid
        if (new Date(startDate) > new Date(endDate)) {
            alert("The start date cannot come later than end date");
            return;
        }

        if (!house.available_dates.find(d => d === new Date(startDate).toISOString())) {
            alert("cannot find start date");
            return;
        }

        if (!house.available_dates.find(d => d === new Date(endDate).toISOString())) {
            alert("cannot find end date");
            return;
        }

        try {
            await addBookingRequest({
                house_id: house._id,
                owner_id: house.ownerId,
                startDate: startDate,
                endDate: endDate,
                price: house.price,
            }, user.id);

            navigate("/dashboard");
        } catch (err) {
            if (err.response.status === 402) {
                alert("U broke boi lmao");
            }
            console.log(err);
        }
    }

    return <div>
        <img src={house.image} alt="house-img" width={512}></img>
        <div>Name: {house.name}</div>
        <div>Location: {house.location}</div>
        <div>Description: {house.desc}</div>
        <div>Max People: {house.max_people}</div>
        <div>Amenities: [{house.amenities}]</div>
        <div>Price: ${house.price}</div>
        <div>Available Dates</div>
        <div>
            {house.available_dates.map((date, i) => {
                return <div key={i}>{new Date(date).toUTCString()}</div>
            })}
        </div>
        <label>Book Start Date</label><br></br>
        <input type="date" ref={bookStartDateRef} /><br></br>

        <label>Book End Date</label><br></br>
        <input type="date" ref={bookEndDateRef} /><br></br>

        <button onClick={() => props.setBookingMode(false)}>Cancel</button><br></br>
        <button onClick={submitHandler}>Confirm Booking</button>
    </div>
}