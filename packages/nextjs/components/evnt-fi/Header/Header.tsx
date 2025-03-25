"use client";

import React, { useState } from 'react';
import { Menu, ChevronDown, Dog } from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';
import { ThemeToggle } from '../theme/ThemeToggle';

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Quest', href: '#quest' },
  { label: 'Rewards', href: '#rewards' },
  { label: 'Stats', href: '#stats' },
  { label: 'Help', href: '#help' },
];

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <>
      <header className={`flex justify-between items-center p-4 md:p-6 ${
        theme === 'dark' ? 'text-white' : 'text-gray-800'
      }`}>
        <div className="flex items-center gap-2">
          <Dog className={`w-8 h-8 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
          <span className="text-xl hidden md:inline">My Awesome Airdrop</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="hover:text-blue-500 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button className={`flex items-center gap-2 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow-md'
          } rounded-full px-4 py-2`}>
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <ChevronDown />
          </button>
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`md:hidden ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } p-4`}>
          <nav className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-blue-500 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}; 