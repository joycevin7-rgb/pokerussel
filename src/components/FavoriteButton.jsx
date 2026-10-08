import { useFavorites } from "../context/FavoritesContext.jsx";

function FavoriteButton({ id, name, className = "" }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(id);

  return (
    <button
      type="button"
      className={`fav-btn ${active ? "active" : ""} ${className}`}
      onClick={() => toggleFavorite(id, name)}
      aria-pressed={active}
      aria-label={active ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
      title={active ? "Remove from favorites" : "Add to favorites"}
    >
      {active ? "♥" : "♡"}
    </button>
  );
}

export default FavoriteButton;
