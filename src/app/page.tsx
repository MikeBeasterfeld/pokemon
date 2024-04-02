import { z } from "zod";

const PokemonListSchema = z.object({
  name: z.string(),
  url: z.string().url(),
});

const PokemonSchemaArray = z.array(PokemonListSchema);

export default async function Home() {
  const req = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20`, {
    cache: "force-cache",
  });

  const data = PokemonSchemaArray.parse(
    await req.json().then((data) => data.results)
  );

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
