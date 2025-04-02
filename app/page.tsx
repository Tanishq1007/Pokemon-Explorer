"use client"

import React, { useState, useEffect } from 'react';
import { getPokemonList, getPokemonImageUrl, extractPokemonId } from '@/lib/api';
import { Pokemon } from '@/lib/types';
import PokemonGrid from '@/components/PokemonGrid';
import SearchBar from '@/components/SearchBar';
import Pagination from '@/components/Pagination';

export default function Home() {
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const pokemonsPerPage = 30;

  useEffect(() => {
    async function fetchPokemons() {
      try {
        setIsLoading(true);
        const data = await getPokemonList(1010, 0);
        
        const formattedPokemons = data.results.map(pokemon => {
          const id = extractPokemonId(pokemon.url);
          return {
            id,
            name: pokemon.name,
            url: pokemon.url,
            image: getPokemonImageUrl(id)
          };
        });
        
        setAllPokemons(formattedPokemons);
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

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredPokemons(allPokemons);
      setCurrentPage(1);
      return;
    }
    
    const filtered = allPokemons.filter(pokemon => 
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.id.toString() === searchTerm
    );
    
    setFilteredPokemons(filtered);
    setCurrentPage(1);
  }, [searchTerm, allPokemons]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
  const totalPages = Math.ceil(filteredPokemons.length / pokemonsPerPage);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="page-title mx-auto w-fit">Pokédex</h1>
      <SearchBar onSearch={handleSearch} />
      
      {filteredPokemons.length === 0 ? (
        <p className="text-center mt-8">No Pokémon found. Try a different search term.</p>
      ) : (
        <>
          <PokemonGrid pokemons={currentPokemons} />
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}
