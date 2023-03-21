import { useEffect } from "react"
import { authRequest } from "../../utils/requests/auth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const auth = async () => {
            try {
                await authRequest();
            } catch (err) {
                console.log(err);
                navigate("/login");
            }
        }

        auth();
    }, [navigate])

    return <div>
        <h1>Dashboard</h1>
    </div>
}