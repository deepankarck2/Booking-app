import { useNavigate } from "react-router-dom"
// import logo from "../Home/Images/airbnb-banner.jpeg"


export default function Home() {
    const navigate = useNavigate();

    return (
        <div style={{ paddingTop: '10px' }}>
            <div className="w-full bg-cover bg-center" style={{ height: '32rem', backgroundImage: `url("https://media01.findrentals.com/rentals/9135/153059/banner-elk-home-boulder-sky-river-run-c5290294-full.jpeg")` }}>
                <div className="flex items-center justify-center h-full w-full bg-gray-900 bg-opacity-50">
                    <div className="text-center">
                        <h1 className="text-white text-2xl font-semibold uppercase md:text-3xl">Book your first house..</h1>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                            onClick={() => navigate("/browse")}
                        >
                            Browse
                        </button>
                    </div>
                </div>
            </div>

        </div>

    );
}