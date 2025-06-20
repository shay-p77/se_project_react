import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import "../blocks/clothessection.css";
import ItemCard from "./ItemCard";

const ClothesSection = ({ clothingItems, onCardClick, onAddItem }) => {
  const currentUser = useContext(CurrentUserContext);
  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <div className="clothes__section">
      <div className="clothes__section-header">
        <p className="clothes__section-title">Your items</p>
        <button className="clothes__section-add_button" onClick={onAddItem}>
          + Add New
        </button>
      </div>

      <div className="clothes__section-cards">
        {userItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        ))}
      </div>
    </div>
  );
};

export default ClothesSection;
