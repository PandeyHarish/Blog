// import "./App.css";
import "remixicon/fonts/remixicon.css";
import LoginSignup from "./components/LoginSignup";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
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
  return (
    <>
      <BrowserRouter>
        <Navbar mode={mode} changeTheme={changeTheme} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<LoginSignup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
