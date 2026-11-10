// import React from 'react'
import { useEffect, useState } from "react";
import "../css/AccordionGallery.css";

function AccordionGallery() {
  const API_KEY = import.meta.env.VITE_OMDB_API_KEY

  const accordionGallery = [
    "tt1399103",
    "tt18412256",
    "tt6932874",
    "tt7975244",
    "tt12324366",
  ];

  const [movies, setMovies] = useState([]);
  const [activeMovieId, setActiveMovieId] = useState(accordionGallery[0]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMovies() {
      try {
        const results = await Promise.all(
          accordionGallery.map(async (id) => {
            const response = await fetch(
              `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`,
            );
            const data = await response.json();
            if (data.Response === "False") {
              throw new Error(data.Error);
            }
            return data;
          }),
        );
        setMovies(results);
      } catch (err) {
        setError(err.message || "Failed to Load Movies");
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  });

  if (loading) {
    return <p>Loading movies...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <section className="accordion-gallery">
        <h2 className="accordion-title">Explore Movies</h2>
      </section>
      <div className="accordion-container">
        {movies.map((movie) => (
          <div
            className={`accordion-panel ${
              activeMovieId === movie.imdbID ? "is-active" : ""
            }`}
            key={movie.imdbID}
            style={{
              backgroundImage: `url(${movie.Poster})`,
            }}
            role="button"
            tabIndex={0}
            aria-pressed={activeMovieId === movie.imdbID}
            aria-label={`Select ${movie.Title}`}
            onClick={() => setActiveMovieId(movie.imdbID)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setActiveMovieId(movie.imdbID);
              }
            }}
          >
            <div className="accordion-overlay">
              <h3>{movie.Title}</h3>
              <div className="accordion-details">
                <p>{movie.Year}</p>
                <p>⭐ {movie.imdbRating}</p>
                <p className="accordion-plot">{movie.Plot}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AccordionGallery;
