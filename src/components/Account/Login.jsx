import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import baseStyle from "./Base.module.css";
import loginStyle from "./Login.module.css";
import { baseApi } from "../../constants";
import { Alert, Checkbox, Input } from "antd";

const Login = ({ setAccount }) => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [user, setUserDetails] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate input field based on its name
    let error = "";
    if (name === "email") {
      const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!value.trim()) {
        error = "Email is required";
      } else if (!regex.test(value)) {
        error = "Please enter a valid email address";
      }
    } else if (name === "password") {
      if (!value) {
        error = "Password is required";
      }
    }

    // Update the state with new value and error message
    setUserDetails({
      ...user,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: error,
    });
  };

  const validateForm = (values) => {
    const errors = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email.trim()) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const handleforgot = () => {
    try {
      var currentURL = new URL(window.location.href);
      var baseURL = currentURL.origin + currentURL.pathname;

      var forgotPassURL = baseURL.slice(0, -5) + "forgotpass";

      window.location.href = forgotPassURL;
      alert("Do you forget password?");
    } catch (error) {
      console.error("Error handling forgot password:", error);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const errors = validateForm(user);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      axios
        .post(`${baseApi}/account/login`, {
          email: user.email,
          password: user.password,
        })
        .then((res) => {
          if (res.status === 202) {
            alert(
              "Your Email is not verified yet. Verification email has been sent. Please login again after verification."
            );
          } else if (res.status === 203) {
            alert("Your Phone is not verified yet. Please Contact +2341238123");
          } else if (res.status === 200) {
            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("currentUser", res.data.data.roles);
            sessionStorage.setItem(
              "rebate",
              JSON.stringify(res.data.data.rebate)
            );
            localStorage.setItem("userEmail", user.email);
            navigate("/", { replace: true });
            setAccount(false);
          }
          setError(false);
        })
        .catch((error) => {
          if (error.response.status === 404) {
            alert("This email is not registered yet. Please sing up first.");
            setUserDetails({ email: "", password: "" });
          } else if (error.response.status === 400) {
            // alert("Password is incorrect.");
            setError(true);
            setUserDetails({
              ...user,
              password: "",
            });
          } else if (error.response.status === 500) {
            alert("Server error.");
            navigate("/", { replace: true });
            setAccount(false);
          }
        });
    }
  };

  return (
    <div className="container" style={{ backgroundColor: "#ececec" }}>
      <div className={baseStyle.account}>
        <div className={loginStyle.login}>
          <h1 style={{ color: "#004d8c" }}>Registrovani korisnik</h1>
          <h2 style={{ color: "rgb(27 116 190)" }}>Prijavi se</h2>
          <form>
            <div
              style={{
                position: "relative",
              }}
            >
              <Input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={user.email}
                style={error ? { backgroundColor: "#ffe8e8" } : {}}
              />
              <p
                style={{
                  position: "absolute",
                  top: "-10px",
                  right: "-20px",
                  fontSize: "20px",
                  color: "red",
                }}
              >
                *
              </p>
            </div>
            {formErrors.email && (
              <p className={baseStyle.error}>{formErrors.email}</p>
            )}
            <div
              style={{
                position: "relative",
              }}
            >
              <Input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={user.password}
                style={error ? { backgroundColor: "#ffe8e8" } : {}}
              />
              <p
                style={{
                  position: "absolute",
                  top: "-10px",
                  right: "-20px",
                  fontSize: "20px",
                  color: "red",
                }}
              >
                *
              </p>
            </div>
            {formErrors.password && (
              <p className={baseStyle.error}>{formErrors.password}</p>
            )}
            <button
              style={{
                border: "none",
                backgroundColor: "transparent",
                display: "flex",
                justifyContent: "left",
                paddingLeft: 0,
              }}
              className={loginStyle.change_color}
              onClick={handleforgot}
            >
              Zaboravili ste lozinku?
            </button>
            <button className={loginStyle.hoverbutton} onClick={handleLogin}>
              Prijavite se
            </button>
            <br />
            <div style={{ marginTop: "10px", textAlign: "left" }}>
              <Checkbox type="checkbox" />
              <label>Zapamti me</label>
            </div>
            <br />
          </form>
          <span>Imate firmu, a još uvek nemate nalog?</span>
          <br />
          <Link to="/account/signup">REGISTRUJTE SE</Link>

          {error && (
            <Alert
              style={{ marginTop: "10px" }}
              message="Pogrešno ste uneli e-mail ili lozinku. "
              description="(Ukoliko ste zaboravili lozinku kliknite na link “Zaboravili ste lozinku?” iznad."
              type="error"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
