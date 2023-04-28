export default function House(props) {
    return <div key={props.house._id} className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-bold mb-2">{props.house.name}</h2>
        <img src={props.house.image} alt="house-img" className="w-full h-48 object-cover mb-2" />
        <p className="text-gray-800 mb-2">{props.house.description}</p>
        <p className="text-gray-800 mb-2">Location: {props.house.location}</p>
        <p className="text-gray-800 mb-2">Price per night: ${props.house.price}</p>
        {props.user.email && props.user.username ? (
            <button onClick={() => props.bookHandler(props.house)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-2">
                Book
            </button>
        ) : (
            <div className="text-red-600 mt-2">You need to login to place a booking</div>
        )}
    </div>
}