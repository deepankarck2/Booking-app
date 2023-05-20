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
            alert(`Successfully added $${amount} dollars`);
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Deposit Money</h1>
    <div class="mb-4">Current Amount: ${amount}</div>
    <form class="flex items-center" onSubmit={submitHandler}>
        <label class="mr-2">Deposit Money</label>
        <input class="border border-gray-300 px-2 py-1 rounded-md" ref={inputRef} />
        <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md ml-2">Deposit</button>
    </form>
</div>
}