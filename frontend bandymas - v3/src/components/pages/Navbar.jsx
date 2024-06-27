import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import "../../styles/Navbar.css";

const Navbar = () => {
  const { token, user, logoutUser } = useAuth(); // Access token and logoutUser method from AuthContext
  const navigate = useNavigate();
  const colors = ['rgba(27, 110, 48, 0.2)', '#1b6e3080', '#5EA2E265', '#face5698'];
  const [colorIndex, setColorIndex] = useState(0); // State to keep track of the current color index

  const handleLogout = () => {
    logoutUser(); // Call logoutUser method from AuthContext
    navigate("/");
  };

  const changeColor = () => {
    const nextIndex = (colorIndex + 1) % colors.length; // Calculate next color index
    setColorIndex(nextIndex); // Update the color index state
  };

  const navigation = useNavigate();
  const navigateToCategories = () => {
    navigation('/list');
  };

  return (
    <nav className="navbar" style={{ backgroundColor: colors[colorIndex] }}>
      <div className="navbar-logo">
          
        <h1 onClick={navigateToCategories}>Posters webpage</h1>
      </div>

      <div className="links">
        {token ? (
          <div className="dafak">
            <Link to="/list">Categories</Link>
            <Link to="/create">New Category</Link>
             
            <span className="user-name"><h4 onClick={changeColor}>{user.name}</h4></span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="fakfak">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;