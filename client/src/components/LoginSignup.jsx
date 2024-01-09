import { useState } from "react";
import "./assets/css/login.css";

const LoginSignup = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const switchToLogin = () => {
    setIsLoginForm(true);
  };

  const switchToSignup = () => {
    setIsLoginForm(false);
  };

  const toggleSignup = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <div className="wrapper">
      <div className="title-text">
        <div className={`title ${isLoginForm ? "login" : "signup"}`}>{isLoginForm ? "Login Form" : "Signup Form"}</div>
      </div>
      <div className="form-container">
        <div className="slide-controls">
          <input type="radio" name="slide" id="login" checked={isLoginForm} onChange={switchToLogin} />
          <input type="radio" name="slide" id="signup" checked={!isLoginForm} onChange={switchToSignup} />
          <label htmlFor="login" className="slide login">
            Login
          </label>
          <label htmlFor="signup" className="slide signup">
            Signup
          </label>
          <div className="slider-tab"></div>
        </div>
        <div className="form-inner">
          {isLoginForm ? (
            <form action="#" className="login">
              <div className="field">
                <input type="text" placeholder="Email Address" required />
              </div>
              <div className="field">
                <input type="password" placeholder="Password" required />
              </div>
              <div className="pass-link">
                <a href="#">Forgot password?</a>
              </div>
              <div className="field btn">
                <div className="btn-layer"></div>
                <input type="submit" value="Login" />
              </div>
              <div className="signup-link">
                Not a member?{" "}
                <a href="#" onClick={toggleSignup}>
                  Signup now
                </a>
              </div>
            </form>
          ) : (
            <form action="#" className="signup">
              <div className="field">
                <input type="text" placeholder="Username" required />
              </div>
              <div className="field">
                <input type="text" placeholder="Email Address" required />
              </div>
              <div className="field">
                <input type="password" placeholder="Password" required />
              </div>
              <div className="field">
                <input type="password" placeholder="Confirm password" required />
              </div>
              <div className="field btn">
                <div className="btn-layer"></div>
                <input type="submit" value="Signup" />
              </div>
              <div className="signup-link">
                Already a member?{" "}
                <a href="#" onClick={toggleSignup}>
                  Login here
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
