import { useNavigate } from "react-router-dom"

export default function Home() {
    const navigate = useNavigate();

    return <div>
        <h1>Home</h1>
        <button onClick={() => navigate("/browse")}>Browse</button>
    </div>
}
