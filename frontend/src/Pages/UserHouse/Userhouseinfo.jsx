import React from 'react'

const Userhouseinfo = (props) => {
    console.log(props.house)
    return (
        <div className="p-4 flex justify-center bg-gray-200">
        <div className="max-w-md">
          <h1 className="text-2xl font-bold mb-2">{props.house.name}</h1>
          <div className="mb-2 font-bold text-xl">{props.house.location}</div>
          <img className="mb-4 rounded-lg shadow-md" src={props.house.image} alt={props.house.name} />
          <p className="font-bold text-xl mb-2"> {props.house.desc}</p>
          <h1 className="mb-2 font-bold">Amenities:</h1>
          <ul className="list-disc list-inside mb-2">
            {props.house.amenities.map((amenity, index) => (
              <li key={index} className="text-gray-600">
                {amenity}
              </li>
            ))}
          </ul>
          <div className="font-bold text-xl-600 mb-2">Created At: {props.house.created_at.substring(0, 10)}</div>
          <div className="text-lg font-bold">Price: ${props.house.price}</div>
          <div className="mb-2 font-bold">Available Dates:</div>
          <div className="grid grid-cols-2 gap-2">
            {props.house.available_dates.map((date, index) => (
              <div key={index} className="text-gray-600">
                {new Date(date).toDateString()}
              </div>
            ))}
          </div>
          <div className="text-gray-600 font-bold text-xl mb-2">Max People: {props.house.max_people}</div>
        </div>
      </div>
      );
      
}

export default Userhouseinfo