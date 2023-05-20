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

    return (
        <div className="p-4 flex justify-center bg-gray-200 mt-3">
        <div className="max-w-md">
        <div className="mb-2 text-lg font-bold">{house.name}</div>
        
        <div className="mb-2 font-bold">
            {house.location}</div>
        <img src={house.image} alt="house-img" className="mb-4 rounded-lg shadow-md" style={{ width: "100%" }} />
          <div className="mb-2 font-bold text-xl">{house.desc}</div>
          <div className="mb-2 font-bold">Max People: {house.max_people}</div>
          <div className="mb-2 font-bold">Amenities:</div>
          <ul className="list-disc ml-6 mb-2">
            {house.amenities.map((amenity, i) => (
              <li key={i}>{amenity}</li>
            ))}
          </ul>
          <div className="mb-2 font-bold">Price: ${house.price}</div>
          <div className="mb-2 font-bold">Available Dates:</div>
          <div className="mb-4">
            {house.available_dates.map((date, i) => (
              <div key={i} className="mb-2 text-gray-600">
                {new Date(date).toDateString()}
              </div>
            ))}
          </div>
          <label className="mb-2">Book Start Date</label>
          <br />
          <input
            type="date"
            ref={bookStartDateRef}
            className="border border-gray-300 px-2 py-1 rounded-md mb-2"
          />
          <br />
          <label className="mb-2">Book End Date</label>
          <br />
          <input
            type="date"
            ref={bookEndDateRef}
            className="border border-gray-300 px-2 py-1 rounded-md mb-2"
          />
          <br />
          <button
            onClick={() => props.setBookingMode(false)}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            onClick={submitHandler}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Confirm Booking
          </button>
        </div>
      </div>
      );
      
}