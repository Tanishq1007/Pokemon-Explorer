"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Pokemon } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/index';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Link href={`/pokemon/${pokemon.id}`} className="block transition-transform hover:scale-105">
      <Card className="h-full overflow-hidden">
        <CardHeader className="pb-2">
          <p className="text-sm text-gray-500 text-center">
            #{pokemon.id.toString().padStart(4, '0')}
          </p>
          <CardTitle className="capitalize text-center">
            {pokemon.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center p-4">
          <div className="relative h-40 w-40 bg-[#F2F2F2] rounded-lg">
            <Image
              src={pokemon.image}
              alt={pokemon.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain p-2"
              priority={pokemon.id <= 20}
            />
          </div>
          {/* Pokemon Types */}
          <div className="flex gap-2 mt-4">
            {pokemon.types?.map((type) => (
              <span
                key={type}
                className={`
                  px-3 py-1 rounded-full text-white text-sm capitalize
                  bg-pokemon-types-${type.toLowerCase()}
                `}
              >
                {type}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}