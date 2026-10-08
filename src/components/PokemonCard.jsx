import { Link } from "react-router-dom";
import { capitalize, formatId, getArtworkUrl, getSpriteUrl } from "../utils.js";
import FavoriteButton from "./FavoriteButton.jsx";

function PokemonCard({ id, name }) {
  return (
    <li className="pokemon-list-item">
      <Link to={`/pokemon/${name}`} className="pokemon-link">
        <img
          className="pokemon-sprite"
          src={getArtworkUrl(id)}
          alt={name}
          width={120}
          height={120}
          loading="lazy"
          // fall back to the small sprite if the big artwork is missing
          onError={(e) => {
            if (!e.target.dataset.fallback) {
              e.target.dataset.fallback = "1";
              e.target.src = getSpriteUrl(id);
            }
          }}
        />
        <span className="pokemon-id">{formatId(id)}</span>
        <span className="pokemon-name">{capitalize(name)}</span>
      </Link>
      <FavoriteButton id={id} name={name} className="card-fav" />
    </li>
  );
}

export default PokemonCard;
