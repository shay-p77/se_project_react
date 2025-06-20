import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import "../blocks/sidebar.css";

const SideBar = ({ onEditProfile, onSignOut }) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <img
          src={currentUser?.avatar || "default-avatar.png"}
          alt="User Avatar"
          className="sidebar__avatar"
        />
        <p className="sidebar__username">{currentUser?.name || "Guest"}</p>
      </div>
      <div className="sidebar__buttons">
        <button className="sidebar__edit-button" onClick={onEditProfile}>
          Change profile data
        </button>
        <button className="sidebar__logout-button" onClick={onSignOut}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default SideBar;
