import React from 'react'

const Bookingplaceinfo = ( props) => {
  console.log(props)
  return (  
    <div className="p-4 flex justify-center bg-gray-200">
    <div className=" max-w-md">
  <h1 className="text-2xl font-bold mb-2">{props.house.name}</h1>
  <div className="flex items-center text-gray-600 mb-2">
    <svg
      className="w-4 h-4 fill-current mr-1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        className="heroicon-location"
        d="M12 2C6.48 2 2 6.48 2 12c0 5.523 4.48 10 10 10s10-4.477 10-10c0-5.52-4.48-10-10-10zm0 18c-4.411 0-8-3.589-8-8 0-4.41 3.589-8 8-8s8 3.59 8 8c0 4.411-3.589 8-8 8zm.707-14.586a1 1 0 0 1 1.414 0l4.242 4.243a1 1 0 0 1-1.415 1.414L12 7.415 7.464 11.95a1 1 0 0 1-1.415-1.415l4.243-4.242z"
      />
    </svg>
    <span className="mr-1">{props.house.location}</span>
  </div>
  <img
    src={props.house.image}
    alt={props.house.name}
    className="mb-4 rounded-lg shadow-md w-full"
  />
  <div className="flex justify-between mb-2">
    <div className="text-lg font-bold">${props.house.price}</div>
    <div className="text-sm text-gray-600">Max People: {props.house.max_people}</div>
  </div>
  <div className="mb-4">
    <h2 className="text-xl font-bold mb-2">Amenities</h2>
    <ul className="list-disc list-inside">
      {props.house.amenities.map((amenity, index) => (
        <li key={index} className="text-gray-600">
          {amenity}
        </li>
      ))}
    </ul>
  </div>
  <div className="mb-4">
    <p className="text-gray-600 text-xl font-bold">{props.house.desc}</p>
  </div>
  <div className="flex justify-between">
  <div className="text-gray-600">
    Check-in Date: {props.house.checkInDate.substring(0, 10)}
  </div>
  <div className="text-gray-600">
    Check-out Date: {props.house.checkOutDate.substring(0, 10)}
  </div>
</div>
</div>
</div>
  )
}

export default Bookingplaceinfo