import { useRef } from "react";
import { loginRequest } from "../../utils/requests/login";

export default function Login() {
    const formRefs = {
        emailRef: useRef(),
        passwordRef: useRef(),
    }

    async function submitHandler(e) {
        e.preventDefault();

        const email = formRefs.emailRef.current.value;
        const password = formRefs.passwordRef.current.value;

        if (!email || !password) return;

        try {
            await loginRequest(email, password);
            console.log(`success`);

        } catch (err) {
            console.log(err);
            return;
        }
    }

    return <div>
        <form onSubmit={submitHandler}>
            <label>Email</label><br></br>
            <input ref={formRefs.emailRef} type="email" /><br></br>

            <label>Password</label><br></br>
            <input ref={formRefs.passwordRef} type="password" /><br></br>

            <button>Submit</button>
        </form>
    </div>
}