import { PokemonDetail, PokemonListResponse } from './types';
import { getCachedPokemon, setCachedPokemon } from './cache';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

export async function getPokemonList(limit = 20, offset = 0): Promise<PokemonListResponse> {
  const response = await fetch(`${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon list');
  }
  
  return response.json();
}

export async function getPokemonDetail(id: string): Promise<PokemonDetail> {
  // Check cache first
  const cached = getCachedPokemon(id);
  if (cached) {
    return cached;
  }

  const response = await fetch(`${API_BASE_URL}/pokemon/${id}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon details for ${id}`);
  }
  
  const data = await response.json();
  
  // Store in cache
  setCachedPokemon(id, data);
  
  return data;
}

export function getPokemonImageUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export function extractPokemonId(url: string): number {
  // Extract the ID from the URL (e.g., https://pokeapi.co/api/v2/pokemon/1/)
  const parts = url.split('/');
  return parseInt(parts[parts.length - 2], 10);
}