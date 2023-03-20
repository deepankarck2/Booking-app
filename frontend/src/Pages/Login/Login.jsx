import { useRef } from "react";
import { loginRequest } from "../../utils/requests/login";
import { Link } from "react-router-dom";
export default function Login() {
  const formRefs = {
    emailRef: useRef(),
    passwordRef: useRef(),
  };

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

  return (
    <div>
      <div className="mt-4 grow flex items-center justify-around">
        <div className="mb-64">
          <h1 className="text-4xl text-center mb-4">Login</h1>
          <form className="  max-w-md mx-auto">
            <input type="email" placeholder="your@email.com" />
            <input type="password" placeholder="password" />
            <button className="primary">Login</button>
            <div className="text-center py-2 text-gray-500">
              Dont have an account yet?{" "}
              <Link className="underline text-black" to={"/register"}>
                Register now
              </Link>
            </div>
          </form>
        </div>
      </div>
      <form onSubmit={submitHandler}>
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
