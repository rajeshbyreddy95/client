import React, { useEffect, useState } from 'react';
import Carousel from '../components/Carousel';
import axios from 'axios';
import TrendingMovies from './TrendingMovies';
import Series from './Series';
import UpcomingMovies from './UpcomingMovies';
import TopRatedMovies from './TopRatedMovies';
import UserFavorites from './UserFavorites';
import GenreMovies from './GenreMovies';

const Home = ({ darkMode }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const resp = await axios.get('https://cineflixserver-nine.vercel.app/api/movies');
      setData(resp.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Carousel data={data} darkMode={darkMode} />
      <TrendingMovies darkMode={darkMode} />
      <Series darkMode={darkMode} />
      <UpcomingMovies darkMode={darkMode} />
      <TopRatedMovies darkMode={darkMode} />
      <UserFavorites darkMode={darkMode} />
      <GenreMovies darkMode={darkMode} genreId={28} />
      <GenreMovies darkMode={darkMode} genreId={35} />
    </div>
  );
};

export default Home;