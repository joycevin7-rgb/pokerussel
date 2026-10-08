import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPokemonIndex } from "../api.js";

function SearchForm() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [names, setNames] = useState([]);
  const navigate = useNavigate();

  // Names power the autocomplete suggestions; if this fails, search still works.
  useEffect(() => {
    fetchPokemonIndex()
      .then((list) => setNames(list.map((p) => p.name)))
      .catch(() => {});
  }, []);

  const suggestions =
    query.trim().length >= 2
      ? names.filter((n) => n.includes(query.trim().toLowerCase())).slice(0, 8)
      : [];

  function handleSubmit(event) {
    event.preventDefault();

    const name = query.trim().toLowerCase().replace(/\s+/g, "-");

    if (name === "") {
      setError("Type a Pokémon name (or Pokédex number) first.");
      return;
    }

    setError(null);
    navigate(`/pokemon/${name}`);
  }

  return (
    <div className="search">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by name or number… try pikachu or 150"
          className="search-input"
          list="pokemon-suggestions"
          aria-label="Search Pokémon"
        />
        <datalist id="pokemon-suggestions">
          {suggestions.map((n) => (
            <option key={n} value={n} />
          ))}
        </datalist>
        <button type="submit" className="search-button">Search</button>
      </form>

      {error && <p className="status status-error">{error}</p>}
    </div>
  );
}

export default SearchForm;
