import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopRatedMovies = ({ darkMode }) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTopRated = async () => {
      try {
        const response = await axios.get('/api/tmdb/top-rated');
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching top-rated movies:', error);
        setError('Failed to load top-rated movies.');
      }
    };
    fetchTopRated();
  }, []);

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
      console.error('Error adding favorite:', error);
      alert('Failed to add favorite.');
    }
  };

  return (
    <div className="py-8 px-4">
      <h2
        className={`text-2xl font-bold mb-4 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}
      >
        Top-Rated Movies
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div
              key={movie.id}
              className={`p-4 rounded-lg shadow-lg ${
                darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
              }`}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold">{movie.title}</h3>
              <p className="text-sm">Rating: {movie.vote_average}/10</p>
              <button
                onClick={() => handleAddFavorite(movie)}
                className={`mt-2 px-4 py-2 rounded ${
                  darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
              >
                Add to Favorites
              </button>
            </div>
          ))
        ) : (
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Loading movies...
          </p>
        )}
      </div>
    </div>
  );
};

export default TopRatedMovies;