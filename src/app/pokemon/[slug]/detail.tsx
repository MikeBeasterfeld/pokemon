"use client";

import { Metadata } from "next/types";
import Image from "next/image";
import { type PokemonSchemaType, getPokemon } from "@/app/api/pokiapi";
import { useState, useEffect } from "react";

export default function Detail({ params }: { params: { slug: string } }) {
  const [pokemon, setPokemon] = useState<PokemonSchemaType>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getPokemon(params.slug).then((data) => {
      setPokemon(data);
      setLoading(false);
    });
  }, [params.slug]);

  if (isLoading) return <p>Loading...</p>;
  if (!pokemon) return <p>Could not connect to API</p>;

  return (
    <div className="container mx-auto flex">
      <div className="container">
        <h2 className="text-3xl">
          <span className="capitalize">{pokemon.name}</span>
        </h2>
        <p>Height: {pokemon.height / 10} m</p>
        <p>Weight: {pokemon.weight / 10} kg</p>
        <p>Abilities:</p>
        <ul className="list-disc ml-5">
          {pokemon.abilities.map((ability) => (
            <li key={ability.ability.name}>{ability.ability.name}</li>
          ))}
        </ul>
      </div>
      <div className="w-4/5">
        <Image
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          priority
          width={960}
          height={960}
        />
      </div>
    </div>
  );
}
