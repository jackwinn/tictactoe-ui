import React, { useState } from "react";
import "../styles/loginPage.css";
import { useNavigate } from "react-router-dom";
import authBiz from "../businesses/authBiz";
import userBiz from "../businesses/userBiz";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [form, setForm] = useState({
    email: "jack@gmail.com",
    password: "1234",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async () => {
    let result = {};
    const validation = authBiz.credentialValidation(form);
    if (validation.ok) {
      try {
        result = await authBiz.login(form);
        // console.log(result)
        if (result.accessToken) {
          localStorage.setItem("accessToken", result.accessToken);
          const user = await userBiz.me(result.accessToken);
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/ticTacToe");
        }
      } catch (err) {
        setError(err.response?.data?.message)
      }
    } else {
      setError(validation.err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Login</h2>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          // required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          // required
        />
        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
        {error && <p className="error-message">{error}</p>}

        <p className="register-link">
          Don't have an account? <Link to="/registration">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
