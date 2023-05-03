import { useEffect, useState, useContext, useRef } from "react"
import { authRequest } from "../../utils/requests/auth";
import { UserContext } from "../../Context/UserContext";
import { getMoneyRequest } from "../../utils/requests/getMoney";
import { addMoneyRequest } from "../../utils/requests/addMoney";

export default function AddMoney() {
    const [isLoading, setLoading] = useState(true);
    const { user, setUser } = useContext(UserContext);
    const [amount, setAmount] = useState(null);
    const inputRef = useRef();

    useEffect(() => {
        const auth = async () => {
            try {
                // authenticate user
                const userData = await authRequest();
                setUser({
                    id: userData.id,
                    username: userData.username,
                    email: userData.email,
                });

                const amount = await getMoneyRequest(userData.id);

                setAmount(amount)
                setLoading(false);
            } catch (err) {
                console.error(err);
            }
        }

        auth();
    }, []);

    async function submitHandler(e) {
        e.preventDefault();

        const amount_str = inputRef.current.value;

        const amount = parseFloat(amount_str);

        if (amount <= 0) return;

        if (isNaN(amount)) return;

        try {
            await addMoneyRequest(user.id, amount);
            console.log(`success`);
        } catch (err) {
            console.error(err);
        }
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return <div>
        <h1>Deposit Money</h1>
        <div>Current Amount: ${amount}</div>
        <form onSubmit={submitHandler}>
            <label>Deposit Money</label><br></br>
            <input ref={inputRef} />
            <button>Deposit</button>
        </form>
    </div>
}