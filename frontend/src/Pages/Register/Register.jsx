import { useRef } from "react";
import { registerRequest } from "../../utils/requests/register";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    const formRefs = {
        usernameRef: useRef(),
        emailRef: useRef(),
        passwordRef: useRef(),
    }

    async function submitHandler(e) {
        e.preventDefault();

        const username = formRefs.usernameRef.current.value;
        const email = formRefs.emailRef.current.value;
        const password = formRefs.passwordRef.current.value;

        if (!username || !email || !password) return;

        try {
            await registerRequest(username, email, password);
            console.log(`success`);
            navigate("/login");
        } catch (err) {
            console.log(err);
            return;
        }
    }

    return <div>
        <h1>Register</h1>

        <form onSubmit={submitHandler}>
            <label>Username</label><br></br>
            <input ref={formRefs.usernameRef} /><br></br>

            <label>Email</label><br></br>
            <input ref={formRefs.emailRef} type="email" /><br></br>

            <label>Password</label><br></br>
            <input ref={formRefs.passwordRef} type="password" /><br></br>

            <button>Submit</button>
        </form>
    </div>
}