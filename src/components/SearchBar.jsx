import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import "../css/SearchBar.css";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY

function SearchBar() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const searchRef = useRef(null);

  async function searchMovies(searchValue) {
    setIsLoading(true);
    setMovies([]);
    setShowResults(true);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(searchValue)}&apikey=${API_KEY}`,
      );

      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
        setShowResults(true);
      } else {
        setMovies([]);
        setShowResults(false);
      }
    } catch (error) {
      console.log("Error fetching movies:", error);
      setMovies([]);
      setShowResults(false);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="search-container" ref={searchRef}>
      <input
        type="text"
        placeholder="Search Movies ..."
        value={searchTerm}
        onChange={(e) => {
          const value = e.target.value;

          setSearchTerm(value);

          if (value.trim().length >= 3) {
            searchMovies(value);
          } else {
            setMovies([]);
            setShowResults(false);
          }
        }}
      />

      
{showResults && (
  <div className="search-results">

    {isLoading ? (
      <div className="search-loading">
        <div className="loader"></div>
        <p>Searching movies...</p>
      </div>
    ) : movies.length > 0 ? (
      movies.map((movie) => (
        <div
          className="search-result"
          key={movie.imdbID}
          onClick={() => {
            navigate(`/movie/${movie.imdbID}`);

            setSearchTerm("");
            setMovies([]);
            setShowResults(false);
          }}
        >
          <img
            src={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "/no-poster.png"
            }
            alt={movie.Title}
          />

          <div className="search-result-info">
            <h4>{movie.Title}</h4>
            <p>
              {movie.Year} • {movie.Type}
            </p>
          </div>
        </div>
      ))
    ) : (
      <p className="no-results">
        No movies found!
      </p>
    )}

  </div>
)}

    </div>
  );
}

export default SearchBar;
