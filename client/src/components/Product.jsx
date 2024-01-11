import { useEffect } from "react";
import { useLogin } from "../context/LoginContext";

const Product = () => {
    const { isLoggedIn, loggedin } = useLogin();
     if (localStorage.getItem("auth-token")) {
       loggedin;
     }

      useEffect(() => {
        const authToken = localStorage.getItem("auth-token");
        if (authToken) {
          // Call the login function from the context to set the user as logged in
          loggedin();
        }
      }, [loggedin]);
  return (
    <>
      <div> This is {isLoggedIn ? "loggedin" : "not loggedin"} in product page </div>
    </>
  );
};

export default Product;
