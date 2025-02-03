'use client';

import {
  Film,
  Search,
  Moon,
  Sun,
  ChevronRight,
  ChevronDown,
  X,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '../ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '../ui/badge';

export function Header() {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSearch = () => {
    setIsSearchVisible((prev) => !prev);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-20 h-[59px] bg-background flex items-center justify-between mx-auto max-w-[1280px] px-5">
      <div className="flex gap-2 text-indigo-700">
        <Film />
        <button className="font-inter text-xl italic font-bold leading-5 tracking-[0.32px]">
          MovieZ
        </button>
      </div>

      <div className="hidden md:flex md:gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex w-[97px] h-[36px] p-2.5 px-4 justify-center items-center gap-2 rounded-md border hover:bg-slate-100 duration-75 ease-in-out">
            <ChevronDown />
            Genre
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-[580px] h-[300] p-5">
            <h1 className="font-bold text-2xl">Genres</h1>
            <h2 className="text-base">See list of movies by genre</h2>
            <DropdownMenuSeparator className="mt-3 mb-3" />
            <Badge variant={'secondary'} className="mr-4 mb-4 cursor-pointer">
              Action
              <ChevronRight className="stroke-1" />
            </Badge>
            <Badge variant={'secondary'} className="mr-4 mb-4 cursor-pointer">
              Adventure
              <ChevronRight className="stroke-1" />
            </Badge>
            <Badge variant={'secondary'} className="mr-4 mb-4 cursor-pointer">
              Animation
              <ChevronRight className="stroke-1" />
            </Badge>
            <Badge variant={'secondary'} className="mr-4 mb-4 cursor-pointer">
              Comedy
              <ChevronRight className="stroke-1" />
            </Badge>
            <Badge variant={'secondary'} className="mr-4 mb-4 cursor-pointer">
              Crime
              <ChevronRight className="stroke-1" />
            </Badge>
            <Badge variant={'secondary'} className="mr-4 mb-4 cursor-pointer">
              Documentary
              <ChevronRight className="stroke-1" />
            </Badge>
            <Badge variant={'secondary'} className="mr-4 mb-4 cursor-pointer">
              Drama
              <ChevronRight className="stroke-1" />
            </Badge>
            <Badge variant={'secondary'} className="mr-4 mb-4 cursor-pointer">
              Family
              <ChevronRight className="stroke-1" />
            </Badge>
            <Badge variant={'secondary'} className="mr-4 mb-4 cursor-pointer">
              Fantasy
              <ChevronRight className="stroke-1" />
            </Badge>
            <Badge variant={'secondary'} className="mr-4 mb-4 cursor-pointer">
              History
              <ChevronRight className="stroke-1" />
            </Badge>
            <Badge variant={'secondary'} className="mr-4 mb-4 cursor-pointer">
              Horror
              <ChevronRight className="stroke-1" />
            </Badge>
            <Badge variant={'secondary'} className="mr-4 mb-4 cursor-pointer">
              Music
              <ChevronRight className="stroke-1" />
            </Badge>
            <Badge variant={'secondary'} className="mr-4 mb-4 cursor-pointer">
              Mystery
              <ChevronRight className="stroke-1" />
            </Badge>
            <Badge variant={'secondary'} className="mr-4 mb-4 cursor-pointer">
              Romance
              <ChevronRight className="stroke-1" />
            </Badge>
            <Badge variant={'secondary'} className="mr-4 mb-4 cursor-pointer">
              Science Fiction
              <ChevronRight className="stroke-1" />
            </Badge>
            <Badge variant={'secondary'} className="mr-4 mb-4 cursor-pointer">
              TV Movie
              <ChevronRight className="stroke-1" />
            </Badge>
            <Badge variant={'secondary'} className="mr-4 cursor-pointer">
              Thriller
              <ChevronRight className="stroke-1" />
            </Badge>
            <Badge variant={'secondary'} className="mr-4 cursor-pointer">
              War
              <ChevronRight className="stroke-1" />
            </Badge>
            <Badge variant={'secondary'} className="mr-4 cursor-pointer">
              Western
              <ChevronRight className="stroke-1" />
            </Badge>
          </DropdownMenuContent>
        </DropdownMenu>
        <Input placeholder="Search" className="h-[36px] w-[379px]" />
      </div>

      <div
        className={`absolute top-0 left-0 flex justify-between items-center h-[59px] px-5 bg-background w-full transition-all duration-300 ease-in-out ${
          isSearchVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-[-100px]'
        } md:hidden`}
      >
        <div className="absolute top-3 left-20">
          <Search className="absolute top-2 left-2 w-[18px] h-[18px]" />
          <Input
            placeholder="Search"
            className="h-[36px] pl-9"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex justify-center items-center border rounded w-9 h-9">
                <ChevronDown className="text-white" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[330px] p-5 ml-5">
              <h1 className="font-bold text-2xl">Genres</h1>
              <h2 className="text-base">See list of movies by genre</h2>
              <DropdownMenuSeparator className="mt-3 mb-3" />

              <Badge variant={'secondary'} className="mr-4 mb-4 cursor-pointer">
                Action
                <ChevronRight className="stroke-1" />
              </Badge>
              <Badge variant={'secondary'} className="mr-4 mb-4 cursor-pointer">
                Adventure
                <ChevronRight className="stroke-1" />
              </Badge>
              <Badge variant={'secondary'} className="mr-4 mb-4 cursor-pointer">
                Animation
                <ChevronRight className="stroke-1" />
              </Badge>
              <Badge variant={'secondary'} className="mr-4 mb-4 cursor-pointer">
                Comedy
                <ChevronRight className="stroke-1" />
              </Badge>
              <Badge variant={'secondary'} className="mr-4 mb-4 cursor-pointer">
                Crime
                <ChevronRight className="stroke-1" />
              </Badge>
              <Badge variant={'secondary'} className="mr-4 mb-4 cursor-pointer">
                Documentary
                <ChevronRight className="stroke-1" />
              </Badge>
              <Badge variant={'secondary'} className="mr-4 mb-4 cursor-pointer">
                Drama
                <ChevronRight className="stroke-1" />
              </Badge>
              <Badge variant={'secondary'} className="mr-4 mb-4 cursor-pointer">
                Family
                <ChevronRight className="stroke-1" />
              </Badge>
              <Badge variant={'secondary'} className="mr-4 mb-4 cursor-pointer">
                Fantasy
                <ChevronRight className="stroke-1" />
              </Badge>
              <Badge variant={'secondary'} className="mr-4 mb-4 cursor-pointer">
                History
                <ChevronRight className="stroke-1" />
              </Badge>
              <Badge variant={'secondary'} className="mr-4 mb-4 cursor-pointer">
                Horror
                <ChevronRight className="stroke-1" />
              </Badge>
              <Badge variant={'secondary'} className="mr-4 mb-4 cursor-pointer">
                Music
                <ChevronRight className="stroke-1" />
              </Badge>
              <Badge variant={'secondary'} className="mr-4 mb-4 cursor-pointer">
                Mystery
                <ChevronRight className="stroke-1" />
              </Badge>
              <Badge variant={'secondary'} className="mr-4 mb-4 cursor-pointer">
                Romance
                <ChevronRight className="stroke-1" />
              </Badge>
              <Badge variant={'secondary'} className="mr-4 mb-4 cursor-pointer">
                Science Fiction
                <ChevronRight className="stroke-1" />
              </Badge>
              <Badge variant={'secondary'} className="mr-4 mb-4 cursor-pointer">
                TV Movie
                <ChevronRight className="stroke-1" />
              </Badge>
              <Badge variant={'secondary'} className="mr-4 mb-4 cursor-pointer">
                Thriller
                <ChevronRight className="stroke-1" />
              </Badge>
              <Badge variant={'secondary'} className="mr-4 cursor-pointer">
                War
                <ChevronRight className="stroke-1" />
              </Badge>
              <Badge variant={'secondary'} className="mr-4 cursor-pointer">
                Western
                <ChevronRight className="stroke-1" />
              </Badge>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button variant="outline" onClick={toggleSearch}>
          <X className="" />
        </Button>
      </div>

      <div className="flex gap-4 items-center">
        <Button
          variant="outline"
          className="w-9 h-9 md:hidden"
          onClick={toggleSearch}
        >
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
    </header>
  );
}

export default Header;
