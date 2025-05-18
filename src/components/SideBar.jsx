import React from "react";
import "../blocks/sidebar.css";

const SideBar = () => {
  return (
    <div className="sidebar">
      <img
        src="src/assets/avatar-sidebar.png"
        alt="User Avatar"
        className="sidebar__avatar"
      />
      <p className="sidebar__username">Terrence Tegegne</p>
    </div>
  );
};

export default SideBar;
