import { API_BASE_URL, MAX_POKEMON } from "./config.js";

async function getJson(url, errorMessage) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(errorMessage ?? `Server responded with status ${response.status}`);
  }
  return response.json();
}

// The full name list is small (~1000 rows), so we fetch it once and reuse it
// for the grid, the search suggestions and the "random Pokémon" button.
let indexPromise = null;

export function fetchPokemonIndex() {
  if (!indexPromise) {
    indexPromise = getJson(`${API_BASE_URL}/pokemon?limit=${MAX_POKEMON}`)
      .then((data) => data.results) // [{ name, url }, ...]
      .catch((err) => {
        indexPromise = null; // allow a retry after a failure
        throw err;
      });
  }
  return indexPromise;
}

export async function fetchPokemonByType(type) {
  const data = await getJson(`${API_BASE_URL}/type/${type}`);
  return data.pokemon
    .map((entry) => entry.pokemon) // normalize to the same { name, url } shape
    .filter((p) => Number(p.url.split("/").filter(Boolean).pop()) <= MAX_POKEMON);
}

export function fetchPokemon(name) {
  return getJson(
    `${API_BASE_URL}/pokemon/${name}`,
    `No Pokémon named "${name}" — check the spelling.`
  );
}

export function fetchSpecies(name) {
  return getJson(`${API_BASE_URL}/pokemon-species/${name}`);
}

export function fetchByUrl(url) {
  return getJson(url);
}
