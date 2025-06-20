import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function ItemCard({ item, onClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = currentUser
    ? item.likes.some((userId) => userId === currentUser._id)
    : false;

  const handleLike = () => {
    if (!currentUser) return; // Don't allow if not logged in
    onCardLike({ id: item._id, isLiked });
  };

  const likeButtonClassName = `like-button ${
    isLiked ? "like-button_active" : ""
  }`;

  return (
    <div className="item-card">
      <button
        className={likeButtonClassName}
        onClick={handleLike}
        aria-label="Like button"
        style={{ display: currentUser ? "inline-block" : "none" }}
      >
        ❤️
      </button>
      <div>{item.likes.length}</div>
    </div>
  );
}

export default ItemCard;
