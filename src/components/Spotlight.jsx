import { useEffect, useState } from "react";
import { Link } from "react-router";
import "../css/Spotlight.css";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function Spotlight() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSpotlight() {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?i=tt15398776&apikey=${API_KEY}`,
        );

        const data = await response.json();

        if (data.Response === "True") {
          setMovie(data);
        }
      } catch (error) {
        console.error("Spotlight error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSpotlight();
  }, []);

  if (loading) return <p>Loading Spotlight...</p>;
  if (!movie) return null;

  return (
    <section className="spotlight">
      <div
        className="spotlight-background"
        style={{
          backgroundImage: `url(${movie.Poster})`,
        }}
      />

      <div className="spotlight-overlay"></div>

      <div className="spotlight-content">
        <span className="spotlight-label">CINEVERSE SPOTLIGHT</span>

        <h1>{movie.Title}</h1>

        <div className="spotlight-info">
          <span>{movie.Year}</span>
          <span>{movie.Rated}</span>
          <span>{movie.Runtime}</span>
          <span>⭐ {movie.imdbRating}</span>
        </div>

        <p className="spotlight-genre">{movie.Genre}</p>

        <p className="spotlight-description">{movie.Plot}</p>

        <div className="spotlight-buttons">
          <Link to={`/movie/${movie.imdbID}`} className="spotlight-watch">
            ▶ Watch Trailer
          </Link>

          <Link to={`/movie/${movie.imdbID}`} className="spotlight-details">
            More Details →
          </Link>
        </div>
      </div>

      <div className="spotlight-poster">
        <img src={movie.Poster} alt={movie.Title} />
      </div>
    </section>
  );
}

export default Spotlight;
