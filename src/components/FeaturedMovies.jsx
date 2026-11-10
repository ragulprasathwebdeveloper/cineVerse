import { useEffect, useState } from "react";

import "../css/Home.css"

const API_KEY = import.meta.env.VITE_OMDB_API_KEY

const FEATURED_MOVIES = [
  "tt21357150",
  "tt31170389",
  "tt37287335",
  "tt0472181",
  "tt34385135",
];

function FeaturedMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const results = await Promise.all(
          FEATURED_MOVIES.map(async (id) => {
            const response = await fetch(
              `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`,
            );
            const data = await response.json();
            if (!response.ok) {
              throw new Error("Movie Request Failed");
            }
            return data;
          }),
        );
        setMovies(results);
      } catch (err) {
        console.log(err.message);
      }
    }

    fetchMovies();
  }, []);

  return (
    <section className="featured-movies">
      <h2>Featured Movies</h2>
      <div className="featured-movies-grid">
        {movies.map((movie) => (
            <div className="featured-movie-card" key={movie.imdbID}>
                <img src={movie.Poster !== "N/A" ? movie.Poster : "No poster avaliable"} alt={movie.Title} />
                <div className="featured-movie-info">
                    <h3>{movie.Title}</h3>
                    <p>{movie.Year}</p>
                    <p>IMDb Rating : {movie.imdbRating}</p>
                </div>
            </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedMovies;
