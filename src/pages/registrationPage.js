import React, { useState } from "react";
import "../styles/registration.css";
import { Link } from "react-router-dom";
import userBiz from "../businesses/userBiz";

const Register = () => {
  const [form, setForm] = useState({ email: "jack@gmail.com", password: "1234", username: "jack" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userBiz.register(form);
      console.log(response)
      setMessage("Registration successful!");
    } catch (err) {
      setMessage("Registration failed.");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Registration</h2>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <label htmlFor="username">Username</label>
        <input
          type="username"
          id="username"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <button type="submit">Sign Up</button>

        {message && <p className="message">{message}</p>}

        <p className="login-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
