"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Pokemon } from '@/lib/types';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Link href={`/pokemon/${pokemon.id}`} className="block transition-transform hover:scale-105">
      <div className="pokemon-card rounded-lg overflow-hidden">
        <div className="p-4">
          <div className="flex flex-col items-center gap-1 mb-2">
            <span className="text-red-500 font-mono">#{pokemon.id.toString().padStart(4, '0')}</span>
            <h2 className="capitalize text-lg font-semibold">
              {pokemon.name}
            </h2>
          </div>
          <div className="relative h-40 w-40 mx-auto">
            <Image
              src={pokemon.image}
              alt={pokemon.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain"
              priority={pokemon.id <= 20}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}