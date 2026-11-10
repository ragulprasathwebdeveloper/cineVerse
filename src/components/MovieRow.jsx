import { useRef } from "react";
import { Link } from "react-router";
import "../css/MoviesRow.css";

function MovieRow({ title, movies }) {
  const movieContainer = useRef(null);

  function handleNext() {
    movieContainer.current.scrollBy({
      left: 400,
      behavior: "smooth",
    });
  }

  function handlePrevious() {
    movieContainer.current.scrollBy({
      left: -400,
      behavior: "smooth",
    });
  }

  return (
    <section className="movies-row">
      <section className="movies-row-header">
        <h2>{title}</h2>

        <div className="movie-row-buttons">
          <button onClick={handlePrevious}>←</button>
          <button onClick={handleNext}>→</button>
        </div>
      </section>

      <div className="movie-row-container" ref={movieContainer}>
        <div className="movie-row-flex">
          {movies.map((movie) => (
            <Link
              to={`/movie/${movie.imdbID}`}
              key={movie.imdbID}
              className="movie-card-link"
            >
              <div className="movie-row-card">
                <img
                  src={movie.Poster !== "N/A" ? movie.Poster : "/fallback.jpg"}
                  alt={movie.Title}
                />

                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
                <p>⭐ {movie.imdbRating}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MovieRow;
