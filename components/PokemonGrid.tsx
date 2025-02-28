"use client"

import React from 'react';
import { Pokemon } from '@/lib/types';
import PokemonCard from './PokemonCard';

interface PokemonGridProps {
  pokemons: Pokemon[];
}

export default function PokemonGrid({ pokemons }: PokemonGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}