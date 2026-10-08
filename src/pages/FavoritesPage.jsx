import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext.jsx";
import PokemonCard from "../components/PokemonCard.jsx";

function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <section>
      <h2 className="page-title">Your favorites</h2>
      {favorites.length === 0 ? (
        <div className="status">
          <p>No favorites yet — tap the ♡ on any Pokémon to save it here.</p>
          <Link to="/" className="back-link">← Browse Pokémon</Link>
        </div>
      ) : (
        <ul className="pokemon-list">
          {[...favorites]
            .sort((a, b) => a.id - b.id)
            .map((p) => (
              <PokemonCard key={p.id} id={p.id} name={p.name} />
            ))}
        </ul>
      )}
    </section>
  );
}

export default FavoritesPage;
