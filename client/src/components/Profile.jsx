import { Link } from "react-router-dom";
import ThemeContext from "../context/ThemeContext";
import { useContext, useEffect, useState } from "react";
import test from "./assets/images/test.jpg";
import { useLogin } from "../context/LoginContext";

const Profile = () => {
  const { theme } = useContext(ThemeContext);
  const { isLoggedIn } = useLogin();
  const [user, setUser] = useState([]);

  const token = localStorage.getItem("auth-token");
  const fetchInfo = async () => {
    const res = await fetch("http://127.0.0.1:5000/api/auth/user/getuser", {
      method: "POST",
      headers: { "auth-token": token },
    });
    const parsedData = await res.json();
    setUser(parsedData);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  if (isLoggedIn) {
    return (
      <>
        <div className={`mx-4 sm:mx-8 md:mx-16 lg:mx-32 my-8 p-6 rounded-lg ${theme === "dark" ? "bg-[#344955]" : "bg-white"}`}>
          <div className="flex flex-col sm:flex-row justify-between mb-5">
            <div className="flex flex-wrap items-center mb-4 sm:mb-0">
              <div>
                <h1 className="text-3xl font-bold">{user.username}</h1>
                <h4 className="text-xl">{user.email}</h4>
              </div>
              <div className="bg-indigo-500 my-2 sm:my-0 sm:ml-2 p-4 text-white rounded-md">
                <h1 className="font-bold text-2xl">No. Of Articles 8</h1>
              </div>
            </div>
            <div>
              <Link to={`/new`}>
                <i className="ri-add-circle-fill text-white bg-indigo-700 p-2 text-3xl rounded-md hover:bg-indigo-800"></i>
              </Link>
            </div>
          </div>
          <hr />
          {/* card div */}
          <div className="">
            <h3 className="text-2xl font-semibold my-5">Articles</h3>
            <div className={`p-4 sm:w-[384px] border md:w-[650px] ${theme === "dark" ? "bg-[#344955]" : "bg-white"} rounded-md`}>
              <h3 className="font-bold text-2xl hover:text-blue-600 cursor-pointer">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, ea.
              </h3>
              <p className="py-3">
                by <span className="text-[#366bea] font-medium">Author</span> : timestamp
              </p>
              <div className="sm:flex">
                <img src={test} alt="" className="w-full sm:w-[145px] h-[200px] sm:h-[100px] rounded-md" />
                <div className="px-2 mt-4 sm:mt-0">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos odio ab sapiente dolore, fugiat natus facere sequi praesentium minima
                  vero.
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    window.location.href = "/login";
    return null; // Add a return statement here to avoid potential errors
  }
};

export default Profile;
