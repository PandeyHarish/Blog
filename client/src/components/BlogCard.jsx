import test from "./assets/images/test.jpg";
import ThemeContext from "../context/ThemeContext";
import { useContext } from "react";

const BlogCard = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="mx-32 mt-12">
      {/* card div */}
      <div className={`p-4 w-[650px] h-[250px] ${theme === "dark" ? "bg-[#344955]" : "bg-white"} `}>
        <h3 className="font-bold text-2xl hover:text-blue-600 cursor-pointer">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, ea.</h3>
        <p className="py-3">by Author : timestamp</p>
        <div className="flex">
          <img src={test} alt="" className="w-[145px] h-[100px]" />
          <div className="px-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos odio ab sapiente dolore, fugiat natus facere sequi praesentium minima vero.
          </div>
        </div>
      </div>

      <div className={`p-4 w-[650px] h-[250px] ${theme === "dark" ? "bg-[#344955]" : "bg-white"} mt-6`}>
        <h3 className="font-bold text-2xl hover:text-blue-600 cursor-pointer">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, ea.</h3>
        <p className="py-3">by Author : timestamp</p>
        <div className="flex">
          <img src={test} alt="" className="w-[145px] h-[100px]" />
          <div className="px-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos odio ab sapiente dolore, fugiat natus facere sequi praesentium minima vero.
          </div>
        </div>
      </div>

      <div className={`p-4 w-[650px] h-[250px] ${theme === "dark" ? "bg-[#344955]" : "bg-white"} mt-6`}>
        <h3 className="font-bold text-2xl hover:text-blue-600 cursor-pointer">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, ea.</h3>
        <p className="py-3">by Author : timestamp</p>
        <div className="flex">
          <img src={test} alt="" className="w-[145px] h-[100px]" />
          <div className="px-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos odio ab sapiente dolore, fugiat natus facere sequi praesentium minima vero.
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
