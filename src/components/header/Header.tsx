import React from 'react';
import { Film, Search, Moon, Sun } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const Header = () => {
  return (
    <div className="m-5 flex justify-between items-center">
      <div className="flex">
        <Film className="text-indigo-700" />
        <button className="text-indigo-700">MovieZ</button>
      </div>
      <div></div>
    </div>
  );
};

export default Header;
