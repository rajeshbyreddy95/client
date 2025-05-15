import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Genres = ({ darkMode }) => {
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Static images for genres (fallback if dynamic images aren’t used)
  const genreImages = {
    Action: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2070&auto=format&fit=crop',
    Adventure: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop',
    Comedy: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=2070&auto=format&fit=crop',
    Drama: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop',
    Horror: 'https://images.unsplash.com/photo-1509460913899-515f1df34fea?q=80&w=1974&auto=format&fit=crop',
    Romance: 'https://images.unsplash.com/photo-1517598024396-46c53d51e587?q=80&w=1974&auto=format&fit=crop',
    'Science Fiction': 'https://images.unsplash.com/photo-1446941611757-91d05378651d?q=80&w=1974&auto=format&fit=crop',
    Thriller: 'https://images.unsplash.com/photo-1535016125310-46e2fbdc42f4?q=80&w=2070&auto=format&fit=crop',
  };

  const fetchGenres = async () => {
    try {
      const response = await axios.get('https://cineflixserver-nine.vercel.app/api/genres');
      setGenres(response.data);
    } catch (error) {
      console.error('Error fetching genres:', error);
      setError('Failed to load genres. Please try again.');
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const handleGenreClick = (genreName) => {
    // Convert genre name to lowercase and replace spaces with hyphens
    const formattedName = genreName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/genre/${formattedName}`);
  };

  return (
    <div className={`py-8 px-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <h2
        className={`text-3xl font-bold mb-6 text-center ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}
      >
        Explore Genres
      </h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {genres.length > 0 ? (
          genres.map((genre) => (
            <div
              key={genre.id}
              onClick={() => handleGenreClick(genre.name)}
              className={`relative group cursor-pointer rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              {/* Genre Image */}
              <img
                src={genreImages[genre.name] || 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?q=80&w=2076&auto=format&fit=crop'}
                alt={genre.name}
                className="w-full h-48 object-cover transition-opacity duration-300 group-hover:opacity-80"
              />
              {/* Overlay with Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              {/* Genre Name */}
              <div className="absolute bottom-4 left-4">
                <h3
                  className={`text-xl font-semibold ${
                    darkMode ? 'text-white' : 'text-white'
                  } group-hover:text-blue-400 transition-colors duration-300`}
                >
                  {genre.name}
                </h3>
              </div>
              {/* Hover Effect */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-lg font-medium bg-blue-600 px-4 py-2 rounded-full">
                  Explore
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Loading genres...
          </p>
        )}
      </div>
    </div>
  );
};

export default Genres;