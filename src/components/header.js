import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/header.css";
import { useUser } from "../contexts/userContext";

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setUser({});
    navigate("/login");
  };

  return (
    <header className="header-container">
      <div className="header-left">
        <h3 className="header-title">Welcome back, {user.username}!</h3>
      </div>

      <div className="header-right">
        <h3 className="score-text">
          Your score | Win: {user.win_score} Lose: {user.lose_score} Draw:{" "}
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
