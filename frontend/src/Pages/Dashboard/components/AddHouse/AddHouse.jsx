import { useContext, useEffect, useState, useRef } from "react"
import { authRequest } from "../../../../utils/requests/auth";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../../Context/UserContext";
import { addHouseRequest } from "../../../../utils/requests/addHouse";

export default function AddHouse() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const formRefs = {
        nameRef: useRef(),
        addressRef: useRef(),
        descRef: useRef(),
        imageRef: useRef(),
        maxPeopleRef: useRef(),
        amenitiesRef: useRef(),
        availableDateRef: useRef(),
        priceRef: useRef(),
    }

    const [amenities, setAmenities] = useState([]);
    const [availableDates, setAvailableDates] = useState([]);

    useEffect(() => {
        if (!user) return navigate("/login");

        const auth = async () => {
            try {
                const userData = await authRequest();
                setUser({
                    id: userData.id,
                    username: userData.username,
                    email: userData.email,
                });

                setLoading(false);
            } catch (err) {
                // no authentication provided
                navigate("/login");
            }
        };
        auth();
    }, []);

    async function submitHandler(e) {
        e.preventDefault();

        const name = formRefs.nameRef.current.value;
        const address = formRefs.addressRef.current.value;
        const desc = formRefs.descRef.current.value;
        const image = formRefs.imageRef.current.value;
        const maxPeople = formRefs.maxPeopleRef.current.value;
        const price = formRefs.priceRef.current.value;

        try {
            await addHouseRequest({
                name, address, desc, image, maxPeople, price,
                amenities, availableDates,
                ownerId: user.id,
            });

        } catch (err) {
            console.error(err);
        }
    }

    if (loading) return <div>Authenticating...</div>

    return <div>
        <h1>Add a House</h1>
        <form onSubmit={submitHandler}>
            <label>Name of the place</label><br></br>
            <input placeholder="Home Sweet Home" ref={formRefs.nameRef} type="text" /><br></br>

            <label>Address</label><br></br>
            <input ref={formRefs.addressRef} type="text" /><br></br>

            <label>Description</label><br></br>
            <textarea ref={formRefs.descRef} /><br></br>

            <label>Images</label><br></br>
            <input ref={formRefs.imageRef} type="text" /><br></br>

            <label>Maximum number of people</label><br></br>
            <input type="number" ref={formRefs.maxPeopleRef} /><br></br>

            <div>
                <label>Amenities</label><br></br>
                <div>
                    {amenities.map((item, i) => <div key={i}>{item}</div>)}
                </div>
                <input ref={formRefs.amenitiesRef} type="text" /><br></br>
                <button onClick={() => setAmenities([...amenities, formRefs.amenitiesRef.current.value])} type="button">Add</button>
            </div>

            <div>
                <label>Available Dates</label><br></br>
                <div>
                    {availableDates.map((date, i) => <div key={i}>{date}</div>)}
                </div>
                <input type="date" ref={formRefs.availableDateRef} /><br></br>
                <button onClick={() => setAvailableDates([...availableDates, formRefs.availableDateRef.current.value])} type="button">Add</button>
            </div>


            <label>Price</label><br></br>
            <input type="number" ref={formRefs.priceRef} /><br></br>
            <button>Submit</button>
        </form>
    </div>
}
