import React, { useState } from "react";
import SideBar from "./SideBar";
import Profile from "./Profile";
import ClothesSection from "./ClothesSection";
import "../blocks/profilePage.css";

function ProfilePage({
  onSignOut,
  onUpdateUser,
  clothingItems,
  onCardClick,
  onAddItem,
  onEditProfile,
  onCardLike,
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleOpenEditProfile = () => setIsEditModalOpen(true);
  const handleCloseEditProfile = () => setIsEditModalOpen(false);

  return (
    <div className="profile-page">
      <SideBar onEditProfile={onEditProfile} onSignOut={onSignOut} />
      <div className="profile-page__main">
        <Profile
          isEditModalOpen={isEditModalOpen}
          onCloseEditModal={handleCloseEditProfile}
          onUpdateUser={onUpdateUser}
        />
        <ClothesSection
          clothingItems={clothingItems}
          onCardClick={onCardClick}
          onAddItem={onAddItem}
          onCardLike={onCardLike}
        />
      </div>
    </div>
  );
}

export default ProfilePage;
