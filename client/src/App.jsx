// import "./App.css";
import "remixicon/fonts/remixicon.css";
import LoginSignup from "./components/LoginSignup";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { useLogin } from "./context/LoginContext";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import CreateBlog from "./components/CreateBlog";
import GoToTopButton from "./components/GoToTopButton";

function App() {
  const [mode, setMode] = useState("light");
  const [user, setUser] = useState([]);

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

  const authToken = localStorage.getItem("auth-token");
  const fetchinfo = async () => {
    const res = await fetch("http://127.0.0.1:5000/api/auth/user/getuser", {
      method: "POST",
      headers: { "auth-token": authToken },
    });
    const paresedData = await res.json();
    setUser(paresedData);
  };

  useEffect(() => {
    if (authToken) {
      fetchinfo();
      // Call the login function from the context to set the user as logged in
      loggedin();
    }
  }, [loggedin]);
  

  return (
    <>
      <BrowserRouter>
        <Navbar mode={mode} username={user.username} changeTheme={changeTheme} />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/me" element={<Profile />} />
          <Route exact path="/new" element={<CreateBlog userId={user._id} author_name={user.username} />} />
          {/* <Route exact path="/product" element={<Product/>} /> */}
          <Route exact path="/login" element={<LoginSignup />} />
        </Routes>
        <GoToTopButton />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
