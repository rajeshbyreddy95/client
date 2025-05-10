import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetails = ({ darkMode }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [commentError, setCommentError] = useState('');
  const castContainerRef = useRef(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://movierecomendation-gilt.vercel.app/movieDetails/${id}`);
        setMovie(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load movie details');
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const scrollCast = (direction) => {
    if (castContainerRef.current) {
      const scrollAmount = direction === 'left' ? -150 : 150;
      castContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setCommentError('Comment cannot be empty');
      return;
    }
    if (comment.length > 500) {
      setCommentError('Comment cannot exceed 500 characters');
      return;
    }
    setComments([{ id: Date.now(), text: comment, timestamp: new Date().toLocaleString() }, ...comments]);
    setComment('');
    setCommentError('');
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-t-purple-500 border-gray-300 rounded-full animate-spin"></div>
          <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} animate-pulse`}>
            Loading Movie Magic...
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
  
console.log(movie);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} font-sans py-6 sm:py-8`}>
      {/* Hero Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-6 sm:mb-8">
        <div className="relative bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl shadow-2xl overflow-hidden h-[50vh] sm:h-[60vh] md:h-[70vh] animate-fade-in">
          <img
            src={movie.banner || 'https://via.placeholder.com/1200x600?text=No+Image'}
            alt={movie.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight drop-shadow-2xl mb-2 sm:mb-3 animate-slide-up">
              {movie.title}
            </h1>
            <p className="text-sm sm:text-base md:text-xl text-gray-200 mb-4 sm:mb-5 max-w-2xl animate-slide-up-delay">
              {movie.tagline || 'An unforgettable cinematic journey'}
            </p>
            <div className="flex gap-2 sm:gap-3 flex-wrap justify-center">
              <button
                onClick={() => setShowTrailer(true)}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-white font-semibold text-sm sm:text-base shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
                disabled={!movie.trailer}
              >
                <span>▶</span> Watch Trailer
              </button>
              <button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-white font-semibold text-sm sm:text-base shadow-lg transform hover:scale-105 transition-all duration-300">
                Add to Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Details Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Poster and Key Info Card */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-4 sm:p-5 md:p-6 animate-fade-in">
          <img
            src={movie.poster || 'https://via.placeholder.com/300x450?text=No+Poster'}
            alt={movie.title}
            className="w-full rounded-xl shadow-lg mb-4 sm:mb-5"
          />
          <div className="space-y-2 sm:space-y-3 text-center">
            <p className="text-sm sm:text-base font-semibold text-white">
              <span className="text-yellow-300">Release:</span> {movie.releaseYear}
            </p>
            <p className="text-sm sm:text-base font-semibold text-white">
              <span className="text-yellow-300">Rating:</span> {movie.rating.toFixed(1)}/10
            </p>
            <p className="text-sm sm:text-base font-semibold text-white">
              <span className="text-yellow-300">Runtime:</span> {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
            </p>
            <p className="text-sm sm:text-base font-semibold text-white">
              <span className="text-yellow-300">Director:</span> {movie.director}
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {movie.genres.map((genre, index) => (
                <span
                  key={index}
                  className="bg-yellow-400/80 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full font-semibold text-gray-900 shadow-md hover:bg-yellow-500 transition-colors duration-200"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Overview Card with Budget and Revenue */}
        <div className="md:col-span-2 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl shadow-xl p-4 sm:p-5 md:p-6 animate-fade-in-delay">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Overview</h2>
          <p className="text-sm sm:text-base text-gray-100 leading-relaxed mb-4 sm:mb-6">{movie.overview}</p>
          <div className="space-y-3 sm:space-y-4">
            {movie.budget > 0 && (
              <div className="bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-lg shadow-md border border-white/20">
                <p className="text-sm sm:text-base font-semibold text-yellow-300">Budget</p>
                <p className="text-base sm:text-lg text-white">${movie.budget.toLocaleString()}</p>
              </div>
            )}
            {movie.revenue > 0 && (
              <div className="bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-lg shadow-md border border-white/20">
                <p className="text-sm sm:text-base font-semibold text-yellow-300">Revenue</p>
                <p className="text-base sm:text-lg text-white">${movie.revenue.toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cast Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-6 sm:mb-8">
        <div className="bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl shadow-xl p-4 sm:p-5 md:p-6 animate-fade-in">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Cast</h2>
          <div className="relative">
            <div
              ref={castContainerRef}
              className="flex overflow-x-auto space-x-3 sm:space-x-4 pb-4 scrollbar-hide snap-x snap-mandatory touch-pan-x"
            >
              {movie.cast.map((actor, index) => (
                <div key={index} className="flex-none w-24 sm:w-28 md:w-32 text-center group snap-center">
                  <img
                    src={actor.profile || 'https://via.placeholder.com/150?text=No+Image'}
                    alt={actor.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full mx-auto mb-2 sm:mb-3 object-cover shadow-lg group-hover:ring-4 group-hover:ring-yellow-400 group-hover:scale-105 transition-all duration-300"
                  />
                  <p className="font-semibold text-sm sm:text-base text-white truncate">{actor.name}</p>
                  <p className="text-xs sm:text-sm text-gray-200 truncate">{actor.character}</p>
                </div>
              ))}
            </div>
            {/* Scroll Indicators */}
            <button
              onClick={() => scrollCast('left')}
              className="absolute top-1/2 -left-3 sm:-left-4 transform -translate-y-1/2 bg-white/30 backdrop-blur-md rounded-full p-2 sm:p-3 opacity-70 hover:opacity-100 hover:bg-white/50 transition-all duration-200"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scrollCast('right')}
              className="absolute top-1/2 -right-3 sm:-right-4 transform -translate-y-1/2 bg-white/30 backdrop-blur-md rounded-full p-2 sm:p-3 opacity-70 hover:opacity-100 hover:bg-white/50 transition-all duration-200"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            {/* Scroll Shadows */}
            <div className="absolute top-0 left-0 h-full w-6 sm:w-8 bg-gradient-to-r from-pink-500/50 to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 h-full w-6 sm:w-8 bg-gradient-to-l from-red-500/50 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Comment Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl shadow-xl p-4 sm:p-5 md:p-6 animate-fade-in">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Comments</h2>
          {/* Comment Input */}
          <div className="mb-4 sm:mb-6">
            <form onSubmit={handleCommentSubmit}>
              <label htmlFor="comment" className="block text-sm sm:text-base font-semibold text-yellow-300 mb-2">
                Share Your Thoughts
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment here..."
                className={`w-full h-24 sm:h-32 p-3 sm:p-4 rounded-lg bg-white/10 backdrop-blur-md border ${commentError ? 'border-red-500' : 'border-white/20'} text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-200`}
                maxLength={500}
              />
              {commentError && (
                <p className="text-red-400 text-xs sm:text-sm mt-1 animate-fade-in">{commentError}</p>
              )}
              <div className="flex justify-between items-center mt-2 sm:mt-3">
                <span className="text-xs sm:text-sm text-gray-200">
                  {comment.length}/500 characters
                </span>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-white font-semibold text-sm sm:text-base shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Submit Comment
                </button>
              </div>
            </form>
          </div>
          {/* Comment List */}
          <div className="space-y-3 sm:space-y-4">
            {comments.length === 0 ? (
              <p className="text-sm sm:text-base text-gray-200 text-center animate-fade-in">
                No comments yet. Be the first to share your thoughts!
              </p>
            ) : (
              comments.map((c) => (
                <div
                  key={c.id}
                  className="bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-lg shadow-md border border-white/20 animate-slide-up"
                >
                  <p className="text-sm sm:text-base text-white">{c.text}</p>
                  <p className="text-xs sm:text-sm text-gray-200 mt-1">{c.timestamp}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && movie.trailer && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 animate-fade-in">
          <div className="relative w-full max-w-3xl sm:max-w-4xl px-4">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-8 sm:-top-10 right-0 sm:right-4 text-white text-xl sm:text-2xl font-bold hover:text-red-500 transition-colors"
            >
              ✕
            </button>
            <div className="relative pt-[56.25%]">
              <iframe
                className="absolute inset-0 w-full h-full rounded-lg shadow-2xl"
                src={movie.trailer.replace('watch?v=', 'embed/')}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Inline styles for animations and scrollbar
const styles = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fade-in 1s ease-out;
  }
  @keyframes fade-in-delay {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in-delay {
    animation: fade-in-delay 1.2s ease-out;
  }
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-slide-up {
    animation: slide-up 0.8s ease-out;
  }
  @keyframes slide-up-delay {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-slide-up-delay {
    animation: slide-up-delay 1s ease-out;
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  .animate-spin {
    animation: spin 1s linear infinite;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
    scroll-behavior: smooth;
  }
  .snap-x {
    scroll-snap-type: x mandatory;
  }
  .snap-center {
    scroll-snap-align: center;
  }
  .touch-pan-x {
    touch-action: pan-x;
  }
`;

const styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default MovieDetails;