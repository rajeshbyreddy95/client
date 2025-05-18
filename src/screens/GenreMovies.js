import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { useParams } from 'react-router-dom';

const GenreMovies = ({ darkMode}) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const {genreName} = useParams();

  console.log(genreId);
  

  // Map genre IDs to names for dynamic titles
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

  const fallbackImage = 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?q=80&w=2076&auto=format&fit=crop';

  useEffect(() => {
    const fetchByGenre = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://cineflixserver-nine.vercel.app/api/genre/${genreId}`);
        console.log('Genre Movies API Response:', response.data); // Debug
        const movieData = Array.isArray(response.data) ? response.data : response.data.results || [];
        setMovies(movieData);
      } catch (error) {
        console.error('Error fetching genre movies:', error.response?.data || error.message);
        setError('Failed to load genre movies.');
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };
    fetchByGenre();
  }, [genreId]);

  const handleAddFavorite = async (movie) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to add favorites');
        return;
      }
      await axios.post(
        '/api/favourites',
        {
          itemId: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          type: 'movie',
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Added to favorites!');
    } catch (error) {
      console.error('Error adding favorite:', error.response?.data || error.message);
      alert('Failed to add favorite.');
    }
  };

  return (
    <div className={`py-12 px-6 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-gray-100 to-gray-200'}`}>
      <h2
        className={`text-4xl font-extrabold mb-10 text-center tracking-tight ${
          darkMode ? 'text-white' : 'text-gray-900'
        } drop-shadow-lg animate-fade-in`}
      >
        {genreMap[genreId] || 'Genre'} Movies
      </h2>
      {error && <p className="text-red-500 mb-6 text-center font-medium animate-pulse">{error}</p>}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color={darkMode ? '#ffffff' : '#1f2937'} size={60} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {Array.isArray(movies) && movies.length > 0 ? (
            movies.map((movie) => (
              <div
                key={movie.id}
                className={`p-4 rounded-2xl shadow-lg ${
                  darkMode ? 'bg-gray-800/30 backdrop-blur-lg text-white' : 'bg-white/30 backdrop-blur-lg text-gray-900'
                } border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transform transition-all duration-300 hover:scale-105 hover:shadow-xl group`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleAddFavorite(movie)}
                aria-label={`Add ${movie.title} to favorites`}
              >
                <img
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : fallbackImage}
                  alt={movie.title}
                  className="w-full h-64 object-cover rounded-md mb-4 transition-opacity duration-300 group-hover:opacity-90"
                  onError={(e) => (e.target.src = fallbackImage)}
                />
                <h3 className="text-lg font-semibold truncate">{movie.title}</h3>
                <p className="text-sm mb-4">Rating: {movie.vote_average}/10</p>
                <button
                  onClick={() => handleAddFavorite(movie)}
                  className={`w-full px-4 py-2 rounded-lg ${
                    darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                  } text-white font-medium transition-colors duration-300`}
                >
                  Add to Favorites
                </button>
              </div>
            ))
          ) : (
            <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              No movies available. {genreId}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default GenreMovies;