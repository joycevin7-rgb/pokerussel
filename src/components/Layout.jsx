import { useState, useEffect } from "react";
import { Outlet, Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { fetchPokemonIndex } from "../api.js";
import { useFavorites } from "../context/FavoritesContext.jsx";

function getInitialTheme() {
  const saved = localStorage.getItem("pokedex-mini:theme");
  if (saved) return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function Layout() {
  const [theme, setTheme] = useState(getInitialTheme);
  const { favorites } = useFavorites();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("pokedex-mini:theme", theme);
  }, [theme]);

  // Start every page at the top when navigating.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  async function goRandom() {
    try {
      const all = await fetchPokemonIndex();
      const pick = all[Math.floor(Math.random() * all.length)];
      navigate(`/pokemon/${pick.name}`);
    } catch {
      navigate("/");
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <Link to="/" className="app-title-link">
          <span className="pokeball" aria-hidden="true" />
          <h1>PokéDex <span>Mini</span></h1>
        </Link>
        <nav className="app-nav">
          <NavLink to="/" end className="nav-link">Home</NavLink>
          <NavLink to="/favorites" className="nav-link">
            Favorites {favorites.length > 0 && <b className="badge">{favorites.length}</b>}
          </NavLink>
          <button type="button" className="nav-btn" onClick={goRandom} title="Random Pokémon">
            🎲 <span className="hide-sm">Random</span>
          </button>
          <button
            type="button"
            className="nav-btn"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="app-footer">
        Data from <a href="https://pokeapi.co" target="_blank" rel="noreferrer">PokéAPI</a> · Built with React + Vite
      </footer>
    </div>
  );
}

export default Layout;
