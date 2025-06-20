import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfileModal from "./EditProfileModal";

function Profile({ isEditModalOpen, onCloseEditModal, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const handleUpdateUser = ({ name, avatar }) => {
    return onUpdateUser({ name, avatar });
  };

  return (
    <>
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={onCloseEditModal}
        currentUser={currentUser}
        onUpdateUser={handleUpdateUser}
      />
    </>
  );
}

export default Profile;
