'use client';

import React, { useEffect, useState } from 'react';
import { Film, Search, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ModeToggle() {
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
      <div className="flex gap-3">
        <Button variant="outline" className="w-9 h-9">
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

export default ModeToggle;
