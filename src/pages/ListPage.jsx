import { useState } from "react";
import SearchForm from "../components/SearchForm.jsx";
import TypeFilter from "../components/TypeFilter.jsx";
import PokemonList from "../components/PokemonList.jsx";

function ListPage() {
  const [type, setType] = useState("all");

  return (
    <>
      <section className="hero">
        <h2>Gotta browse 'em all</h2>
        <p>Search, filter by type, favorite and explore every Pokémon.</p>
        <SearchForm />
      </section>
      <TypeFilter selected={type} onChange={setType} />
      <PokemonList key={type} type={type} />
    </>
  );
}

export default ListPage;
