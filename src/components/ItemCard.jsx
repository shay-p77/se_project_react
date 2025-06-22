import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = currentUser
    ? item.likes.some((userId) => userId === currentUser._id)
    : false;

  const handleLike = () => {
    if (!currentUser) return; // don't allow if not logged in
    onCardLike({ id: item._id, isLiked: isLiked });
  };

  const likeButtonClassName = `like-button ${
    isLiked ? "like-button_active" : ""
  }`;

  return (
    <div className="item__card">
      <li className="items__list">
        <img
          src={item.imageUrl}
          alt={item.name}
          onClick={() => onCardClick(item)}
          className="item__card-image"
        />
        <p className="item__card-name">{item.name}</p>{" "}
        <button
          className={`item__like-button ${
            isLiked ? "item__like-button_is-active" : ""
          }`}
          onClick={handleLike}
        />
      </li>
    </div>
  );
}

export default ItemCard;
