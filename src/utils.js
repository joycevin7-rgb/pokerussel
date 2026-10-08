import { SPRITE_BASE_URL, ARTWORK_BASE_URL } from "./config.js";

export function getIdFromUrl(url) {
  // url looks like "https://pokeapi.co/api/v2/pokemon/25/"
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
}

export function capitalize(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

// "special-attack" -> "Special Attack", "mr-mime" -> "Mr Mime"
export function prettify(slug) {
  return slug.split("-").map(capitalize).join(" ");
}

export function formatId(id) {
  return `#${String(id).padStart(3, "0")}`;
}

export function getSpriteUrl(id) {
  return `${SPRITE_BASE_URL}/${id}.png`;
}

export function getArtworkUrl(id) {
  return `${ARTWORK_BASE_URL}/${id}.png`;
}
