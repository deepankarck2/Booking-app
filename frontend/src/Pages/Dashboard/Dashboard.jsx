import { useEffect } from "react"
import { authRequest } from "../../utils/requests/auth";
import { useNavigate } from "react-router-dom";
import { logoutRequest } from "../../utils/requests/logout";

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

    async function logoutHandler(e) {
        try {
            await logoutRequest(localStorage.getItem('id'));
            navigate("/login");

        } catch (err) {
            console.log(err);
        }
    }

    return <div>
        <h1>Dashboard</h1>
        <button onClick={logoutHandler}>Logout</button>
    </div>
}