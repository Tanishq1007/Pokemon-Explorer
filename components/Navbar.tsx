import React from 'react';
import Link from 'next/link';
import { Pocket } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

export default function Navbar() {
  return (
    <header className="bg-red-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 hover:text-red-100 transition-colors">
          <Pocket className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Pokémon Explorer</h1>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
