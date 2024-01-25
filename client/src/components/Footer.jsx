import { Link } from "react-router-dom";
import ThemeContext from "../context/ThemeContext";
import { useContext } from "react";

const Footer = () => {
   const { theme } = useContext(ThemeContext);
  return (
    <>
      <div className="w-full  ">
        <div className={`w-full  py-5 ${theme === "dark" ? "bg-[#344955]" : "bg-white"}`}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-5 mx-auto md:w-[970px]">
            <div className="col-span-1 flex items-center mx-auto">
              <h2 className="text-2xl font-bold">Blogger</h2>
            </div>
            <div className="col-span-3 mx-auto mt-4 md:mt-0">
              <h2 className="hidden md:block text-lg font-bold mx-4">About</h2>
              <p className="text-sm mx-4">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem nostrum, vero modi ipsa Autem nostrum, vero modi ipsa.
              </p>
            </div>
            <div className="col-span-1 flex sm:hidden md:flex gap-2 items-center mx-auto text-white">
              <div className="h-[36px] w-[36px] aspect-square bg-[#3b5999] hover:bg-[#4f6aa3] rounded flex items-center justify-center text-xl cursor-pointer">
                <i className="ri-facebook-fill"></i>
              </div>

              <div className="h-[36px] w-[36px] aspect-square bg-[#00acee] hover:bg-[#1ab4f0] rounded flex items-center justify-center text-xl cursor-pointer">
                <i className="ri-twitter-fill"></i>
              </div>

              <div className="h-[36px] w-[36px] aspect-square bg-[#f50000] hover:bg-[#7f2b2b] rounded flex items-center justify-center text-xl cursor-pointer">
                <i className="ri-youtube-fill"></i>
              </div>

              <div className="h-[36px] w-[36px] aspect-square bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 rounded flex items-center justify-center text-xl cursor-pointer">
                <i className="ri-instagram-line"></i>
              </div>
            </div>
          </div>
        </div>
        <div className={`w-full ${theme === "dark" ? "bg-[#2c3e48]" : "bg-[#ececec]"} py-2`}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mx-auto md:w-[970px]">
            <div className="col-span-1 flex items-center mx-auto">
              <p className="text-base">
                Design by &nbsp;
                <a href="https://www.harishpandey.com.np" className="hover:text-[#4298f8]">
                  Harish Pandey
                </a>
              </p>
            </div>

            <div className="col-span-1 flex gap-2 items-center mx-auto mt-4 md:mt-0">
              <ul className="space-x-4 md:space-x-8 text-center md:text-left">
                <li className="block md:inline-block hover:text-[#4298f8]">
                  <Link to="/">Home</Link>
                </li>
                <li className="block md:inline-block hover:text-[#4298f8]">
                  <Link to="/about">About</Link>
                </li>
                <li className="block md:inline-block hover:text-[#4298f8]">
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
