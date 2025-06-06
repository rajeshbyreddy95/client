import React, { useState } from 'react';
import Nav from './screens/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import './index.css';
import MovieDetails from './screens/MovieDetails';
import Cast from './screens/Cast';
import SignUp from './screens/SignUp';
import GenreMovies from './screens/GenreMovies';
import Profile from './screens/Profile';
import Login from './screens/Login';
import Fav from './screens/Fav';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div>
      <BrowserRouter>
        <Nav setDarkMode={setDarkMode} darkMode={darkMode} />
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} />} />
          <Route path="/profile" element={<Profile darkMode={darkMode} />} />
          <Route path="/movieDetails/:id" element={<MovieDetails darkMode={darkMode} />} />
          <Route path="/cast/:id" element={<Cast darkMode={darkMode} />} />
          <Route path="/signup" element={<SignUp darkMode={darkMode} />} />
          <Route path="/login" element={<Login darkMode={darkMode} />} />
          <Route path="/my-list" element={<Fav darkMode={darkMode} />} />
          <Route path="/genre/:genreId" element={<GenreMovies darkMode={darkMode} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
