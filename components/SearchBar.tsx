"use client"

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="w-full max-w-md mx-auto search-container">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500 h-5 w-5" />
        <input
          type="text"
          placeholder="Search Pokémon by name or number..."
          value={searchTerm}
          onChange={handleChange}
          className="w-full bg-transparent text-white placeholder-gray-400 pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-red-500 rounded-md"
        />
      </div>
    </div>
  );
}