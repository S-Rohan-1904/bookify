import React from "react";
import { Link } from "react-router-dom";
import "./HomeNav.css";
function HomeNav() {
  return (
    <div className="home-nav">
      <Link to="/library/top-selling">Top Selling</Link>
      <Link to="/library/genre">Genre</Link>
      <Link to="/library/browse">Browse</Link>
    </div>
  );
}

export default HomeNav;
