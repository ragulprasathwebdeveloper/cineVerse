import { Routes, Route } from "react-router";

import "./css/Navbar.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MoviesPage from "./pages/MoviesPage";
import TrendingPage from "./pages/TrendingPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/trending" element={<TrendingPage />} />
        <Route path="/movie/:imdbID" element={<MovieDetailsPage />} />
      </Routes>
    </>
  );
}

export default App;