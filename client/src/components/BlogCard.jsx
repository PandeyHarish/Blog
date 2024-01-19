import test from "./assets/images/test.jpg";
import ThemeContext from "../context/ThemeContext";
import { useContext } from "react";

const BlogCard = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="m-6 sm:ml-32 mt-8">
      {/* card div */}
      <div className={`p-4 w-full sm:w-[384px] mt-4 md:w-[650px] ${theme === "dark" ? "bg-[#344955]" : "bg-white"} rounded-md`}>
        <h3 className="font-bold text-2xl hover:text-blue-600 cursor-pointer">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, ea.</h3>
        <p className="py-3">
          by <span className="text-[#366bea] font-medium">Author</span> : timestamp
        </p>
        <div className="sm:flex">
          <img src={test} alt="" className="w-full  md:h-[140px] sm:h-[100px] rounded-md mb-4 sm:mb-0" />
          <div className="px-2 sm:ml-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos odio ab sapiente dolore, fugiat natus facere sequi praesentium minima vero.
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
