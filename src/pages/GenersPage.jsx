import { useEffect, useState } from "react";
import MovieRow from "../components/MovieRow";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY

const GENRES = [
  {
    title: "Action Movies",
    movies: [
      { id: "tt21357150", name: "Avengers: Doomsday"},
      { id: "tt33764258", name: "The Odyssey" },
      { id: "tt22084616", name: "SpiderMan - Brand New Day" },
      { id: "tt17490712", name: "Mortal kombat 2" },
      { id: "tt0427340", name: "Masters of the Universe" },
      { id: "tt31227572", name: "Predator: Badlands" },
      { id: "tt18259538", name: "Avatar Aang: The Last Airbender" },
      { id: "tt15940132", name: "War Machine" },
      { id: "tt3402138", name: "The Naked Gun" },
      { id: "tt26342662", name: "Megan 2.0" },
    ],
  },
  {
    title: "Comedy Movies",
    movies: [
      { id: "tt1119646", name: "The Hangover" },
      { id: "tt0829482", name: "Superbad" },
      { id: "tt2283362", name: "Jumanji: Welcome to the Jungle" },
      { id: "tt1232829", name: "21 Jump Street" },
      { id: "tt1637725", name: "Ted" },
      { id: "tt1499658", name: "Horrible Bosses" },
      { id: "tt1723121", name: "We're the Millers" },
      { id: "tt6264654", name: "Free Guy" },
      { id: "tt1291150", name: "The Dictator" },
    ],
  },
  {
    title: "Romantic Movies",
    movies: [
      { id: "tt1630029", name: "The Fault in Our Stars" },
      { id: "tt3783958", name: "La La Land" },
      { id: "tt0332280", name: "The Notebook" },
      { id: "tt1485796", name: "The Greatest Showman" },
      { id: "tt2674426", name: "Me Before You" },
      { id: "tt2209418", name: "Before Midnight" },
      { id: "tt0120338", name: "Titanic" },
      { id: "tt4593060", name: "Fifty Shades Darker" },
      { id: "tt2322441", name: "Fifty Shades of Grey" },
      { id: "tt4477536", name: "Fifty Shades Freed" },
      { id: "tt0454921", name: "The Holiday" },
      { id: "tt0104431", name: "The Bodyguard" },
      { id: "tt0114924", name: "Leaving Las Vegas" },
      { id: "tt10676012", name: "The Idea of You" },
      { id: "tt17526714", name: "Anyone But You" },
    ],
  },
  {
    title: "Sci-Fi Movies",
    movies: [
      { id: "tt0816692", name: "Interstellar" },
      { id: "tt1375666", name: "Inception" },
      { id: "tt0133093", name: "The Matrix" },
      { id: "tt15239678", name: "Dune: Part Two" },
      { id: "tt1631867", name: "Edge of Tomorrow" },
      { id: "tt2543164", name: "Arrival" },
      { id: "tt3659388", name: "The Martian" },
      { id: "tt1856101", name: "Blade Runner 2049" },
      { id: "tt6710474", name: "Everything Everywhere All at Once" },
      { id: "tt1182345", name: "Moon" },
      { id: "tt0062622", name: "2001: A Space Odyssey" },
      { id: "tt0470752", name: "Ex Machina" },
    ],
  },
  {
    title: "Adventure Movies",
    movies: [
      { id: "tt0369610", name: "Jurassic World" },
      { id: "tt1477834", name: "Aquaman" },
      { id: "tt1160419", name: "Dune" },
      { id: "tt1291150", name: "The Dictator" },
      { id: "tt0473075", name: "Prince of Persia" },
      { id: "tt1217209", name: "Brave" },
      { id: "tt0383574", name: "Pirates of the Caribbean: Dead Man's Chest" },
      { id: "tt1464335", name: "Uncharted" },
      { id: "tt0870154", name: "Jungle Cruise" },
      {
        id: "tt0120737",
        name: "The Lord of the Rings: The Fellowship of the Ring",
      },
      { id: "tt0903624", name: "The Hobbit: An Unexpected Journey" },
      {
        id: "tt0325980",
        name: "Pirates of the Caribbean: The Curse of the Black Pearl",
      },
    ],
  },
];

function GenresPage({featuredOnly = false}) {
  const displayGeners = featuredOnly ? GENRES.slice(0,2) : GENRES;

  const [categories, setCategories] = useState(
    GENRES.map((genre) => ({
      ...genre,
      movies: [],
    })),
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchGenreMovies() {
      try {
        const results = await Promise.all(
          displayGeners.map(async (genre) => {
            const movies = await Promise.all(
              genre.movies.map(async (movie) => {
                const response = await fetch(
                  `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.id}`,
                );

                const data = await response.json();

                if (!response.ok || data.Response === "False") {
                  throw new Error(data.Error || "Movie request failed");
                }

                return data;
              }),
            );

            return {
              ...genre,
              movies,
            };
          }),
        );

        setCategories(results);
      } catch (err) {
        setError(err.message);
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchGenreMovies();
  });

  if (loading) {
    return <h2>Loading movie categories...</h2>;
  }

  if (error) {
    return <h2>Unable to load movies: {error}</h2>;
  }

  return (
    <div className="genres-page">
      {categories.map((category) => (
        <MovieRow
          key={category.title}
          title={category.title}
          movies={category.movies}
        />
      ))}
    </div>
  );
}

export default GenresPage;
