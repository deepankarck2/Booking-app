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
        navigate("/dashboard");
    }

    if (loading) return <div>Authenticating...</div>

    return <div className="max-w-md mx-auto mt-8">
    <h1 className="text-2xl font-bold mb-4">Add a House</h1>
    <form onSubmit={submitHandler} className="space-y-4">
      <div>
        <label htmlFor="name" className="block font-medium mb-2">Name of the place</label>
        <input
          id="name"
          name="name"
          placeholder="Home Sweet Home"
          ref={formRefs.nameRef}
          type="text"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label htmlFor="address" className="block font-medium mb-2">Address</label>
        <input
          id="address"
          name="address"
          ref={formRefs.addressRef}
          type="text"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label htmlFor="description" className="block font-medium mb-2">Description</label>
        <textarea
          id="description"
          name="description"
          ref={formRefs.descRef}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        ></textarea>
      </div>

      <div>
        <label htmlFor="images" className="block font-medium mb-2">Images</label>
        <input
          id="images"
          name="images"
          ref={formRefs.imageRef}
          type="text"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label htmlFor="maxPeople" className="block font-medium mb-2">Maximum number of people</label>
        <input
          id="maxPeople"
          name="maxPeople"
          type="number"
          ref={formRefs.maxPeopleRef}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label htmlFor="amenities" className="block font-medium mb-2">Amenities</label>
        <div className="flex space-x-2 mb-2">
          {amenities.map((item, i) => (
            <div key={i} className="bg-gray-200 px-2 py-1 rounded-md">{item}</div>
          ))}
        </div>
        <div className="flex space-x-2">
          <input
            id="amenities"
            name="amenities"
            ref={formRefs.amenitiesRef}
            type="text"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          /><br></br>
                <button 
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue"
                onClick={() => setAmenities([...amenities, formRefs.amenitiesRef.current.value])} type="button">Add</button>
            </div>

            <div>
                <label>Available Dates</label><br></br>
                <div>
                    {availableDates.map((date, i) => <div key={i}>{date}</div>)}
                </div>
                <input type="date" ref={formRefs.availableDateRef} /><br></br>
                <button 
                 className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue"
                onClick={() => setAvailableDates([...availableDates, formRefs.availableDateRef.current.value])} type="button">Add
               
                </button>
           
            </div>


            <label>Price</label><br></br>
            <input type="number" ref={formRefs.priceRef} className="border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:border-black" />
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Submit
</button>
        </form>
    </div>
}
