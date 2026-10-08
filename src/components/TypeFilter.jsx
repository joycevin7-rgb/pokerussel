import { TYPES } from "../config.js";
import TypeBadge from "./TypeBadge.jsx";

function TypeFilter({ selected, onChange }) {
  return (
    <div className="type-filter" role="group" aria-label="Filter by type">
      <button
        type="button"
        className={`type-badge all${selected === "all" ? " active" : ""}`}
        onClick={() => onChange("all")}
      >
        All
      </button>
      {TYPES.map((type) => (
        <TypeBadge
          key={type}
          type={type}
          active={selected === type}
          onClick={() => onChange(type)}
        />
      ))}
    </div>
  );
}

export default TypeFilter;
