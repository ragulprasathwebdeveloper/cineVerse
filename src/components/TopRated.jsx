import { useEffect, useState } from "react";
import MovieRow from "../components/MovieRow";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const TOP_RATED_IDS = [
  "tt0111161",
  "tt0068646",
  "tt0468569",
  "tt0167260",
  "tt0108052",
  "tt0050083",
  "tt0110912",
  "tt1375666",
  "tt0137523",
  "tt0109830",
];

function TopRated() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTopRated() {
      try {
        const requests = TOP_RATED_IDS.map(async (id) => {
          const response = await fetch(
            `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`,
          );

          const data = await response.json();

          return data.Response === "True" ? data : null;
        });

        const results = await Promise.all(requests);

        const validMovies = results
          .filter((movie) => movie !== null)
          .sort((a, b) => Number(b.imdbRating) - Number(a.imdbRating));

        setMovies(validMovies);
      } catch (error) {
        console.error("Top Rated Movies Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTopRated();
  }, []);

  if (loading) {
    return <p>Loading Top Rated Movies...</p>;
  }

  if (movies.length === 0) {
    return <p>Unable to load Top Rated Movies.</p>;
  }

  return (
    <section className="top-rated-section">
      <MovieRow title="Top Rated Movies" movies={movies} />
    </section>
  );
}

export default TopRated;
