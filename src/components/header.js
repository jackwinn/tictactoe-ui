import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/header.css";

const Header = () => {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="header-container">
      <div className="header-left">
        <h3 className="header-title">Welcome back, {user.username}!</h3>
      </div>

      <div className="header-right">
        <h3 className="score-text">
          Your score |
          Win: {user.win_score} Lose: {user.lose_score} Draw:{" "}
          {user.draw_score}
        </h3>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
