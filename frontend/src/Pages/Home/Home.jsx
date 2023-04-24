import { useNavigate } from "react-router-dom"

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Home</h1>
            <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={() => navigate("/browse")}
            >
                Browse
            </button>
        </div>
    );
}