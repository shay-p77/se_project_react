import React from "react";
import "../blocks/itemcard.css";

function ItemCard({ item, onCardClick }) {
  const handleClick = () => {
    onCardClick(item);
  };
  return (
    <li className="item__card" onClick={handleClick}>
      <img
        src={item.link}
        alt={item.name}
        className="item__card-image"
        onClick={() => onCardClick(item)}
      />
      <p className="item__card-name">{item.name}</p>
    </li>
  );
}

export default ItemCard;

// style it better
