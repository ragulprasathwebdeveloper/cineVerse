import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "../css/TrendingPage.css";
import Footer from "../components/Footer";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const TRENDING_IDS = [
  "tt15398776",
  "tt15239678",
  "tt1375666",
  "tt0816692",
  "tt0468569",
  "tt0133093",
  "tt4154796",
  "tt7286456",
  "tt10872600",
  "tt1745960",
];

const GENRES = [
  "All",
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Sci-Fi",
  "Thriller",
  "Crime",
];

function TrendingPage() {
  const [movies, setMovies] = useState([]);
  const [activeGenre, setActiveGenre] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTrendingMovies() {
      setIsLoading(true);
      setError("");

      try {
        const requests = TRENDING_IDS.map(async (id) => {
          const response = await fetch(
            `https://www.omdbapi.com/?i=${id}&plot=short&apikey=${API_KEY}`,
          );

          if (!response.ok) {
            throw new Error("Failed to fetch movie data");
          }

          const data = await response.json();

          if (data.Response === "True") {
            return data;
          }

          return null;
        });

        const results = await Promise.all(requests);

        const validMovies = results.filter(Boolean);

        setMovies(validMovies);

        if (validMovies.length === 0) {
          setError("No trending movies found.");
        }
      } catch (err) {
        console.log(err);
        setError("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchTrendingMovies();
  }, []);

  const filteredMovies =
    activeGenre === "All"
      ? movies
      : movies.filter((movie) =>
          movie.Genre?.toLowerCase().includes(activeGenre.toLowerCase()),
        );

  function openMovie(movie) {
    navigate(`/movie/${movie.imdbID}`);
  }

  const featuredMovie = movies[0];

  return (
    <main className="trending-page">
      {isLoading ? (
        <div className="trending-loading">
          <div className="trending-spinner"></div>
          <p>Loading trending movies...</p>
        </div>
      ) : error ? (
        <div className="trending-error">{error}</div>
      ) : (
        <>
          {featuredMovie && (
            <section className="trending-hero">
              <img
                className="trending-hero-bg"
                src={featuredMovie.Poster !== "N/A" ? featuredMovie.Poster : ""}
                alt={featuredMovie.Title}
              />

              <div className="trending-hero-overlay">
                <div className="trending-hero-content">
                  <span className="trending-label">#1 FEATURED MOVIE</span>

                  <h1>{featuredMovie.Title}</h1>

                  <div className="trending-meta">
                    <span>{featuredMovie.Year}</span>
                    <span>{featuredMovie.Runtime}</span>
                    <span>{featuredMovie.Rated}</span>
                  </div>

                  <p className="trending-plot">{featuredMovie.Plot}</p>

                  <p className="trending-genres">{featuredMovie.Genre}</p>

                  <button
                    className="trending-watch-btn"
                    onClick={() => openMovie(featuredMovie)}
                  >
                    <span>▶</span> Watch Details
                  </button>
                </div>
              </div>
            </section>
          )}

          <section className="trending-section">
            <h2>Explore Trending Movies</h2>

            <div className="genre-filters">
              {GENRES.map((genre) => (
                <button
                  key={genre}
                  className={
                    activeGenre === genre ? "genre-btn active" : "genre-btn"
                  }
                  onClick={() => setActiveGenre(genre)}
                >
                  {genre}
                </button>
              ))}
            </div>

            <div className="trending-grid">
              {filteredMovies.map((movie, index) => (
                <button
                  className="trending-card"
                  key={movie.imdbID}
                  onClick={() => openMovie(movie)}
                >
                  <div className="trending-poster-wrapper">
                    <span className="trending-rank">#{index + 1}</span>

                    <img
                      src={
                        movie.Poster !== "N/A" ? movie.Poster : "/no-poster.png"
                      }
                      alt={movie.Title}
                    />

                    <div className="trending-card-overlay">
                      <span>▶ View Details</span>
                    </div>
                  </div>

                  <div className="trending-card-info">
                    <h3>{movie.Title}</h3>

                    <p>
                      {movie.Year} • {movie.Genre?.split(",")[0]}
                    </p>

                    <span className="trending-rating">
                      ★ {movie.imdbRating}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {filteredMovies.length === 0 && (
              <p className="no-trending-movies">
                No movies found in this genre.
              </p>
            )}
          </section>

          <section className="top10-section">
            <h2>Top 10 Movies</h2>

            <div className="top10-list">
              {movies.slice(0, 10).map((movie, index) => (
                <button
                  className="top10-card"
                  key={movie.imdbID}
                  onClick={() => openMovie(movie)}
                >
                  <span className="top10-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <img
                    src={
                      movie.Poster !== "N/A" ? movie.Poster : "/no-poster.png"
                    }
                    alt={movie.Title}
                  />

                  <div className="top10-info">
                    <h3>{movie.Title}</h3>
                    <p>
                      {movie.Year} • {movie.Genre}
                    </p>
                    <span>★ {movie.imdbRating}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </>
      )}

      <Footer />
    </main>
  );
}

export default TrendingPage;
