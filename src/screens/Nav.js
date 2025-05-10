import React, { useState } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react'; // Added Menu and X icons

const Nav = ({darkMode, setDarkMode}) => {
  
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDark = () => setDarkMode(!darkMode);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className={`w-full shadow-md px-6 py-4 flex items-center justify-between flex-wrap ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      
      {/* Left: Logo */}
      <div className="font-bold text-2xl tracking-wide text-red-600">
        CineFlix
      </div>

      {/* Hamburger Button */}
      <div className="lg:hidden">
        <button onClick={toggleMenu} className="text-gray-600 dark:text-gray-300 focus:outline-none">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Center + Right: Links and Search */}
      <div className={`w-full lg:flex lg:items-center lg:w-auto ${menuOpen ? 'block' : 'hidden'} mt-4 lg:mt-0`}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-6 gap-4">
          <a href="#" className="hover:text-red-500 transition">Home</a>
          <a href="#" className="hover:text-red-500 transition">Movies</a>
          <a href="#" className="hover:text-red-500 transition">TV Shows</a>
          <a href="#" className="hover:text-red-500 transition">My List</a>

          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 w-full lg:w-auto"
          />
        </div>

        {/* Right: Dark Mode Toggle */}
        <div className="mt-4 lg:mt-0 lg:ml-4">
          <button
            onClick={toggleDark}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-red-100 transition"
            title="Toggle Theme"
          >
            {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-700" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
