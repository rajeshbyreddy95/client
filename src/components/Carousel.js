import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../index.css'

const Carousel = ({ data, darkMode }) => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    pauseOnHover: true,
    fade: true,
    customPaging: () => (
      <div className="w-3 h-3 bg-white/50 rounded-full hover:bg-yellow-400 transition-all duration-300"></div>
    ),
    appendDots: dots => (
      <div className="pb-4 sm:pb-6">
        <ul className="flex justify-center gap-2 sm:gap-3">{dots}</ul>
      </div>
    ),
    prevArrow: (
      <button className="slick-prev bg-white/30 backdrop-blur-md rounded-full p-2 sm:p-3 hover:bg-white/50 transition-all duration-200">
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    ),
    nextArrow: (
      <button className="slick-next bg-white/30 backdrop-blur-md rounded-full p-2 sm:p-3 hover:bg-white/50 transition-all duration-200">
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    ),
  };

  if (!data || data.length === 0) {
    return (
      <div className={`flex items-center justify-center h-[80vh] ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-t-purple-500 border-gray-200 rounded-full animate-spin"></div>
          <span className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} animate-pulse`}>
            Loading Movie Magic...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative p-3 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <Slider {...settings} className="w-full relative overflow-hidden">
        {data.slice(0, 5).map((movie) => (
          <div key={movie.id} className="relative outline-none animate-fade-in">
            {/* Movie Banner */}
            <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] overflow-hidden bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl shadow-2xl">
              <img
                src={movie.banner || 'https://via.placeholder.com/1200x600?text=No+Image'}
                alt={movie.title}
                className="w-full h-full object-cover opacity-70 transform transition-transform duration-1000 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              {/* Edge Shadows */}
              <div className="absolute top-0 left-0 h-full w-6 sm:w-8 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />
              <div className="absolute top-0 right-0 h-full w-6 sm:w-8 bg-gradient-to-l from-black/30 to-transparent pointer-events-none" />
            </div>

            {/* Info Container */}
            <div className="absolute bottom-8 sm:bottom-12 left-0 right-0 px-4 sm:px-6 md:px-12 text-white flex justify-center">
              <div className="max-w-3xl text-center bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-lg animate-slide-up">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight drop-shadow-2xl mb-2 sm:mb-3">
                  {movie.title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-3 sm:mb-4 line-clamp-2">
                  {movie.description || 'An epic adventure awaits you!'}
                </p>

                {/* Genre Badges */}
                <div className="flex justify-center gap-2 sm:gap-3 flex-wrap mb-3 sm:mb-4">
                  {movie.genres.map((genre, index) => (
                    <span
                      key={index}
                      className="bg-yellow-400/80 text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-1.5 rounded-full font-semibold text-gray-900 shadow-md hover:bg-yellow-500 transform hover:scale-105 transition-all duration-200"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                {/* Watch Button */}
                <button
                  onClick={() => navigate(`/movieDetails/${movie.id}`)}
                  className="group bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 px-6 sm:px-8 py-2 sm:py-3 rounded-full text-white font-semibold text-sm sm:text-lg shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto"
                >
                  <span className="inline-block group-hover:animate-pulse">▶</span> Watch Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
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
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-slide-up {
    animation: slide-up 0.6s ease-out;
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  .animate-spin {
    animation: spin 1s linear infinite;
  }
  .slick-prev, .slick-next {
    z-index: 10;
    width: 40px;
    height: 40px;
    transform: translateY(-50%);
  }
  .slick-prev {
    left: 10px;
  }
  .slick-next {
    right: 10px;
  }
  .slick-prev:before, .slick-next:before {
    content: '';
  }
  @media (min-width: 640px) {
    .slick-prev, .slick-next {
      width: 48px;
      height: 48px;
    }
    .slick-prev {
      left: 20px;
    }
    .slick-next {
      right: 20px;
    }
  }
`;

const styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Carousel;