import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import baseStyle from "./Base.module.css";
import registerStyle from "./Register.module.css";
import loginStyle from "./Login.module.css";
import { baseApi } from "../../constants";
import { Input, Select } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const Register = ({ setAccount }) => {
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});
  const [user, setUserDetails] = useState({
    companyname: "",
    username: "",
    pib: "",
    phonenumber: "",
    email: "",
    password: "",
    cpassword: "",
    sumvalue: "",
    agreevalue: false,
  });

  const validateForm = (values) => {
    const errors = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username.trim()) {
      errors.username = "Username is required";
    }
    if (!values.email.trim()) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid email format";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    if (values.password?.length < 6) {
      errors.password =
        "*Lozinka treba da sadrži najmanje 8 karaktera, 1 veliko slovo i 1 broj";
    }
    if (!values.cpassword) {
      errors.cpassword = "Confirm Password is required";
    } else if (values.cpassword !== values.password) {
      errors.cpassword = "Passwords do not match";
    }
    if (!values.companyname) {
      errors.companyname = "Company Name is required";
    }
    if (!values.pib) {
      errors.pib = "PIB is required";
    }

    if (!values.phonenumber) {
      errors.phonenumber = "PhoneNumber is required";
    }
    if (values.phonenumber?.length <= 7) {
      errors.phonenumber = "Invalid Serbian PhoneNumber format";
    }
    if (values.sumvalue !== "7") {
      errors.sumvalue = "Input Correct value";
    }
    if (values.agreevalue === false) {
      errors.agreevalue = "Check Agreement";
    }
    return errors;
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    let errorMessage = "";

    if (name === "companyname") {
      if (!value.trim()) {
        errorMessage = "CompanyName is required";
      }
    } else if (name === "username") {
      if (!value.trim()) {
        errorMessage = "Username is required";
      }
    } else if (name === "pib") {
      if (!value) {
        errorMessage = "PIB is required";
      }
    } else if (name === "phonenumber") {
      if (!value) {
        errorMessage = "PhoneNumber is required";
      } else {
        value = value.replace(/[^0-9]/g, "").slice(0, 9);
        if (value?.length < 8) errorMessage = "Invalid Serbian Phone Number";
      }
    } else if (name === "email") {
      const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!value.trim()) {
        errorMessage = "Email is required";
      } else if (!regex.test(value)) {
        errorMessage = "Invalid email format";
      }
    } else if (name === "password") {
      if (!value) {
        errorMessage = "Password is required";
      } else if (value?.length < 6) {
        errorMessage = "Password must be more than 6 letters";
      }
    } else if (name === "cpassword") {
      if (!value) {
        errorMessage = "Confirm Password is required";
      } else if (value !== user.password) {
        errorMessage = "Passwords do not match";
      }
    } else if (name === "sumvalue") {
      if (value !== "5") {
        console.log("here am i", value === "5");
        errorMessage = "Input Correct value";
      }
    } else if (name === "agreevalue") {
      if (value === false) {
        errorMessage = "Check Agreement";
      }
    }

    // Update the state with the new value
    setUserDetails((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    // Update the form errors separately
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const handleOptionChange = (value) => {
    console.log(value, "here", value === "5");
    const name = "sumvalue";
    let errorMessage = "";

    if (value !== "5") {
      errorMessage = "Input Correct value";
    }

    setUserDetails((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    console.log("user", user);
    // Update the form errors separately
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(user);
    console.log(errors);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      axios
        .post(`${baseApi}/account/signup`, {
          companyname: user.companyname,
          username: user.username,
          pib: user.pib,
          email: user.email,
          password: user.password,
          phonenumber: user.phonenumber,
        })
        .then((res) => {
          if (res.status === 202) {
            alert(
              "User signed up successfully. A mail has been sent to you for verification. Please verify your email and login."
            );
            navigate("/account/login", { replace: true });
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            alert("This email has been registered already. Please login.");
            navigate("/account/login", { replace: true });
          } else if (error.response.status === 500) {
            alert("Server error!");
            navigate("/", { replace: true });
            setAccount(false);
          }
        });
    }
  };

  return (
    <div className="container" style={{ backgroundColor: "#ececec" }}>
      <div className={baseStyle.account}>
        <div className={registerStyle.register} style={{ marginTop: 0 }}>
          <h1 style={{ color: "#004d8c" }}>Još uvek nemate nalog?</h1>
          <h2 style={{ color: "rgb(27 116 190)" }}>Registrujte se</h2>
          <form>
            <div
              style={{
                position: "relative",
              }}
            >
              <Input
                type="text"
                name="companyname"
                placeholder="Naziv kompanije"
                onChange={handleChange}
                value={user.companyname}
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
            {formErrors.companyname && (
              <p className={baseStyle.error}>{formErrors.companyname}</p>
            )}

            <div
              style={{
                position: "relative",
              }}
            >
              <Input
                type="text"
                name="pib"
                placeholder="PIB"
                onChange={handleChange}
                value={user.pib}
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
            {formErrors.pib && (
              <p className={baseStyle.error}>{formErrors.pib}</p>
            )}

            <div
              style={{
                position: "relative",
              }}
            >
              <Input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                value={user.username}
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
            {formErrors.username && (
              <p className={baseStyle.error}>{formErrors.username}</p>
            )}

            {/* <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <span style={{ marginTop: '1rem', marginRight: "10px" }}>+381</span> */}

            <div
              style={{
                position: "relative",
              }}
            >
              <Input
                type="tel"
                name="phonenumber"
                placeholder="Broj telefona"
                onChange={handleChange}
                value={user.phonenumber}
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
            {/* </div> */}
            {formErrors.phonenumber && (
              <p className={baseStyle.error}>{formErrors.phonenumber}</p>
            )}

            <div
              style={{
                position: "relative",
              }}
            >
              <Input
                type="email"
                name="email"
                placeholder="E-mail"
                onChange={handleChange}
                value={user.email}
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
              <Input.Password
                className={registerStyle.input_password}
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={user.password}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
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
            <div
              style={{
                position: "relative",
              }}
            >
              <Input.Password
                className={registerStyle.input_password}
                type="password"
                name="cpassword"
                placeholder="Confirm Password"
                onChange={handleChange}
                value={user.cpassword}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
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
            {formErrors.cpassword && (
              <p className={baseStyle.error}>{formErrors.cpassword}</p>
            )}
            <div style={{ marginTop: "20px" }}>
              <span>Anti spam pitanje: Koliko je 2 + 3</span>
              <Select
                placeholder="Odgovor"
                defaultValue="1"
                options={[
                  {
                    value: "1",
                    label: "1",
                  },
                  {
                    value: "2",
                    label: "2",
                  },
                  {
                    value: "6",
                    label: "6",
                  },
                  {
                    value: "5",
                    label: "5",
                  },
                ]}
                name="sumvalue"
                onChange={handleOptionChange}
                value={user.sumvalue}
                size="large"
                style={{ width: "100%", margin: "5px 0px" }}
              />
            </div>

            {formErrors.sumvalue && (
              <p className={baseStyle.error}>{formErrors.sumvalue}</p>
            )}

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "left",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <input
                type="checkbox"
                style={{
                  margin: 0,
                  width: "10%",
                  height: "20px",
                  marginLeft: "6px",
                }}
                name="news"
                id="news"
              ></input>
              <label for="agreevalue">
                Želim da mi Gromet šalje vesti, savete i marketinške ponude,
                pročitaj više
              </label>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "left",
                alignItems: "left",
                marginTop: "10px",
              }}
            >
              <input
                type="checkbox"
                style={{ margin: 0, width: "10%" }}
                name="agreevalue"
                id="agreevalue"
                onChange={handleChange}
                // checked={user.agreevalue}
              ></input>
              <label for="agreevalue">Prihvatam Uslove korišćenja</label>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "left",
                alignItems: "left",
                marginTop: "10px",
              }}
            >
              <input
                type="checkbox"
                style={{ margin: 0, width: "10%" }}
                name="checker"
                id="checker"
                onChange={handleChange}
                // checked={user.checker}
              ></input>
              <label for="checker">
                Slažem se sa Gromet Politikom privatnosti
              </label>
            </div>
            {formErrors.checker && (
              <p className={baseStyle.error}>{formErrors.checker}</p>
            )}

            <button className={loginStyle.hoverbutton} onClick={handleSubmit}>
              Register
            </button>
            <p>
              *Nakon potvrde unetih podataka Gromet će verifikovati Vaš nalog u
              roku od 24h.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
