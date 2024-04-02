import { getPokemonList } from "@/app/api/pokiapi";

export default async function Home() {
  const data = await getPokemonList();

  return (
    <div className="columns-3xs">
      {data.map((pokemon) => (
        <div key={pokemon.name} className="pr-4">
          <a href={`/pokemon/${pokemon.name}`} className="capitalize">
            {pokemon.name}
          </a>
        </div>
      ))}
    </div>
  );
}
