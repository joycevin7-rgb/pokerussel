import { useState } from "react";
import { fetchPokemonIndex, fetchPokemonByType } from "../api.js";
import { PAGE_SIZE } from "../config.js";
import { getIdFromUrl } from "../utils.js";
import { useAsync } from "../hooks/useAsync.js";
import PokemonCard from "./PokemonCard.jsx";

function SkeletonGrid() {
  return (
    <ul className="pokemon-list" aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => (
        <li key={i} className="pokemon-list-item skeleton" />
      ))}
    </ul>
  );
}

// Render with key={type} so the "visible" counter resets when the filter changes.
function PokemonList({ type = "all" }) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const { data, isLoading, error } = useAsync(
    () => (type === "all" ? fetchPokemonIndex() : fetchPokemonByType(type)),
    type
  );

  if (isLoading) {
    return (
      <>
        <p className="status">Loading Pokémon…</p>
        <SkeletonGrid />
      </>
    );
  }

  if (error) {
    return <p className="status status-error">Couldn't load the list: {error}</p>;
  }

  const items = data
    .map((p) => ({ name: p.name, id: Number(getIdFromUrl(p.url)) }))
    .sort((a, b) => a.id - b.id);

  return (
    <>
      <p className="result-count">
        Showing {Math.min(visible, items.length)} of {items.length} Pokémon
      </p>
      <ul className="pokemon-list">
        {items.slice(0, visible).map((p) => (
          <PokemonCard key={p.id} id={p.id} name={p.name} />
        ))}
      </ul>
      {visible < items.length && (
        <div className="load-more">
          <button type="button" className="search-button" onClick={() => setVisible(visible + PAGE_SIZE)}>
            Load more
          </button>
        </div>
      )}
    </>
  );
}

export default PokemonList;
