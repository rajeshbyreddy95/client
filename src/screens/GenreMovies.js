import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { useNavigate, useParams } from 'react-router-dom';

const GenreMovies = ({ darkMode }) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Added for pagination

  const { genreId } = useParams();
  const genreKey = parseInt(genreId);
  const navigate = useNavigate()

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

  const fallbackImage = 'https://via.placeholder.com/500x750?text=No+Image';
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;

  useEffect(() => {
   const fetchByGenre = async () => {
  if (!genreKey || !genreMap[genreKey]) {
    setError('Invalid genre.');
    setLoading(false);
    return;
  }

  if (!apiKey) {
    setError('API key is missing. Please check configuration.');
    setLoading(false);
    return;
  }

  setLoading(true);
  try {
    const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
      params: {
        api_key: apiKey,
        with_genres: genreKey,
        language: 'en-US',
        sort_by: 'popularity.desc',
        page: page,
      },
    });

    const movieData = response.data.results || [];
    setMovies(movieData);

    if (movieData.length === 0) {
      setError('No movies found for this genre.');
    }
  } catch (error) {
    console.error('TMDB API Error:', error);
    setError(error.response?.data?.status_message || 'Failed to load genre movies.');
    setMovies([]);
  } finally {
    setLoading(false);
  }
};

    fetchByGenre();
  }, [genreKey, page]); // Removed apiKey, added page

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(1, prev - 1));

  return (
    <div className={`py-12 px-6 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-gray-100 to-gray-200'}`}>
      <h2
        className={`text-4xl font-extrabold mb-10 text-center tracking-tight ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}
      >
        {genreMap[genreKey] || 'Unknown Genre'} Movies
      </h2>

      {error && <p className="text-red-500 text-center mb-6">{error}</p>}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color={darkMode ? '#fff' : '#000'} size={60} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {movies.length > 0 ? (
              movies.map((movie) => (
                <div
                  key={movie.id}
                  className={`p-4 rounded-2xl shadow-lg cursor-pointer ${
                    darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                  } border hover:scale-105 transition`}
                  onClick={() => navigate(`/movieDetails/${movie.id}`)}
                >
                  <img
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : fallbackImage}
                    alt={movie.title}
                    className="w-full h-64 object-cover rounded mb-4"
                  />
                  <h3 className="text-lg font-semibold">{movie.title}</h3>
                  <p className="text-sm mb-2">Rating: {movie.vote_average}/10</p>
                </div>
              ))
            ) : (
              <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                No movies available.
              </p>
            )}
          </div>

          {/* Pagination Controls */}
          {movies.length > 0 && (
            <div className="flex justify-center mt-6 space-x-4">
              <button
                onClick={handlePrevPage}
                disabled={page === 1}
                className={`px-4 py-2 rounded ${
                  page === 1
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                Previous
              </button>
              <span className={`text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Page {page}
              </span>
              <button
                onClick={handleNextPage}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GenreMovies;