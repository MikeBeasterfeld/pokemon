"use client";

import { useState, useEffect } from "react";
import { PokemonSchemaArrayType, getPokemonList } from "@/app/api/pokiapi";

export default function Home() {
  const [data, setData] = useState<PokemonSchemaArrayType>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getPokemonList().then((data) => {
      setData(data);
      setLoading(false);
    });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>Could not connect to API</p>;

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
