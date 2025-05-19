import React, { useState } from 'react';
import { Sun, Moon, Menu, X, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Nav = ({ darkMode, setDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [genresOpen, setGenresOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDark = () => setDarkMode(!darkMode);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleGenres = () => setGenresOpen(!genresOpen);
  
  const genreMap = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
  };

  const handleGenreClick = (genreId) => {
    navigate(`/genre/${genreId}`);
    setGenresOpen(false); // Close dropdown on selection
    setMenuOpen(false); // Close mobile menu on selection
  };

  return (
    <nav
      className={`w-full shadow-lg px-6 py-4 sticky top-0 z-50 transition-all duration-300 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap">
        {/* Left: Logo */}
        <div className="font-extrabold text-3xl tracking-tight text-red-600 hover:text-red-700 transition-colors">
          <a href="/">CineFlix</a>
        </div>

        {/* Hamburger Button (Mobile) */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-600 dark:text-gray-300 hover:text-red-500 focus:outline-none transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Center + Right: Links, Search, and Dark Mode */}
        <div
          className={`w-full lg:flex lg:items-center lg:w-auto ${
            menuOpen ? 'block' : 'hidden'
          } mt-4 lg:mt-0 transition-all duration-300`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8 gap-4 text-lg font-medium">
            <a
              href="/"
              className="hover:text-red-500 transition-colors py-2 lg:py-0"
            >
              Home
            </a>
            <a
              href="/movies"
              className="hover:text-red-500 transition-colors py-2 lg:py-0"
            >
              Movies
            </a>
            <a
              href="/tv-shows"
              className="hover:text-red-500 transition-colors py-2 lg:py-0"
            >
              TV Shows
            </a>
            <a
              href="/my-list"
              className="hover:text-red-500 transition-colors py-2 lg:py-0"
            >
              My List
            </a>

            {/* Genres Dropdown */}
            <div className="relative">
              <button
                onClick={toggleGenres}
                onMouseEnter={() => setGenresOpen(true)}
                className="flex items-center hover:text-red-500 transition-colors py-2 lg:py-0 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={genresOpen}
              >
                Genres
                <ChevronDown
                  size={20}
                  className={`ml-1 transition-transform ${
                    genresOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                onMouseLeave={() => setGenresOpen(false)}
                className={`${
                  genresOpen ? 'block' : 'hidden'
                } lg:absolute lg:top-full lg:left-0 mt-2 lg:mt-0 w-full lg:w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2 z-50 transition-opacity duration-200`}
              >
                {Object.entries(genreMap).map(([id, name]) => (
                  <button
                    key={id}
                    onClick={() => handleGenreClick(id)}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-red-100 hover:text-red-600 dark:hover:bg-gray-700 dark:hover:text-red-400 transition-colors"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search movies..."
              className={`px-4 py-2 rounded-full border ${
                darkMode
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-gray-100 border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-red-500 transition w-full lg:w-64`}
            />
          </div>

          {/* Right: Dark Mode Toggle */}
          <div className="mt-4 lg:mt-0 lg:ml-6">
            <button
              onClick={toggleDark}
              className={`p-2 rounded-full ${
                darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'
              } transition-colors`}
              title="Toggle Theme"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun size={24} className="text-yellow-400" />
              ) : (
                <Moon size={24} className="text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;