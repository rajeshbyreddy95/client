import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

const Genres = ({ darkMode }) => {
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fallback image
  const fallbackImage = 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?q=80&w=2076&auto=format&fit=crop';

  // Normalize genre names for URL (e.g., "Science Fiction" -> "science-fiction")
  const normalizeGenreName = (name) => {
    const genreMap = {
      'science fiction': 'sci-fi',
      'sci-fi': 'sci-fi',
      // Add more mappings as needed
    };
    const lowerName = name.toLowerCase();
    return genreMap[lowerName] || lowerName.replace(/\s+/g, '-');
  };

  const fetchGenres = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://cineflixserver-nine.vercel.app/api/genres');
      console.log('Genres from API:', response.data); // Debug
      setGenres(response.data);
    } catch (error) {
      console.error('Error fetching genres:', error);
      setError('Failed to load genres. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  
  return (
    <div className={`py-12 px-6 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-gray-100 to-gray-200'}`}>
      <h2
        className={`text-4xl font-extrabold mb-8 text-center tracking-tight ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}
      >
        Discover Genres
      </h2>
      {error && (
        <p className="text-red-500 text-center mb-6 font-medium">{error}</p>
      )}
      {loading ? (
        <div className="flex justify-center">
          <ClipLoader color={darkMode ? '#ffffff' : '#1f2937'} size={50} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {genres.length > 0 ? (
            genres.map((genre) => (
              <div
                key={genre.id}
                onClick={() => navigate(`/genre/${genre.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && navigate(`/genre/${genre.id}`)}
                className={`relative group cursor-pointer rounded-2xl overflow-hidden shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                  darkMode
                    ? 'bg-gray-800/50 backdrop-blur-md'
                    : 'bg-white/50 backdrop-blur-md'
                } border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
              >
                {/* Genre Image */}
                <img
                  src={genre.poster_path || fallbackImage}
                  alt={genre.name}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => (e.target.src = fallbackImage)}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                {/* Genre Name */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h3
                    className={`text-2xl font-bold ${
                      darkMode ? 'text-white' : 'text-white'
                    } group-hover:text-blue-300 transition-colors duration-300 drop-shadow-md`}
                  >
                    {genre.name}
                  </h3>
                </div>
                {/* Hover Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-lg font-semibold bg-blue-600 px-6 py-3 rounded-full shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                    Explore Now
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              No genres available.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Genres;