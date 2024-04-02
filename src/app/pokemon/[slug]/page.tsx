import Image from "next/image";
import { z } from "zod";

const PokemonSchema = z.object({
  name: z.string(),
  sprites: z.object({
    front_default: z.string().url(),
  }),
  height: z.number(),
  weight: z.number(),
  abilities: z.array(
    z.object({
      ability: z.object({
        name: z.string(),
      }),
    })
  ),
});

export default async function Pokemon({
  params,
}: {
  params: { slug: string };
}) {
  const req = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.slug}`, {
    cache: "force-cache",
  });

  const data = PokemonSchema.parse(await req.json());

  return (
    <div className="container mx-auto flex">
      <div className="container">
        <p>
          Name: <span className="capitalize">{data.name}</span>
        </p>
        <p>Height: {data.height / 10} m</p>
        <p>Weight: {data.weight / 10} kg</p>
        <p>Abilities:</p>
        <ul className="list-disc ml-5">
          {data.abilities.map((ability) => (
            <li key={ability.ability.name}>{ability.ability.name}</li>
          ))}
        </ul>
      </div>
      <div className="w-4/5">
        <Image
          src={data.sprites.front_default}
          alt={data.name}
          priority
          width={960}
          height={960}
        />
      </div>
    </div>
  );
}
