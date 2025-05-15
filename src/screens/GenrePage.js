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
  const fallbackImage = 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?q=80&w=2076&auto=format&fit=crop';

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

  useEffect(() => {
    const normalizedName = genreName.toLowerCase().replace('-', ' ');
    const id = genreMap[normalizedName] || genreMap[genreName];
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
        const response = await axios.get(`/api/tmdb/genre/${genreId}`);
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching genre movies:', error);
        setError('Failed to load movies.');
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
        } drop-shadow-lg`}
      >
        {genreName.replace('-', ' ')} Movies
      </h2>
      {error && <p className="text-red-500 mb-6 text-center font-medium">{error}</p>}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color={darkMode ? '#ffffff' : '#1f2937'} size={60} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div
                key={movie.id}
                className={`p-4 rounded-2xl shadow-lg ${
                  darkMode ? 'bg-gray-800/30 backdrop-blur-lg text-white' : 'bg-white/30 backdrop-blur-lg text-gray-900'
                } border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-64 object-cover rounded-md mb-4"
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