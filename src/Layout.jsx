import React from "react";
import NavBar from "./components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import "./Layout.css";
function Layout() {
  return (
    <div className="layout">
      <NavBar />
      <Outlet />
    </div>
  );
}

export default Layout;
