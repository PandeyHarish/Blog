import  { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
const LoginContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useLogin = () => {
  return useContext(LoginContext);
};

export const LoginProvider = ({ children }) => {
  const  [isLoggedIn, setLoggedIn] = useState(false);

  const loggedin = () => {
   setLoggedIn(true);
  };

  const loggedout = () => {
    setLoggedIn(false);
  };

  return <LoginContext.Provider value={{ isLoggedIn, loggedin, loggedout }}>{children}</LoginContext.Provider>;
};
LoginProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate the children prop
};