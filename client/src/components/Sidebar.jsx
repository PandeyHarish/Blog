import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import test from "./assets/images/test.jpg";
const Sidebar = () => {
  const styles = {
    igbtn: {
      background: "linear-gradient(45deg, rgba(249,206,52,1) 0%, rgba(238,42,123,1) 35%, rgba(98,40,215,1) 100%)",
    },
  };
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <div className="block mt-12 m-6 sm:ml-32">
        {/* socialmedia handles start */}
        <div className={`w-full sm:w-[300px] sm:h-[149px] text-white ${theme === "dark" ? "bg-[#344955]" : "bg-white"} p-3 rounded-md`}>
          <h1 className="text-xl font-bold">Follow Us</h1>
          <div className="mt-2 grid grid-cols-4 gap-3">
            <div className="w-15 p-1 rounded-md cursor-pointer  bg-blue-800 text-lg text-center">
              <i className="ri-facebook-fill"></i>
            </div>

            <div className="w-15 p-1 rounded-md cursor-pointer  bg-blue-600 text-lg text-center">
              <i className="ri-twitter-fill"></i>
            </div>

            <div className="w-15 p-1 rounded-md cursor-pointer  bg-red-600 text-lg text-center">
              <i className="ri-youtube-fill"></i>
            </div>

            <div className={`w-15 p-1 rounded-md   cursor-pointer text-lg text-center `} style={styles.igbtn}>
              <i className="ri-instagram-fill"></i>
            </div>

            <div className="w-15 p-1 rounded-md cursor-pointer  bg-orange-600 text-lg text-center">
              <i className="ri-blogger-fill"></i>
            </div>

            <div className="w-15 p-1 rounded-md  cursor-pointer bg-[#4872a0] text-lg text-center">
              <i className="ri-vk-fill"></i>
            </div>

            <div className="w-15 p-1 rounded-md cursor-pointer  bg-pink-600 text-lg text-center">
              <i className="ri-basketball-line"></i>
            </div>

            <div className="w-15 p-1 rounded-md cursor-pointer  bg-indigo-600 text-lg text-center">
              <i className="ri-twitch-fill"></i>
            </div>
          </div>
        </div>
        {/* social media handles end */}

        {/* recent posts start */}
        <div className={`w-full sm:w-[300px] sm:h-[299px] ${theme === "dark" ? "bg-[#344955]" : "bg-white"} p-3 rounded-md mt-5`}>
          <h1 className="text-xl font-bold">Recent Posts</h1>
          {/* recent posts cards */}
          <div className="flex pt-3">
            <img src={test} alt="test" className="h-16 mt-1 rounded-md" />
            <div>
              <h3 className="font-medium text-sm pl-2 hover:text-blue-600 cursor-pointer">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, ea.
              </h3>
            </div>
          </div>

          <div className="flex pt-3">
            <img src={test} alt="test" className="h-16 mt-1 rounded-md" />
            <div>
              <h3 className="font-medium text-sm pl-2 hover:text-blue-600 cursor-pointer">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, ea.
              </h3>
            </div>
          </div>

          <div className="flex pt-3">
            <img src={test} alt="test" className="h-16 mt-1 rounded-md" />
            <div>
              <h3 className="font-medium text-sm pl-2 hover:text-blue-600 cursor-pointer">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, ea.
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
