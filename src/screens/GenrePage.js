import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

const GenrePage = ({ darkMode }) => {
  const { genreName } = useParams();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [genreId, setGenreId] = useState(null);

  // Replace with your TMDB API key
  const TMDB_API_KEY = 'YOUR_TMDB_API_KEY_HERE';

  const genreMap = {
    action: 28,
    adventure: 12,
    animation: 16,
    comedy: 35,
    crime: 80,
    documentary: 99,
    drama: 18,
    family: 10751,
    fantasy: 14,
    history: 36,
    horror: 27,
    music: 10402,
    mystery: 9648,
    romance: 10749,
    'science-fiction': 878,
    'sci-fi': 878,
    'tv-movie': 10770,
    thriller: 53,
    war: 10752,
    western: 37,
  };

  const fallbackImage = 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?q=80&w=2076&auto=format&fit=crop';

  useEffect(() => {
    const normalizedName = genreName.toLowerCase().replace('-', ' ');
    const id = genreMap[normalizedName] || genreMap[genreName];
    console.log('Genre Name:', genreName, 'Normalized:', normalizedName, 'Genre ID:', id); // Debug
    if (id) {
      setGenreId(id);
    } else {
      setError('Genre not found.');
      setLoading(false);
    }
  }, [genreName]);

  useEffect(() => {
    if (!genreId) return;

    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
          params: {
            api_key: TMDB_API_KEY,
            with_genres: genreId,
            language: 'en-US',
            sort_by: 'popularity.desc',
            page: 1,
          },
        });
        console.log('TMDB API Response:', response.data); // Debug
        // TMDB response contains a 'results' array
        const movieData = response.data.results || [];
        setMovies(movieData);
      } catch (error) {
        console.error('Error fetching genre movies from TMDB:', error);
        setError('Failed to load movies.');
        setMovies([]); // Ensure movies is an array on error
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [genreId]);

  return (
    <div className={`py-12 px-6 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-gray-100 to-gray-200'}`}>
      <h2
        className={`text-4xl font-extrabold mb-10 capitalize ${
          darkMode ? 'text-white' : 'text-gray-900'
        } drop-shadow-lg animate-fade-in`}
      >
        {genreName.replace('-', ' ')} Movies
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
                } border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}
              >
                <img
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : fallbackImage}
                  alt={movie.title}
                  className="w-full h-64 object-cover rounded-md mb-4 transition-opacity duration-300 hover:opacity-90"
                  onError={(e) => (e.target.src = fallbackImage)}
                />
                <h3 className="text-lg font-semibold truncate">{movie.title}</h3>
                <p className="text-sm">Rating: {movie.vote_average}/10</p>
              </div>
            ))
          ) : (
            <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              No movies available.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default GenrePage;