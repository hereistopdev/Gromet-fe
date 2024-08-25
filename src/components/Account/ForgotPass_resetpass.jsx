import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import baseStyle from "./Base.module.css";
import forgotpass_resetpassStyle from "./ForgotPass_sendmail.module.css";
import { baseApi } from '../../constants';

const ForgotPass_resetpass = ({ setAccount }) => {
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});
  const [user, setUserDetails] = useState({

    password: "",
    cpassword: "",

  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    let errorMessage = '';

    if (name === 'password') {
      if (!value) {
        errorMessage = 'Password is required';
      }
      else if (value?.length < 6) {
        errorMessage = 'Password must be more than 6 letters';
      }
    }
    else if (name === 'cpassword') {
      if (!value) {
        errorMessage = 'Confirm Password is required';
      } else if (value !== user.password) {
        errorMessage = 'Passwords do not match';
      }
    }

    // Update the state with the new value
    setUserDetails(prevUser => ({
      ...prevUser,
      [name]: value,
    }));

    // Update the form errors separately
    setFormErrors(prevErrors => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const validateForm = (values) => {
    const errors = {};

    if (!values.password) {
      errors.password = "Password is required";
    }
    if (values.password?.length < 6) {
      errors.password = "Password must be more than 6 letters";
    }
    if (!values.cpassword) {
      errors.cpassword = "Confirm Password is required";
    } else if (values.cpassword !== values.password) {
      errors.cpassword = "Passwords do not match";
    }

    return errors;
  };

  const handleReset = (e) => {
    e.preventDefault();
    const errors = validateForm(user);
    console.log(errors)
    setFormErrors(errors);
    const url = window.location.href
    const lastSegment = url.substring(url.lastIndexOf('/') + 1);
    if (Object.keys(errors).length === 0) {
      axios
        .post(`${baseApi}/account/password-reset`, { _id: lastSegment, password: user.password })
        .then((res) => {
          console.log(res);
          alert("Reset Successfully");
          navigate("/account/login", { replace: true });
        })
        .catch((error) => {

        });
    }

  };

  return (
    <div className={baseStyle.account}>
      <div className={forgotpass_resetpassStyle.forgotpass}>
        <form>
          <h1>Password Reset</h1>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={user.password}
          />
          {formErrors.password && (
            <p className={baseStyle.error}>{formErrors.password}</p>
          )}
          <input
            type="password"
            name="cpassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            value={user.cpassword}
          />
          {formErrors.cpassword && (
            <p className={baseStyle.error}>{formErrors.cpassword}</p>
          )}

          <button className={baseStyle.button_common} onClick={handleReset}>
            Reset
          </button>

        </form>
      </div>
    </div>
  );
};

export default ForgotPass_resetpass;
