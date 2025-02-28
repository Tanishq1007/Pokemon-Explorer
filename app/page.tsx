"use client"

import React, { useState, useEffect } from 'react';
import { getPokemonList, getPokemonImageUrl, extractPokemonId } from '@/lib/api';
import { Pokemon } from '@/lib/types';
import PokemonGrid from '@/components/PokemonGrid';
import SearchBar from '@/components/SearchBar';
import PokemonCard from '@/components/PokemonCard';

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPokemons() {
      try {
        setIsLoading(true);
        const data = await getPokemonList(1010, 0); // Fetch first 151 Pokémon (Gen 1)
        
        const formattedPokemons = data.results.map(pokemon => {
          const id = extractPokemonId(pokemon.url);
          return {
            id,
            name: pokemon.name,
            url: pokemon.url,
            image: getPokemonImageUrl(id)
          };
        });
        
        setPokemons(formattedPokemons);
        setFilteredPokemons(formattedPokemons);
      } catch (err) {
        setError('Failed to fetch Pokémon data. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchPokemons();
  }, []);

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredPokemons(pokemons);
      return;
    }
    
    const filtered = pokemons.filter(pokemon => 
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.id.toString() === searchTerm
    );
    
    setFilteredPokemons(filtered);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white bg-pokemon-pattern">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Pokédex</h1>
        <SearchBar onSearch={handleSearch} />
        
        {filteredPokemons.length === 0 ? (
          <p className="text-center mt-8">No Pokémon found. Try a different search term.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6">
            {filteredPokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}