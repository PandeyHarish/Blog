import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Toggle from "./Toggle";
import ThemeContext from "../context/ThemeContext";

const Navbar = () => {
  const [display, setDisplay] = useState("hidden");
  const { theme } = useContext(ThemeContext);

  const mobNav = () => {
    setDisplay((prevState) => (prevState === "hidden" ? "block" : "hidden"));
  };

  return (
    <>
      <section
        className={`sticky top-0 left-0 right-0 z-10 hidden border-b shadow-sm py-3 sm:block ${theme === "light" ? "bg-white" : "bg-zinc-900"} `}
      >
        {/*  desktop navbar  */}
        <nav className="flex justify-between gap-2 px-4">
          <div className="flex items-center">
            <p className=" text-right font-bold ">
              <Link to={"/"}>Blog</Link>
            </p>
          </div>

          <div id="nav" className="flex items-center">
            <ul>
              <li className="inline p-2 text-lg">
                <Link to="/">Home</Link>
              </li>
              <li className="inline p-2 text-lg">
                <Link to="/">Products</Link>
              </li>
              <li className="inline p-2 text-lg">
                <a href="#about">About</a>
              </li>
            </ul>
          </div>

          <div className="flex">
            <ul>
              <li className="inline p-2 text-lg font-medium">
                <Link to="/login">Login</Link>
              </li>
            </ul>
            <Toggle />
          </div>
        </nav>
      </section>
      <section>
        {/*  mobile nav  */}
        <nav className="sticky z-20 w-full px-4 mt-2 bg-transparent sm:hidden border-b shadow-sm py-1.5" id="mobinav">
          <div className="px-4 ">
            <div className="flex justify-between">
              <h1 className="  text-base sm:text-xl  ">
                <Link to={"/"}>Blog</Link>
              </h1>
              <div className="flex gap-4">
                <Toggle />
                <p className="text-2xl " onClick={mobNav}>
                  <i className={`cursor-pointer ri-${display === "hidden" ? "menu" : "close"}-line items-center align-middle `}></i>
                </p>
              </div>
            </div>
            <div
              id="mobnav"
              className={`text-base p-4 fixed border ml-2 shadow-sm top-14  left-0 pt-1 w-[50%] rounded-lg ${display} animate__animated animate__backInLeft backdrop-blur-sm`}
            >
              <ul>
                <li className="p-2">
                  <Link to="/" className="text-xl ">
                    Home
                  </Link>
                </li>
                <li className="p-2">
                  <a href="#about" className="text-xl ">
                    About
                  </a>
                </li>

                <li className="p-2">
                  <a href="#contact" className="text-xl ">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </section>
    </>
  );
};

export default Navbar;
