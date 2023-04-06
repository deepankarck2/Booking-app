import { useContext, useEffect, useState } from "react"
import { authRequest } from "../../utils/requests/auth";
import { useNavigate } from "react-router-dom";
import { logoutRequest } from "../../utils/requests/logout";
import { UserContext } from "../../Context/UserContext";

export default function Dashboard() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
                console.log(err);
                navigate("/login");
            }
        }

        auth();
    }, [navigate])

    async function logoutHandler() {
        try {
            await logoutRequest(user.id);
            navigate("/login");

        } catch (err) {
            console.log(err);
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return <div>
        <h1>Dashboard</h1>
        <button onClick={() => navigate("/add-house")}>Add a house</button>
        <br></br>
        <button onClick={logoutHandler}>Logout</button>
    </div>
}