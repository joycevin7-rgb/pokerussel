import { createContext, useContext, useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "pokedex-mini:favorites";
const FavoritesContext = createContext(null);

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(load); // [{ id, name }]

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = useCallback(
    (id) => favorites.some((f) => String(f.id) === String(id)),
    [favorites]
  );

  const toggleFavorite = useCallback((id, name) => {
    setFavorites((prev) =>
      prev.some((f) => String(f.id) === String(id))
        ? prev.filter((f) => String(f.id) !== String(id))
        : [...prev, { id: Number(id), name }]
    );
  }, []);

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFavorites() {
  return useContext(FavoritesContext);
}
