import { useRef, useState } from "react";
import { registerRequest } from "../../utils/requests/register";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])[\w!@#$%^&*()\-+=[\]{}|\\:;"'<>,.?\/]{8,}$/

export default function Register() {
  const navigate = useNavigate();
  const [usernameWarningMessage, setUsernameWarningMessage] = useState("");
  const [emailWarningMessage, setEmailWarningMessage] = useState("");
  const [passwordWarningMessage, setPasswordMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const formRefs = {
    usernameRef: useRef(),
    emailRef: useRef(),
    passwordRef: useRef(),
  };

  async function submitHandler(e) {
    e.preventDefault();

    setUsernameWarningMessage("");
    setEmailWarningMessage("");
    setPasswordMessage("");
    setErrorMessage("");

    const username = formRefs.usernameRef.current.value;
    const email = formRefs.emailRef.current.value;
    const password = formRefs.passwordRef.current.value;

    if (!username) {
      setUsernameWarningMessage("Username cannot be empty");
      return;
    }

    if (username.length < 2) {
      setUsernameWarningMessage("Username must be at least 2 characters");
      return;
    }

    if (!email) {
      setEmailWarningMessage("Email cannot be empty");
      return;
    }

    if (!emailRegex.test(email)) {
      setEmailWarningMessage("Please enter a valid email");
      return;
    }

    if (!passwordRegex.test(password)) {
      setPasswordMessage("Password must be at least 8 characters and have at least 1 number");
      return;
    }

    try {
      await registerRequest(username, email, password);
      navigate("/login");
    } catch (err) {
      if (err.response.status === 500) {
        setErrorMessage("Internal Server Error, please try again later");
      }

      else if (err.response.status === 409) {
        setErrorMessage("User already registered");
      }

      else {
        setErrorMessage("Unknown error occurred");
      }
      return;
    }
  }

  return (
    <div>
      <div className="mt-4 grow flex items-center justify-around">
        <div className="mb-64">
          {errorMessage !== "" && <div className="bg-orange-400 text-center text-red-600 text-xl">{errorMessage}</div>}

          <h1 className="text-4xl text-center mb-4">Register</h1>

          <form className="  max-w-md mx-auto" onSubmit={submitHandler}>
            <input type="text" placeholder="username" id="reg-username" ref={formRefs.usernameRef} />
            {usernameWarningMessage !== "" && <div className="text-red-600">{usernameWarningMessage}</div>}
            <input type="email" placeholder="your@email.com" id="reg-email" ref={formRefs.emailRef} />
            {emailWarningMessage !== "" && <div className="text-red-600">{emailWarningMessage}</div>}

            <input type="password" placeholder="password" id="reg-password" ref={formRefs.passwordRef} />
            {passwordWarningMessage !== "" && <div className="text-red-600">{passwordWarningMessage}</div>}

            <button className="primary" id="reg-submit">Register</button>
            <div className="text-center py-2 text-gray-500">
              Already a member?{" "}
              <Link className="underline text-black" to={"/login"}>
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
