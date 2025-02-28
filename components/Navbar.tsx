import React from 'react';
import Link from 'next/link';
import { Pocket } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Pocket className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Pokémon Explorer</h1>
        </Link>
      </div>
    </header>
  );
}