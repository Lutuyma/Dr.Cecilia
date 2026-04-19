"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-[var(--color-primary)] text-white z-50 shadow-sm border-b border-[var(--color-accent)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="#" className="font-playfair font-bold text-2xl tracking-tight text-[var(--color-accent)]">
              Dra. Cecília António
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <Link href="#sobre" className="hover:text-[var(--color-accent)] transition-colors px-3 py-2 rounded-md text-sm font-medium">Sobre</Link>
              <Link href="#servicos" className="hover:text-[var(--color-accent)] transition-colors px-3 py-2 rounded-md text-sm font-medium">Serviços</Link>
              <Link href="#formacao" className="hover:text-[var(--color-accent)] transition-colors px-3 py-2 rounded-md text-sm font-medium">Formação</Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:text-[var(--color-accent)] hover:bg-black/20 focus:outline-none"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[var(--color-primary)] border-t border-[var(--color-accent)]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
            <Link href="#sobre" className="block hover:text-[var(--color-accent)] hover:bg-black/20 px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Sobre</Link>
            <Link href="#servicos" className="block hover:text-[var(--color-accent)] hover:bg-black/20 px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Serviços</Link>
            <Link href="#formacao" className="block hover:text-[var(--color-accent)] hover:bg-black/20 px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Formação</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
