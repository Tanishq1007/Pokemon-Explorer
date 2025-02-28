"use client"

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/index';

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

  return (
    <div className="w-full max-w-md mx-auto">
      <Input
        type="text"
        placeholder="Search Pokémon by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full"
      />
    </div>
  );
}