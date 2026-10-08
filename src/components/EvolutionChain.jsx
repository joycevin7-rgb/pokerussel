import { Link } from "react-router-dom";
import { fetchByUrl } from "../api.js";
import { useAsync } from "../hooks/useAsync.js";
import { capitalize, getIdFromUrl, getSpriteUrl } from "../utils.js";

// Turns the nested chain into stages: [[bulbasaur], [ivysaur], [venusaur]]
function flatten(node, depth = 0, stages = []) {
  (stages[depth] ??= []).push({ name: node.species.name, id: getIdFromUrl(node.species.url) });
  node.evolves_to.forEach((next) => flatten(next, depth + 1, stages));
  return stages;
}

function EvolutionChain({ url, currentName }) {
  const { data, isLoading, error } = useAsync(() => fetchByUrl(url), url);

  if (isLoading) return <p className="status small">Loading evolutions…</p>;
  if (error || !data) return null;

  const stages = flatten(data.chain);
  if (stages.length < 2) {
    return <p className="muted">This Pokémon does not evolve.</p>;
  }

  return (
    <div className="evo-chain">
      {stages.map((stage, i) => (
        <div className="evo-stage-wrap" key={i}>
          {i > 0 && <span className="evo-arrow" aria-hidden="true">→</span>}
          <div className="evo-stage">
            {stage.map((p) => (
              <Link
                key={p.name}
                to={`/pokemon/${p.name}`}
                className={`evo-item${p.name === currentName ? " current" : ""}`}
              >
                <img src={getSpriteUrl(p.id)} alt={p.name} width={72} height={72} loading="lazy" />
                <span>{capitalize(p.name)}</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default EvolutionChain;
