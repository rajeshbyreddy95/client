import React, { useEffect, useState } from 'react';
import Carousel from '../components/Carousel';
import axios from 'axios';
import TrendingMovies from './TrendingMovies';

const Home = ({ darkMode }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const resp = await axios.get('https://cineflixserver-nine.vercel.app/api/movies');
      console.log(resp.data);
      
      setData(resp.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to fetch data only on mount

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Carousel data={data} darkMode={darkMode} />
      <TrendingMovies darkMode={darkMode}/>
    </div>
  );
};

export default Home;