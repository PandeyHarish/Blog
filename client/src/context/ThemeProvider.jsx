import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ThemeContext from "./ThemeContext";

const ThemeProvider = ({ children }) => {
  const storedTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(storedTheme || "");

  useEffect(() => {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(storedTheme || (prefersDarkMode ? "dark" : "light"));
  }, [storedTheme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
    updateBodyStyles(newTheme);
  };

  const updateBodyStyles = (selectedTheme) => {
    if (selectedTheme === "dark") {
      document.body.style.backgroundColor = "#292c35";
      document.body.style.color = "white";
    } else {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    }
  };

  // Set initial body styles based on the theme
  updateBodyStyles(theme);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate the children prop
};

export default ThemeProvider;
