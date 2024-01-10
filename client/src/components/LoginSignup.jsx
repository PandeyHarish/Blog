import { useState } from "react";

const LoginSignup = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  // const switchToLogin = () => {
  //   setIsLoginForm(true);
  // };

  // const switchToSignup = () => {
  //   setIsLoginForm(false);
  // };

  const toggleSignup = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <div className="grid place-items-center h-screen bg-gradient-to-r from-blue-900 to-blue-400">
      <div className="bg-white rounded-lg shadow-xl w-full sm:w-2/3 lg:w-1/2 xl:w-1/3 p-8">
        <div className="flex justify-center mb-8">
          <h1 className="text-3xl font-bold text-center w-full transition-colors duration-500 ease-in-out">
            {isLoginForm ? "Login" : "Signup"}
          </h1>
        </div>
        {/* <div className="flex items-center justify-center mb-6 space-x-4">
          <button
            className={`${
              isLoginForm ? "text-white bg-gradient-to-r from-blue-900 to-blue-400" : "text-blue-500 bg-white hover:bg-gray-200"
            } px-4 py-2 rounded transition duration-300`}
            onClick={switchToLogin}
          >
            Login
          </button>
          <button
            className={`${
              !isLoginForm ? "text-white bg-gradient-to-r from-blue-900 to-blue-400" : "text-blue-500 bg-white hover:bg-gray-200"
            } px-4 py-2 rounded transition duration-300`}
            onClick={switchToSignup}
          >
            Signup
          </button>
        </div> */}
        <div className="flex justify-center">
          <div className="w-full transition-opacity duration-500">
            {isLoginForm ? (
              <div>
                {/* Login Form */}
                <form>
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Username or Email Address"
                      className="w-full px-4 py-2 border-b border-gray-400 focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full px-4 py-2 border-b border-gray-400 focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between items-center">
                      <label htmlFor="remember" className="flex items-center">
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
                  <div className="text-center">
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
                <form>
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Username"
                      className="w-full px-4 py-2 border-b border-gray-400 focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Email Address"
                      className="w-full px-4 py-2 border-b border-gray-400 focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full px-4 py-2 border-b border-gray-400 focus:outline-none focus:border-blue-500"
                      required
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
                  <div className="text-center">
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
