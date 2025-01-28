'use client';

import React, { useEffect } from 'react';
import { Film, Search, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Input } from '../ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const { theme, setTheme } = useTheme();

  const isDarkMode = theme === 'dark';

  return (
    <div className="m-5 flex justify-between items-center">
      <div className="flex gap-2 text-indigo-700">
        <Film />
        <button className="font-inter text-xl italic font-bold leading-5 tracking-[0.32px]">
          MovieZ
        </button>
      </div>
      <div className="hidden md:flex">
        <DropdownMenu>
          <DropdownMenuTrigger>Genre</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Genres</DropdownMenuLabel>
            <DropdownMenuLabel>See list of movies by genre</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Input placeholder="Search" />
      </div>
      <div className="flex gap-3">
        <Button variant="outline" className="w-9 h-9 md:hidden">
          <Search />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
          aria-label="Toggle theme"
          className="w-9 h-9"
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>
    </div>
  );
}

export default Header;
