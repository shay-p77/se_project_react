import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import "../blocks/clothessection.css";
import ItemCard from "./ItemCard";

const ClothesSection = ({
  clothingItems,
  onCardClick,
  onAddItem,
  onCardLike,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const userItems = clothingItems || [];

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
          <ItemCard
            key={item._id || `${item.name}-${item.weather}`}
            item={item}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
          />
        ))}
      </div>
    </div>
  );
};

export default ClothesSection;
