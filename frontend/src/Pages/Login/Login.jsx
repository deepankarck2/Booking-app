import { useRef, useState } from "react";
import { loginRequest } from "../../utils/requests/login";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const formRefs = {
    emailRef: useRef(),
    passwordRef: useRef(),
  };

  async function submitHandler(e) {
    e.preventDefault();

    setErrorMessage("");

    const email = formRefs.emailRef.current.value;
    const password = formRefs.passwordRef.current.value;

    if (!email || !password) return;

    try {
      await loginRequest(email, password);
      navigate("/dashboard");
    } catch (err) {
      if (err.response.status === 500) {
        setErrorMessage("Internal Server Error, please try again later");
      } else setErrorMessage("Invalid email or password");
    }
  }

  return (
    <div>
      <div className="mt-4 grow flex items-center justify-around">
        <div className="mb-64">
          {errorMessage !== "" && <div className="bg-orange-400 text-center text-red-600 text-xl">{errorMessage}</div>}
          <h1 className="text-4xl text-center mb-4">Login</h1>
          <form className="  max-w-md mx-auto" onSubmit={submitHandler}>
            <input type="email" placeholder="example@example.com" id="login-email" ref={formRefs.emailRef} />
            <input type="password" placeholder="password" id="login-password" ref={formRefs.passwordRef} />
            <button className="primary" id="login-submit">Login</button>
            <div className="text-center py-2 text-gray-500">
              Don't have an account yet?{" "}
              <Link className="underline text-black" to={"/register"}>
                Register now
              </Link>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
