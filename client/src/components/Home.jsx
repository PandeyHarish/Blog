import { useEffect } from "react";
import { useLogin} from "../context/LoginContext";

const Home = () => {

  const { isLoggedIn,loggedin } = useLogin();
  if(localStorage.getItem('auth-token')){
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
      <div>
        
        <h1 className="text-3xl font-bold">{isLoggedIn ? 'loggedin':'not loggedin'}</h1>
      </div>
    </>
  );
};

export default Home;
