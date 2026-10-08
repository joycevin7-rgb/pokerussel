import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPokemon, fetchSpecies } from "../api.js";
import { MAX_POKEMON, TYPE_COLORS } from "../config.js";
import { capitalize, formatId, prettify, getArtworkUrl } from "../utils.js";
import { useAsync } from "../hooks/useAsync.js";
import TypeBadge from "../components/TypeBadge.jsx";
import FavoriteButton from "../components/FavoriteButton.jsx";
import EvolutionChain from "../components/EvolutionChain.jsx";

const STAT_LABELS = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};

function statColor(value) {
  if (value >= 120) return "#2ecc71";
  if (value >= 80) return "#a3cb38";
  if (value >= 50) return "#f7b731";
  return "#ee5253";
}

async function loadAll(name) {
  const pokemon = await fetchPokemon(name);
  // Species data (description, evolutions) is a bonus: if it fails, still show the page.
  const species = await fetchSpecies(pokemon.species.name).catch(() => null);
  return { pokemon, species };
}

function DetailPage() {
  const { name } = useParams();
  const { data, isLoading, error } = useAsync(() => loadAll(name), name);
  const [shiny, setShiny] = useState(false);

  const pokemon = data?.pokemon;

  // Side effect outside React: keep the browser tab title in sync.
  useEffect(() => {
    document.title = pokemon ? `${capitalize(pokemon.name)} · PokéDex Mini` : "PokéDex Mini";
    return () => {
      document.title = "PokéDex Mini";
    };
  }, [pokemon]);

  if (isLoading) {
    return (
      <div className="status">
        <div className="spinner" aria-hidden="true" />
        <p>Loading {name}…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="status">
        <p className="status-error">{error}</p>
        <Link to="/" className="back-link">← Back to list</Link>
      </div>
    );
  }

  const { species } = data;
  const art = pokemon.sprites.other["official-artwork"];
  const image =
    (shiny ? art.front_shiny : art.front_default) || art.front_default || getArtworkUrl(pokemon.id);
  const types = pokemon.types.map((t) => t.type.name);
  const color = TYPE_COLORS[types[0]];

  const description = species?.flavor_text_entries
    .find((e) => e.language.name === "en")
    ?.flavor_text.replace(/[\n\f\u00ad]/g, " ");
  const genus = species?.genera.find((g) => g.language.name === "en")?.genus;
  const total = pokemon.stats.reduce((sum, s) => sum + s.base_stat, 0);

  function playCry() {
    const src = pokemon.cries?.latest ?? pokemon.cries?.legacy;
    if (src) new Audio(src).play().catch(() => {});
  }

  return (
    <div className="detail-page" style={{ "--type-color": color }}>
      <div className="detail-top">
        <Link to="/" className="back-link">← Back to list</Link>
        <div className="prev-next">
          {pokemon.id > 1 && <Link to={`/pokemon/${pokemon.id - 1}`} className="back-link">‹ Prev</Link>}
          {pokemon.id < MAX_POKEMON && <Link to={`/pokemon/${pokemon.id + 1}`} className="back-link">Next ›</Link>}
        </div>
      </div>

      <section className="detail-hero">
        <FavoriteButton id={pokemon.id} name={pokemon.name} className="hero-fav" />
        <img className="detail-art" src={image} alt={pokemon.name} width={240} height={240} />
        <p className="detail-id">{formatId(pokemon.id)}</p>
        <h2>{capitalize(pokemon.name)}</h2>
        {genus && <p className="genus">{genus}</p>}
        <div className="type-row">
          {types.map((t) => (
            <TypeBadge key={t} type={t} />
          ))}
        </div>
        <div className="hero-actions">
          <button type="button" className="chip-btn" onClick={playCry}>🔊 Cry</button>
          {art.front_shiny && (
            <button type="button" className="chip-btn" onClick={() => setShiny(!shiny)} aria-pressed={shiny}>
              ✨ {shiny ? "Normal" : "Shiny"}
            </button>
          )}
        </div>
      </section>

      {description && <p className="description">“{description}”</p>}

      <section className="panel">
        <div className="facts">
          <div><span className="fact-label">Height</span><b>{(pokemon.height / 10).toFixed(1)} m</b></div>
          <div><span className="fact-label">Weight</span><b>{(pokemon.weight / 10).toFixed(1)} kg</b></div>
          <div><span className="fact-label">Base EXP</span><b>{pokemon.base_experience ?? "—"}</b></div>
        </div>
        <h3>Abilities</h3>
        <div className="ability-row">
          {pokemon.abilities.map((a) => (
            <span key={a.ability.name} className={`ability${a.is_hidden ? " hidden" : ""}`}>
              {prettify(a.ability.name)}
              {a.is_hidden && <small> (hidden)</small>}
            </span>
          ))}
        </div>
      </section>

      <section className="panel">
        <h3>Base stats</h3>
        <ul className="stat-list">
          {pokemon.stats.map((s) => (
            <li key={s.stat.name}>
              <span className="stat-name">{STAT_LABELS[s.stat.name] ?? prettify(s.stat.name)}</span>
              <span className="stat-value">{s.base_stat}</span>
              <span className="stat-bar" aria-hidden="true">
                <span
                  className="stat-fill"
                  style={{ width: `${Math.min(100, (s.base_stat / 200) * 100)}%`, background: statColor(s.base_stat) }}
                />
              </span>
            </li>
          ))}
          <li className="stat-total">
            <span className="stat-name">Total</span>
            <span className="stat-value">{total}</span>
          </li>
        </ul>
      </section>

      {species?.evolution_chain?.url && (
        <section className="panel">
          <h3>Evolutions</h3>
          <EvolutionChain url={species.evolution_chain.url} currentName={species.name} />
        </section>
      )}
    </div>
  );
}

export default DetailPage;
