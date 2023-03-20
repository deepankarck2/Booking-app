import { useRef } from "react";
import { registerRequest } from "../../utils/requests/register";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Register() {
  const navigate = useNavigate();

  const formRefs = {
    usernameRef: useRef(),
    emailRef: useRef(),
    passwordRef: useRef(),
  };

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

  return (
    <div>
      <div className="mt-4 grow flex items-center justify-around">
        <div className="mb-64">
          <h1 className="text-4xl text-center mb-4">Register</h1>
          <form className="  max-w-md mx-auto">
            <input type="text" placeholder="Test" />
            <input type="email" placeholder="your@email.com" />
            <input type="password" placeholder="password" />
            <button className="primary">Register</button>
            <div className="text-center py-2 text-gray-500">
              Already a member?{" "}
              <Link className="underline text-black" to={"/login"}>
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
      <h1>Register</h1>

      <form onSubmit={submitHandler}>
        <label>Username</label>
        <br></br>
        <input ref={formRefs.usernameRef} />
        <br></br>

        <label>Email</label>
        <br></br>
        <input ref={formRefs.emailRef} type="email" />
        <br></br>

        <label>Password</label>
        <br></br>
        <input ref={formRefs.passwordRef} type="password" />
        <br></br>

        <button>Submit</button>
      </form>
    </div>
  );
}
