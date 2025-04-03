// Cache implementation for Pokemon data
const cache = new Map();

export function getCachedPokemon(id: string) {
  return cache.get(id);
}

export function setCachedPokemon(id: string, data: any) {
  cache.set(id, data);
}

export function clearCache() {
  cache.clear();
} 