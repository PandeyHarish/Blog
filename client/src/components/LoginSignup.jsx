import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../context/LoginContext";

const LoginSignup = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [credentials, setCredentials] = useState([{ username: "", email: "", password: "" }]);
  const { loggedin } = useLogin();

  const host = import.meta.env.VITE_localhost;
  let history = useNavigate();

  const toggleSignup = () => {
    setIsLoginForm(!isLoginForm);
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const login = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier: credentials.identifier, password: credentials.password }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("auth-token", json.authToken);
      loggedin();
      history("/");
     
     
      // showAlert("Login successful", "success");
    } else {
      // showAlert("Please check your credentials", "error");
    }
  };

  const signup = async (e) => {
    e.preventDefault();

    const response = await fetch(`${host}/api/auth/user/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: credentials.email, username: credentials.username, password: credentials.password }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("auth-token", json.authToken);
      history("/");
      alert("user created");
      // showAlert("Login successful", "success");
    } else {
      // showAlert("Please check your credentials", "error");
    }
  };

  return (
    <div className="grid place-items-center m-4 h-[250px] mt-40 sm:m-0 sm:h-screen text-black">
      <div className="bg-white rounded-lg shadow-xl w-full sm:w-2/3 lg:w-1/2 xl:w-1/3 p-8">
        <div className="flex justify-center mb-8">
          <h1 className={`text-3xl font-bold text-center text-black w-full transition-colors duration-500 ease-in-out`}>
            {isLoginForm ? "Login" : "Signup"}
          </h1>
        </div>
        <div className="flex justify-center">
          <div className="w-full transition-opacity duration-500">
            {isLoginForm ? (
              <div>
                {/* Login Form */}
                <form onSubmit={login}>
                  <div className="mb-4">
                    <input
                      type="text"
                      name="identifier"
                      placeholder="Username or Email Address"
                      className="w-full px-4 py-2 border-b border-gray-400 focus:outline-none focus:border-blue-500"
                      required
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-6">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="w-full px-4 py-2 border-b border-gray-400 focus:outline-none focus:border-blue-500"
                      required
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between items-center">
                      <label htmlFor="remember" className="flex items-center text-gray-700">
                        <input type="checkbox" id="remember" className="mr-2" />
                        Remember me
                      </label>
                      <a href="#" className="text-blue-500 hover:underline">
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="mb-2">
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" type="submit">
                      Login
                    </button>
                  </div>
                  <div className="text-center text-gray-600">
                    <p>
                      Not a member?{" "}
                      <a href="#" onClick={toggleSignup} className="text-blue-500 hover:underline">
                        Signup now
                      </a>
                    </p>
                  </div>
                </form>
                {/* End of Login Form */}
              </div>
            ) : (
              <div>
                {/* Signup Form */}
                <form onSubmit={signup}>
                  <div className="mb-4">
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      className="w-full px-4 py-2 border-b border-gray-400 focus:outline-none focus:border-blue-500"
                      required
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="text"
                      name="email"
                      placeholder="Email Address"
                      className="w-full px-4 py-2 border-b border-gray-400 focus:outline-none focus:border-blue-500"
                      required
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="w-full px-4 py-2 border-b border-gray-400 focus:outline-none focus:border-blue-500"
                      required
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-6">
                    <input
                      type="password"
                      placeholder="Confirm password"
                      className="w-full px-4 py-2 border-b border-gray-400 focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" type="submit">
                      Signup
                    </button>
                  </div>
                  <div className="text-center text-gray-700">
                    <p>
                      Already a member?{" "}
                      <a href="#" onClick={toggleSignup} className="text-blue-500 hover:underline">
                        Login here
                      </a>
                    </p>
                  </div>
                </form>
                {/* End of Signup Form */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
