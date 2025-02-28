import React from 'react';
import { Badge } from '@/components/ui/index';

interface PokemonTypeTagProps {
  type: string;
}

export default function PokemonTypeTag({ type }: PokemonTypeTagProps) {
  const getTypeColor = (type: string) => {
    const typeColors: Record<string, string> = {
      normal: 'bg-gray-400 hover:bg-gray-500',
      fire: 'bg-orange-500 hover:bg-orange-600',
      water: 'bg-blue-500 hover:bg-blue-600',
      electric: 'bg-yellow-400 hover:bg-yellow-500',
      grass: 'bg-green-500 hover:bg-green-600',
      ice: 'bg-blue-300 hover:bg-blue-400',
      fighting: 'bg-red-600 hover:bg-red-700',
      poison: 'bg-purple-500 hover:bg-purple-600',
      ground: 'bg-yellow-600 hover:bg-yellow-700',
      flying: 'bg-indigo-300 hover:bg-indigo-400',
      psychic: 'bg-pink-500 hover:bg-pink-600',
      bug: 'bg-lime-500 hover:bg-lime-600',
      rock: 'bg-yellow-800 hover:bg-yellow-900',
      ghost: 'bg-purple-700 hover:bg-purple-800',
      dragon: 'bg-indigo-600 hover:bg-indigo-700',
      dark: 'bg-gray-700 hover:bg-gray-800 text-white',
      steel: 'bg-gray-500 hover:bg-gray-600',
      fairy: 'bg-pink-300 hover:bg-pink-400',
    };

    return typeColors[type] || 'bg-gray-500 hover:bg-gray-600';
  };

  return (
    <Badge className={`capitalize ${getTypeColor(type)} border-none text-white`}>
      {type}
    </Badge>
  );
}