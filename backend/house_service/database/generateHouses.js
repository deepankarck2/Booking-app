const { addHouse } = require("./insert");
const { fetchHousesByOwnerId } = require("./fetch");


const dummyHouses = [
    {
        name: "Modern Beach House",
        location: "Malibu, California",
        desc: "This beautiful house is located right on the beach and offers stunning ocean views. It has 4 bedrooms, 3 bathrooms, and a spacious living area. The house is perfect for a family vacation or a weekend getaway with friends.",
        max_people: 8,
        price: 300,
        amenities: ["WiFi", "Air conditioning", "Kitchen", "Parking"],
        available_dates: ["2023-05-15", "2023-05-16", "2023-05-17", "2023-05-18", "2023-05-19"]
    },

    {
        name: "Cozy Mountain Cabin",
        location: "Aspen, Colorado",
        desc: "This charming cabin is nestled in the mountains and surrounded by beautiful scenery. It has 2 bedrooms, 1 bathroom, and a cozy living area with a fireplace. The cabin is perfect for a romantic getaway or a small family vacation.",
        max_people: 4,
        price: 150,
        amenities: ["Fireplace", "Deck", "BBQ grill"],
        available_dates: ["2023-06-01", "2023-06-02", "2023-06-03", "2023-06-04"]
    },

    {
        name: "Luxury City Apartment",
        location: "New York, New York",
        desc: "This stunning apartment is located in the heart of Manhattan and offers breathtaking views of the city. It has 3 bedrooms, 2 bathrooms, and a spacious living area with floor-to-ceiling windows. The apartment is perfect for a luxurious city getaway.",
        max_people: 6,
        price: 150,
        amenities: ["Gym", "Pool", "Concierge", "Security"],
        available_dates: ["2023-07-10", "2023-07-11", "2023-07-12", "2023-07-13", "2023-07-14"]
    },

    {
        name: "Rustic Farmhouse",
        location: "Tuscany, Italy",
        desc: "This charming farmhouse is situated in the rolling hills of Tuscany and offers beautiful views of the countryside. It has 5 bedrooms, 3 bathrooms, and a large outdoor area with a pool and a BBQ. The farmhouse is perfect for a family vacation or a group retreat.",
        max_people: 10,
        price: 100,
        amenities: ["Pool", "BBQ grill", "Outdoor seating", "Garden"],
        available_dates: ["2023-08-20", "2023-08-21", "2023-08-22", "2023-08-23", "2023-08-24"]
    },

    {
        name: "Contemporary City Loft",
        location: "San Francisco, California",
        desc: "This stylish loft is located in the trendy SOMA district of San Francisco and offers easy access to the city's top attractions. It has 2 bedrooms, 2 bathrooms, and a modern open-plan living area. The loft is perfect for a city break with friends or family.",
        max_people: 4,
        price: 200,
        amenities: ["WiFi", "Parking", "Gym"],
        available_dates: ["2023-09-05", "2023-09-06", "2023-09-07", "2023-09-08", "2023-09-09"]
    },

    {
        name: "Secluded Mountain Retreat",
        location: "Banff, Alberta",
        desc: "This cozy cabin is tucked away in the mountains of Banff and offers stunning views of the surrounding wilderness. It has 1 bedroom, 1 bathroom, and a cozy living area with a fireplace. The cabin is perfect for a romantic getaway or a solo retreat.",
        max_people: 2,
        price: 180,
        amenities: ["Fireplace", "Outdoor seating"],
        available_dates: ["2023-10-15", "2023-10-16", "2023-10-17", "2023-10-18"]
    },

    {
        name: "Family-Friendly Beach House",
        location: "Outer Banks, North Carolina",
        desc: "This spacious beach house is located in the Outer Banks and offers easy access to the beach and local attractions. It has 4 bedrooms, 3 bathrooms, and a large living area with plenty of room for the whole family. The house is perfect for a beach vacation with kids.",
        max_people: 8,
        price: 120,
        amenities: ["WiFi", "TV", "Air conditioning", "Beach equipment"],
        available_dates: ["2023-11-10", "2023-11-11", "2023-11-12", "2023-11-13"]
    },

    {
        name: "Historic Colonial Home",
        location: "Charleston, South Carolina",
        desc: "This stunning colonial home is located in the heart of historic Charleston and offers a glimpse into the city's rich history. It has 3 bedrooms, 2 bathrooms, and a spacious living area with antique furnishings. The house is perfect for a cultural getaway with friends or family.",
        max_people: 6,
        price: 190,
        amenities: ["WiFi", "TV", "Air conditioning", "Fully equipped kitchen"],
        available_dates: ["2023-12-05", "2023-12-06", "2023-12-07", "2023-12-08", "2023-12-09"]
    },
]

const sampleImageURL = "https://thumbs.dreamstime.com/z/million-dollar-homes-series-2907160.jpg";

const dummyUserId = '000000000';

async function generateHouses() {
    try {
        const houses = await fetchHousesByOwnerId(dummyUserId);
        if (houses.length > 0) return;
    } catch (err) {
        console.log(`Cannot generate sample houses`);
        throw err;
    }

    dummyHouses.forEach(async (house) => {
        try {
            for (let i = 0; i < house.available_dates.length; i++) {
                house.available_dates[i] = new Date(house.available_dates[i]);
            }

            await addHouse({
                name: house.name,
                location: house.location,
                desc: house.desc,
                image: sampleImageURL,
                max_people: house.max_people,
                amenities: house.amenities,
                available_dates: house.available_dates,
                price: house.price,
                created_at: new Date(),
                ownerId: dummyUserId,
            });
        } catch (err) {
            console.error(`Cannot add house ${house.name}`);
            throw err;
        }
    });
}

module.exports = generateHouses;