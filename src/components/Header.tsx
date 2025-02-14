import React from 'react';
import { Menu } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex justify-between items-center p-4">
        <button className="p-2" aria-label="Menu">
          <Menu className="w-6 h-6" />
        </button>
        <img src="./logo.png" alt="Be Lazy Crazy" className="h-8" />
        <div className="w-6" /> {/* Spacer for alignment */}
      </div>
    </header>
  );
};

export default Header; 