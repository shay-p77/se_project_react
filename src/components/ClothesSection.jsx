import React from "react";
import "../blocks/clothessection.css";
import ItemCard from "./ItemCard";

const ClothesSection = ({ clothingItems, onCardClick, onAddItem }) => {
  return (
    <div className="clothes__section">
      <div className="clothes__section-header">
        <p className="clothes__section-title">Your items</p>
        <button className="clothes__section-add_button" onClick={onAddItem}>
          + Add New
        </button>
      </div>

      <div className="clothes__section-cards">
        {clothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        ))}
      </div>
    </div>
  );
};

export default ClothesSection;
