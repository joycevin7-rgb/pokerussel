import { TYPE_COLORS } from "../config.js";
import { capitalize } from "../utils.js";

function TypeBadge({ type, active, onClick }) {
  const style = { "--type-color": TYPE_COLORS[type] };
  const className = `type-badge${active ? " active" : ""}`;

  if (onClick) {
    return (
      <button type="button" className={className} style={style} onClick={onClick} aria-pressed={!!active}>
        {capitalize(type)}
      </button>
    );
  }
  return (
    <span className={className} style={style}>
      {capitalize(type)}
    </span>
  );
}

export default TypeBadge;
