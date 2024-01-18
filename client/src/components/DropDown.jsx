import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ThemeContext from "../context/ThemeContext";
import { useLogin } from "../context/LoginContext";
import PropTypes from "prop-types";



const Dropdown = (props) => {
  const { username } = props;
  const [isOpen, setIsOpen] = useState(false);
   const { theme } = useContext(ThemeContext);
   const { loggedout } = useLogin();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const hide =()=>{
    setIsOpen(false);
  }

  const logout = () => {
    localStorage.removeItem("auth-token");
    loggedout();
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button type="button" className="inline-flex justify-center " onClick={toggleDropdown}>
        {username}
      </button>

      {isOpen && (
        <div
          className={`absolute left-0 mt-3.5  w-24 rounded-md shadow-lg ${
            theme === "light" ? "bg-white" : "bg-[#344955]"
          } ring-1 ring-black ring-opacity-5 focus:outline-none`}
        >
          <div className="py-1">
            <Link to={"/me"} onClick={hide} className={`block w-full text-left px-4 py-2 text-sm ${theme === "light" ? "text-gray-700" : "text-white"} `}>
              Profile
            </Link>
            <button
              onClick={logout}
              className={`block w-full text-left px-4 py-2 text-sm ${
                theme === "light" ? "text-gray-700" : "text-white"
              }`}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;


Dropdown.propTypes = {
  username: PropTypes.string,
};
