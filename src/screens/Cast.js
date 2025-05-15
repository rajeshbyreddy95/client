import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Cast = ({ darkMode = false }) => {
  const { id } = useParams();
  const [cast, setCast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const res = await axios.get(`https://cineflixserver-nine.vercel.app/api/cast/${id}`, {
          timeout: 10000,
        });
        setCast(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching cast details:', {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data,
        });
        setError(`Failed to load cast details: ${err.response?.data?.details || err.message}`);
        setLoading(false);
      }
    };

    fetchCast();
  }, [id]);

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-t-purple-500 border-gray-300 rounded-full animate-spin"></div>
          <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} animate-pulse`}>
            Loading Cast Details...
          </span>
        </div>
      </div>
    );
  }

  if (error || !cast) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="text-center">
          <span className={`text-2xl font-semibold ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
            {error || 'Cast not found.'}
          </span>
          <p className={`mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Please try again later or check the cast ID.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 px-6 py-2 rounded-full text-white font-semibold shadow-lg"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} font-sans py-8 sm:py-12`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent animate-fade-in">
          {cast.name}
        </h1>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-8 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-2xl shadow-xl p-6 sm:p-8 animate-slide-up">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <img
              src={cast.profile || 'https://via.placeholder.com/300x450?text=No+Image'}
              alt={cast.name}
              className="w-64 sm:w-80 h-auto object-cover rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Info */}
          <div className="flex-1">
            <p className={`text-lg italic mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {cast.knownFor || 'Known for acting'}
            </p>

            <div className="space-y-3 text-sm sm:text-base">
              {cast.birthday && (
                <p>
                  <span className="font-semibold">Birthday:</span> {cast.birthday}
                </p>
              )}
              {cast.deathday && (
                <p>
                  <span className="font-semibold">Died:</span> {cast.deathday}
                </p>
              )}
              {cast.placeOfBirth && (
                <p>
                  <span className="font-semibold">Place of Birth:</span> {cast.placeOfBirth}
                </p>
              )}
              {cast.gender && (
                <p>
                  <span className="font-semibold">Gender:</span> {cast.gender}
                </p>
              )}
              <p>
                <span className="font-semibold">Popularity:</span> {cast.popularity.toFixed(1)}
              </p>
            </div>

            {cast.homepage && (
              <a
                href={cast.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 px-4 py-2 rounded-full text-white font-semibold shadow-md transform hover:scale-105 transition-all duration-300"
              >
                Official Website
              </a>
            )}
          </div>
        </div>

        {/* Biography */}
        {cast.biography && (
          <div className="mt-10 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 animate-slide-up">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Biography
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              {cast.biography}
            </p>
          </div>
        )}
      </div>

      {/* Inline Styles for Animations */}
      <style>
        {`
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
            animation: spin 1s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Cast;