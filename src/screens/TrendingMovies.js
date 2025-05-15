import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosRetry from 'axios-retry';

// Configure Axios with retry
const client = axios.create();
axiosRetry(client, { retries: 3, retryDelay: (retryCount) => retryCount * 1000 });

const TrendingMovies = ({ darkMode }) => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        console.log('Fetching trending movies...');
        const response = await client.get('https://cineflixserver-nine.vercel.app/api/trending', {
          timeout: 10000,
        });
        console.log('Movies fetched:', response.data);
        setMovies(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Axios Error:', {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data,
          url: err.config?.url,
        });
        const errorMessage = err.message.includes('CORS')
          ? 'CORS Error: Unable to connect to server. Please check backend configuration.'
          : `Failed to load trending movies: ${err.response?.data?.details || err.message}`;
        setError(errorMessage);
        setLoading(false);
      }
    };
    fetchTrendingMovies();
  }, []);

  if (loading) {
    return (
      <div className={`flex items-center justify-center h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-t-purple-500 border-gray-300 rounded-full animate-spin"></div>
          <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} animate-pulse`}>
            Loading Trending Movies...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="text-center">
          <span className={`text-2xl font-semibold ${darkMode ? 'text-red-400' : 'text-red-600'}`}>{error}</span>
          <p className={`mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {error.includes('CORS')
              ? 'Ensure the backend allows requests from http://localhost:3000.'
              : 'Please try refreshing the page or check back later.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 px-6 py-2 rounded-full text-white font-semibold"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} font-sans py-6 sm:py-8`}>
      <div className="max-w-9xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-6 sm:mb-8 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent animate-fade-in">
          Trending Movies
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
          {movies.slice(0,10).map((movie) => (
            <div
              key={movie.id}
              className="group relative bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl overflow-hidden animate-slide-up"
              onClick={() => navigate(`/movieDetails/${movie.id}`)}
            >
              <img
                src={movie.poster || 'https://via.placeholder.com/300x450?text=No+Poster'}
                alt={movie.title}
                className="w-full h-64 sm:h-80 object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <h2 className="text-base sm:text-lg font-bold text-white truncate">{movie.title}</h2>
                <p className="text-xs sm:text-sm text-gray-200">{movie.releaseYear}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs sm:text-sm text-yellow-300 font-semibold">{movie.rating.toFixed(1)}/10</span>
                  
                </div>
              </div>
              <div className="absolute inset-0 bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center">
                  <button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 px-4 sm:px-6 py-2 rounded-full text-white font-semibold text-sm sm:text-base shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto">
                    <span>▶</span> View Details
                  </button>
                  {movie.cast && movie.cast.length > 0 && (
                    <div className="mt-2 text-xs sm:text-sm text-white">
                      <p className="font-semibold">Starring:</p>
                      <p>{movie.cast.slice(0, 3).map(actor => actor.name).join(', ')}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Inline styles for animations
const styles = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fade-in 1s ease-out;
  }
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-slide-up {
    animation: slide-up 0.8s ease-out;
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  .animate-spin {
    animation: spin 1s ascension: linear infinite;
  }
`;

const styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default TrendingMovies;