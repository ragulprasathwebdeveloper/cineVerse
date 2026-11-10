import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { searchMovieTrailer } from "../services/youtube";

import "../css/MovieDetailsPage.css";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function MovieDetailsPage() {
  const { imdbID } = useParams();

  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!movie) return;

    let isActive = true;

    async function fetchTrailer() {
      const results = await searchMovieTrailer(movie.Title, movie.Year);

      if (isActive && results.length > 0) {
        setTrailer(results[0]);
      }
    }

    fetchTrailer();

    return () => {
      isActive = false;
    };
  }, [movie]);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`,
        );

        const data = await response.json();

        if (data.Response === "False") {
          throw new Error(data.Error);
        }

        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMovieDetails();
  }, [imdbID]);

  if (loading) return <h2>Loading movie details...</h2>;

  if (error) return <h2>{error}</h2>;

  if (!movie) return null;


return (
  <div className="movie-page">

    <Link to="/movies" className="back-btn">
      ← Back to Movies
    </Link>

    <div className="movie-player-layout">

      <div className="movie-player-main">

        {trailer ? (
          <div className="movie-trailer">
            <iframe
              src={`https://www.youtube.com/embed/${trailer.id.videoId}?autoplay=1&mute=1&controls=1&rel=0`}
              title={`${movie.Title} trailer`}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="trailer-loading">
            <h2>Finding trailer...</h2>
          </div>
        )}

      </div>

      <aside className="movie-sidebar">

        <div className="sidebar-title">
          <h2>{movie.Title}</h2>
          <span>🎬</span>
        </div>

        <div className="sidebar-section">
          <h4>DESCRIPTION</h4>
          <p>{movie.Plot}</p>
        </div>

        <div className="sidebar-section">
          <h4>MOVIE DETAILS</h4>

          <p><strong>Year:</strong> {movie.Year}</p>
          <p><strong>Rating:</strong> ⭐ {movie.imdbRating}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Runtime:</strong> {movie.Runtime}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
        </div>

        <div className="sidebar-section">
          <h4>IMAGE</h4>

          <img
            src={movie.Poster !== "N/A" ? movie.Poster : ""}
            alt={movie.Title}
            className="sidebar-poster"
          />
        </div>

      </aside>

    </div>
  </div>
);

}

export default MovieDetailsPage;
