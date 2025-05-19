import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, AlertCircle, Trash2 } from 'lucide-react';

const Fav = ({ darkMode }) => {
  const [favorites, setFavorites] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ message: '', type: '', visible: false });
  const navigate = useNavigate();

  // Fetch favorites and movie details
  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to view your favorites');
        setTimeout(() => navigate('/login'), 2000);
        setLoading(false);
        return;
      }

      try {
        // Fetch favorite movie IDs
        const favResponse = await axios.get(
          'https://cineflixserver-nine.vercel.app/api/favourites',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const movieIds = favResponse.data.movieIds || [];
        setFavorites(movieIds);

        // Fetch details for each movie
        const detailsPromises = movieIds.map((id) =>
          axios.get(`https://cineflixserver-nine.vercel.app/api/movieDetails/${id}`)
        );
        const detailsResponses = await Promise.all(detailsPromises);
        const movies = detailsResponses.map((res) => res.data);
        setMovieDetails(movies);
        setLoading(false);
      } catch (err) {
        console.error('Fetch favorites error:', err.response?.data);
        setError(err.response?.data?.message || 'Failed to load favorites');
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [navigate]);

  // Remove favorite
  const handleRemoveFavorite = async (movieId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setToast({
        message: 'Please log in to remove from favorites',
        type: 'error',
        visible: true,
      });
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    try {
      await axios.delete(
        `https://cineflixserver-nine.vercel.app/api/favourites/${movieId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFavorites(favorites.filter((id) => id !== movieId));
      setMovieDetails(movieDetails.filter((movie) => movie.id !== movieId));
      setToast({
        message: 'Movie removed from favorites!',
        type: 'success',
        visible: true,
      });
    } catch (error) {
      console.error('Remove favorite error:', error.response?.data);
      setToast({
        message: error.response?.data?.message || 'Failed to remove from favorites',
        type: 'error',
        visible: true,
      });
    }
  };

  // Auto-hide toast
  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        setToast({ ...toast, visible: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  if (loading) {
    return (
      <div className={`flex items-center justify-center h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-t-purple-500 border-gray-300 rounded-full animate-spin"></div>
          <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} animate-pulse`}>
            Loading Favorites...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <span className={`text-2xl font-semibold ${darkMode ? 'text-red-400' : 'text-red-600'}`}>{error}</span>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} font-sans py-6 sm:py-8`}>
      {/* Toast Notification */}
      {toast.visible && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in max-w-sm ${
            toast.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {toast.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span className="text-sm font-semibold">{toast.message}</span>
        </div>
      )}

      {/* Favorites Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-6 sm:mb-8 text-yellow-300 animate-fade-in">
          Your Favorite Movies
        </h1>
        {movieDetails.length === 0 ? (
          <p className="text-center text-lg sm:text-xl text-gray-200 animate-fade-in">
            No favorites yet. Add some movies to your watchlist!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {movieDetails.map((movie) => (
              <div
                key={movie.id}
                className={`bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 animate-fade-in ${
                  darkMode ? 'hover:shadow-purple-500/50' : 'hover:shadow-blue-500/50'
                }`}
              >
                <img
                  src={movie.poster || 'https://via.placeholder.com/300x450?text=No+Poster'}
                  alt={movie.title}
                  className="w-full h-64 sm:h-80 object-cover"
                />
                <div className="p-4 sm:p-5">
                  <h3 className="text-lg sm:text-xl font-semibold text-white truncate">{movie.title}</h3>
                  <p className="text-sm sm:text-base text-gray-200">
                    Rating: {movie.rating.toFixed(1)}/10
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <button
                      onClick={() => navigate(`/movie/${movie.id}`)}
                      className="bg-red-500 hover:bg-red-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-white font-semibold text-sm sm:text-base shadow-md transform hover:scale-105 transition-all duration-200"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleRemoveFavorite(movie.id)}
                      className="bg-gray-700 hover:bg-gray-800 p-2 rounded-full text-white shadow-md transform hover:scale-105 transition-all duration-200"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Inline styles (reuse from MovieDetails.js)
const styles = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fade-in 1s ease-out;
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  .animate-spin {
    animation: spin 1s linear infinite;
  }
`;

const styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Fav;