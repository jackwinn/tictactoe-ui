import React, { useState } from "react";
import "../styles/loginPage.css";
import { useNavigate } from "react-router-dom";
import authBiz from "../businesses/authBiz";


const LoginPage = () => {
  const [form, setForm] = useState({ email: "admin@gmail.com", password: "admin123" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = await authBiz.login(form);
      console.log("Login success:", accessToken);
      localStorage.setItem("accessToken", accessToken);
      navigate("/ticTacToe");
    } catch (err) {
      setError("Login failed. Check credentials.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
