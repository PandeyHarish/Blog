import  { useState, useEffect } from "react";
import './assets/css/gototop.css'

const GoToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`go-to-top-container ${showButton ? "show" : ""}`}>
      {showButton && (
        <button className="go-to-top-button" onClick={scrollToTop}>
          <i className="ri-arrow-up-line text-xl p-1"></i>
        </button>
      )}
    </div>
  );
};

export default GoToTopButton;
