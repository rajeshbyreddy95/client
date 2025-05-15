import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Series = ({ darkMode }) => {
  const [series, setSeries] = useState([]);
  const [error, setError] = useState('');

  const fetchSeries = async () => {
    try {
      const response = await axios.get('/api/tmdb/series');
      setSeries(response.data);
    } catch (error) {
      console.error('Error fetching series:', error);
      setError('Failed to load series. Please try again.');
    }
  };

  const handleAddFavorite = async (show) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to add favorites');
        return;
      }
      await axios.post(
        '/api/favourites',
        {
          itemId: show.id,
          title: show.name,
          poster_path: show.poster_path,
          type: 'series',
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Added to favorites!');
    } catch (error) {
      console.error('Error adding favorite:', error);
      alert('Failed to add favorite.');
    }
  };

  useEffect(() => {
    fetchSeries();
  }, []);

  return (
    <div className="py-8 px-4">
      <h2
        className={`text-2xl font-bold mb-4 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}
      >
        Popular Series
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {series.length > 0 ? (
          series.map((show) => (
            <div
              key={show.id}
              className={`p-4 rounded-lg shadow-lg ${
                darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
              }`}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                alt={show.name}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold">{show.name}</h3>
              <p className="text-sm">{show.overview.substring(0, 100)}...</p>
              <p className="text-sm mt-2">Rating: {show.vote_average}/10</p>
              <button
                onClick={() => handleAddFavorite(show)}
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
            Loading series...
          </p>
        )}
      </div>
    </div>
  );
};

export default Series;