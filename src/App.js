import React, { useState } from 'react';
import Nav from './screens/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import './index.css';
import MovieDetails from './screens/MovieDetails';
import Cast from './screens/Cast';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div>
      <BrowserRouter>
        <Nav setDarkMode={setDarkMode} darkMode={darkMode}/>
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} />} />
          <Route path="/movieDetails/:id" element={<MovieDetails darkMode={darkMode} />} />
          <Route path="/cast/:id" element={<Cast darkMode={darkMode} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;