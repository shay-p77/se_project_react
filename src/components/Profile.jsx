import React, { useContext, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import EditProfileModal from "./EditProfileModal";
import "../blocks/profile.css";

function Profile({
  onUpdateUser,
  onSignOut,
  clothingItems,
  onCardClick,
  onAddItem,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleOpenEditModal = () => setIsEditModalOpen(true);
  const handleCloseEditModal = () => setIsEditModalOpen(false);

  const handleUpdateUser = ({ name, avatar }) => {
    return onUpdateUser({ name, avatar }).then(() => {
      setIsEditModalOpen(false); // close on success
    });
  };

  return (
    <div className="profile">
      <SideBar onEditProfile={handleOpenEditModal} onSignOut={onSignOut} />

      <div className="profile__main">
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          currentUser={currentUser}
          onUpdateUser={handleUpdateUser}
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

export default Profile;
