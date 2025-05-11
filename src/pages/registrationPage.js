import React, { useState } from "react";
import "../styles/registration.css";
import { Link } from "react-router-dom";
import userBiz from "../businesses/userBiz";

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = userBiz.credentialValidation(form);
    if (validation.ok) {
      try {
        const response = await userBiz.register(form);
        if (response) setMessage(response.message);
        setForm({
          email: "",
          password: "",
          username: "",
        });
      } catch (err) {
        setError(err.response?.data?.message);
      }
    } else {
      setError(validation.err);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Registration</h2>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <label htmlFor="username">Username</label>
        <input
          type="username"
          id="username"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />

        <button type="submit" onClick={handleSubmit}>
          Register
        </button>
        {(message || error) && (
          <p className={message ? "message" : "error-message"}>
            {message || error}
          </p>
        )}
        <p className="login-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
