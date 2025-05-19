import React, { useState, useEffect } from 'react';
import { User, Heart, Trash2, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = ({ darkMode }) => {
  const [user, setUser] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to view your profile.');
        navigate('/login');
        return;
      }

      try {
        // Fetch user details
        const userResponse = await axios.get(
          'https://cineflixserver-nine.vercel.app/api/auth/me',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(userResponse.data);

        // Fetch favourites
        // const favouritesResponse = await axios.get(
        //   'https://cineflixserver-nine.vercel.app/api/favourites',
        //   {
        //     headers: { Authorization: `Bearer ${token}` },
        //   }
        // );
        // setFavourites(favouritesResponse.data);
      } catch (err) {
        console.error('Profile fetch error:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
        });
        if (err.response?.status === 401) {
          setError('Session expired. Please log in again.');
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setError(err.response?.data?.message || 'Failed to load profile.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleRemoveFavourite = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(
        `https://cineflixserver-nine.vercel.app/api/favourites/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFavourites(favourites.filter((fav) => fav.id !== id));
      setError('');
    } catch (err) {
      console.error('Remove favourite error:', err.response?.data);
      setError('Failed to remove favourite.');
    }
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode ? 'bg-gray-900' : 'bg-gray-100'
        }`}
      >
        <Loader2 className="animate-spin text-red-600" size={40} />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen py-8 px-4 ${
        darkMode ? 'bg-gray-900' : 'bg-gray-100'
      } transition-colors duration-300`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Error Message */}
        {error && (
          <div
            className={`mb-6 p-4 rounded-lg text-center bg-red-100 text-red-700`}
          >
            {error}
          </div>
        )}

        {/* User Details Card */}
        {user && (
          <div
            className={`p-6 rounded-xl shadow-lg ${
              darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            } mb-8 transform transition-all duration-500 hover:shadow-2xl`}
          >
            <div className="flex items-center space-x-4">
              <div
                className={`p-3 rounded-full ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`}
              >
                <User size={40} className="text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-red-600">{user.name}</h2>
                <p className="text-sm opacity-80">@{user.username}</p>
                <p className="text-sm opacity-80">{user.email}</p>
              </div>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                navigate('/login');
              }}
              className={`mt-4 px-4 py-2 rounded-lg ${
                darkMode
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-red-500 hover:bg-red-600'
              } text-white font-semibold transition-colors`}
            >
              Log Out
            </button>
          </div>
        )}

        {/* Favourites Section */}
        <h2
          className={`text-2xl font-bold mb-6 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          My Favourites
        </h2>
        {favourites.length === 0 ? (
          <p
            className={`text-center ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            No favourites added yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {favourites.map((fav) => (
              <div
                key={fav.id}
                className={`p-4 rounded-lg shadow-md ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                } relative group hover:shadow-lg transition-all duration-300`}
              >
                <img
                  src={fav.poster || 'https://via.placeholder.com/150'}
                  alt={fav.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3
                  className={`text-lg font-semibold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {fav.title}
                </h3>
                <button
                  onClick={() => handleRemoveFavourite(fav.id)}
                  className={`absolute top-2 right-2 p-2 rounded-full ${
                    darkMode
                      ? 'bg-gray-700 hover:bg-red-600'
                      : 'bg-gray-200 hover:bg-red-500'
                  } text-white opacity-0 group-hover:opacity-100 transition-opacity`}
                  title="Remove from Favourites"
                >
                  <Trash2 size={20} />
                </button>
                <Heart
                  size={20}
                  className="text-red-600 mt-2"
                  fill="currentColor"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;