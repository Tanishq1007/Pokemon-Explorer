import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getPokemonDetail, getPokemonImageUrl, getPokemonList } from '@/lib/api';
import { PokemonDetail } from '@/lib/types';
import PokemonTypeTag from '@/components/PokemonTypeTag';
import StatBar from '@/components/StatBar';
import { ArrowLeft } from 'lucide-react';

// Generate static pages for the first 151 Pokémon at build time
export async function generateStaticParams() {
  const ids = Array.from({ length: 1010 }, (_, i) => (i + 1).toString());
  return ids.map(id => ({ id }));
}

async function getPokemon(id: string): Promise<PokemonDetail> {
  return getPokemonDetail(id);
}

// Add preloading function for next batch of Pokemon
async function preloadNextPokemon(currentPage: number, itemsPerPage: number = 12) {
  const start = (currentPage * itemsPerPage) + 1;
  const end = start + itemsPerPage;
  const nextIds = Array.from({ length: itemsPerPage }, (_, i) => start + i)
    .filter(id => id <= 1010);
    
  // Trigger preloading of images
  nextIds.forEach(id => {
    const imgUrl = getPokemonImageUrl(id);
    const img = new Image(0, 0);
    img.src = imgUrl;
  });
}

export default async function PokemonDetailPage({ params }: { params: { id: string } }) {
  const pokemon = await getPokemon(params.id);
  
  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/" className="flex items-center gap-2 mb-6 text-primary hover:underline">
        <ArrowLeft className="h-4 w-4" />
        Back to Pokédex
      </Link>
      
      <div className="bg-card rounded-lg shadow-lg overflow-hidden">
        <div className="bg-primary text-primary-foreground p-6 text-center">
          <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>
          <p className="text-xl mt-1">#{pokemon.id.toString().padStart(3, '0')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          <div className="flex justify-center items-center">
            <div className="relative h-64 w-64">
              <Image
                src={pokemon.sprites.other['official-artwork'].front_default || getPokemonImageUrl(pokemon.id)}
                alt={pokemon.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain"
                priority={parseInt(params.id) <= 24}
                loading={parseInt(params.id) <= 24 ? "eager" : "lazy"}
                quality={75}
              />
            </div>
          </div>
          
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Types</h2>
              <div className="flex gap-2">
                {pokemon.types.map(typeInfo => (
                  <PokemonTypeTag key={typeInfo.type.name} type={typeInfo.type.name} />
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Height</h2>
                <p>{(pokemon.height / 10).toFixed(1)} m</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Weight</h2>
                <p>{(pokemon.weight / 10).toFixed(1)} kg</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Abilities</h2>
              <ul className="list-disc list-inside">
                {pokemon.abilities.map(abilityInfo => (
                  <li key={abilityInfo.ability.name} className="capitalize">
                    {abilityInfo.ability.name.replace('-', ' ')}
                    {abilityInfo.is_hidden && <span className="text-sm text-muted-foreground ml-2">(Hidden)</span>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t">
          <h2 className="text-2xl font-semibold mb-4">Base Stats</h2>
          <div className="max-w-xl mx-auto">
            {pokemon.stats.map(statInfo => (
              <StatBar 
                key={statInfo.stat.name} 
                name={statInfo.stat.name} 
                value={statInfo.base_stat} 
              />
            ))}
          </div>
        </div>
        
        <div className="p-6 border-t">
          <h2 className="text-2xl font-semibold mb-4">Moves</h2>
          <div className="flex flex-wrap gap-2">
            {pokemon.moves.slice(0, 20).map(moveInfo => (
              <span 
                key={moveInfo.move.name} 
                className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm capitalize"
              >
                {moveInfo.move.name.replace('-', ' ')}
              </span>
            ))}
          </div>
          {pokemon.moves.length > 20 && (
            <details className="mt-4">
              <summary className="cursor-pointer text-primary hover:underline">
                + {pokemon.moves.length - 20} more moves
              </summary>
              <div className="flex flex-wrap gap-2 mt-3">
                {pokemon.moves.slice(20).map(moveInfo => (
                  <span 
                    key={moveInfo.move.name} 
                    className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm capitalize"
                  >
                    {moveInfo.move.name.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}