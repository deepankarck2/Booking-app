import { addBookingRequest } from "../../../utils/requests/addBooking";
import { useNavigate } from "react-router-dom";

export default function Modal(props) {
    const navigate = useNavigate();

    const house = props.house || {};
    const user = props.user || {};

    async function submitHandler() {
        console.log(house);
        try {
            await addBookingRequest({
                house_id: house._id,
                owner_id: house.ownerId,
                startDate: house.available_dates[0],
                endDate: house.available_dates[house.available_dates.length - 1],
            }, user.id);

            navigate("/dashboard");
        } catch (err) {
            console.log(err);
        }
    }

    return <div>
        <div>{JSON.stringify(house)}</div>
        <button onClick={submitHandler}>Confirm Booking</button>
        <button onClick={() => props.setBookingMode(false)}>Cancel</button>
    </div>
}