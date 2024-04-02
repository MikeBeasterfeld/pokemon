import { z } from "zod";
import Image from "next/image";

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
    <>
      <p>
        Name: <span className="capitalize">{data.name}</span>
      </p>
      <p>Height: {data.height}</p>
      <div>
        <Image
          src={data.sprites.front_default}
          alt={data.name}
          width={96}
          height={96}
        />
      </div>
    </>
  );
}
