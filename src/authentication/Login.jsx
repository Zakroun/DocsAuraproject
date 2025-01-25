import React, { useState } from "react";
import Img6 from "../assets/img6.jpg";
import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-main" style={{ display: "flex", minHeight: "100vh" }}>
      <div
        className="login-left"
        style={{
          flex: 1,
          background: `url(${Img6}) no-repeat center center/cover`,
        }}
      ></div>
      <div
        className="login-right"
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="login-right-container" style={{ maxWidth: "400px" }}>
          <div
            className="login-center"
            style={{
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            <h2>Welcome back!</h2>
            <p>Please enter your details</p>
          </div>
          <form>
            <input
              type="email"
              placeholder="Email"
              style={{
                width: "100%",
                padding: "10px",
                margin: "10px 0",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <div
              className="pass-input-div"
              style={{ position: "relative", margin: "10px 0" }}
            >
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
              {showPassword ? (
                <FaEyeSlash
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                />
              ) : (
                <FaEye
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                />
              )}
            </div>

            <div
              className="login-center-options"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "10px 0",
              }}
            >
              <div className="remember-div">
                <input type="checkbox" id="remember-checkbox" />
                <label htmlFor="remember-checkbox">Remember for 30 days</label>
              </div>
              <a
                href="#"
                className="forgot-pass-link"
                style={{ color: "#6c63ff" }}
              >
                Forgot password?
              </a>
            </div>
            <div className="login-center-buttons" style={{ margin: "20px 0" }}>
              <button
                type="button"
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#000",
                  color: "#fff",
                  borderRadius: "5px",
                  border: "none",
                  cursor: "pointer",
                  marginBottom: "10px",
                }}
              >
                Log In
              </button>
              <button
                type="button"
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#f5f5f5",
                  color: "#000",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <img
                  src={GoogleSvg}
                  alt=""
                  style={{ width: "20px", marginRight: "10px" }}
                />
                Log In with Google
              </button>
            </div>
          </form>
          <p
            className="login-bottom-p"
            style={{ textAlign: "center", marginTop: "10px" }}
          >
            Don't have an account?{" "}
            <a href="#" style={{ color: "#6c63ff" }}>
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
