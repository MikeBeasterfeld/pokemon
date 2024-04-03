import { z } from 'zod';

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

export type PokemonSchemaType = z.infer<typeof PokemonSchema>;

export async function getPokemon(name: string): Promise<PokemonSchemaType> {
    const req = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
        cache: "force-cache",
    });

    const data = PokemonSchema.parse(await req.json());

    return data;
}

const PokemonListSchema = z.object({
    name: z.string(),
    url: z.string().url(),
});

const PokemonSchemaArray = z.array(PokemonListSchema);

export type PokemonSchemaArrayType = z.infer<typeof PokemonSchemaArray>;

export async function getPokemonList(): Promise<PokemonSchemaArrayType> {

    const req = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20`, {
        cache: "force-cache",
    });

    const data = PokemonSchemaArray.parse(
        await req.json().then((data) => data.results)
    );

    return data;
}