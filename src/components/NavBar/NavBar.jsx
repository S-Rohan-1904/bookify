import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./NavBar.css";
import { useState } from "react";
function NavBar(props) {
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  // toggle burger menu change
  const updateMenu = () => {
    setIsMenuClicked((prevState) => !prevState);
    document.body.style.dispay = "none";
  };
  let classes = isMenuClicked ? " activeMenu" : "";
  return (
    <div className="nav-bar">
      <div className={"hamburger" + classes} onClick={updateMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <nav className={classes}>
        <ul className="nav-list">
          <NavLink to="/" className="link" onClick={updateMenu}>
            Top Selling
          </NavLink>
          <NavLink to="/browse" className="link" onClick={updateMenu}>
            Browse
          </NavLink>
          <NavLink to="/favourite" className="link" onClick={updateMenu}>
            Favourite
          </NavLink>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
