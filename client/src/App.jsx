// import "./App.css";
import "remixicon/fonts/remixicon.css";
import LoginSignup from "./components/LoginSignup";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { useLogin } from "./context/LoginContext";


function App() {
  const [mode, setMode] = useState("light");

  let changeTheme = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#131313";
      document.body.style.color = "white";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "rgba(255,255,255,0)";
      document.body.style.color = "#131313";
    }
  };
  const { loggedin } = useLogin();
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
      <BrowserRouter>
        <Navbar mode={mode} changeTheme={changeTheme} />

        
          <Routes>
            <Route exact path="/" element={<Home />} />

            {/* <Route exact path="/product" element={<Product/>} /> */}
            <Route exact path="/login" element={<LoginSignup />} />
          </Routes>
         
      </BrowserRouter>
    </>
  );
}

export default App;
