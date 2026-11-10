
import { useEffect, useState } from "react";
import "../css/PopularActors.css";

const ACTORS = [
  { name: "Leonardo DiCaprio", movie: "Inception" },
  { name: "Robert Downey Jr.", movie: "Iron Man" },
  { name: "Tom Cruise", movie: "Mission: Impossible" },
  { name: "Brad Pitt", movie: "Fight Club" },
  { name: "Cillian Murphy", movie: "Oppenheimer" },
  { name: "Keanu Reeves", movie: "John Wick" },
  { name: "Christian Bale", movie: "The Dark Knight" },
  { name: "Johnny Depp", movie: "Pirates of the Caribbean" },
];

function PopularActors() {
  const [actors, setActors] = useState([]);

  useEffect(() => {
    async function fetchActors() {
      try {
        const results = await Promise.all(
          ACTORS.map(async (actor) => {
            const response = await fetch(
              `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(actor.name)}`
            );

            if (!response.ok) {
              return { ...actor, image: "" };
            }

            const data = await response.json();

            return {
              ...actor,
              image: data.thumbnail?.source || "",
            };
          })
        );

        setActors(results);
      } catch (error) {
        console.error("Popular Actors Error:", error);
      }
    }

    fetchActors();
  }, []);

  return (
    <section className="popular-actors-section">

      <div className="actors-heading">
        <div>
          <span className="actors-subtitle">THE STARS OF CINEMA</span>
          <h2>Popular Actors</h2>
        </div>
      </div>

      <div className="actors-track">

        {actors.map((actor) => (
          <div className="actor-card" key={actor.name}>

            <div className="actor-image">
              {actor.image ? (
                <img
                  src={actor.image}
                  alt={actor.name}
                  loading="lazy"
                />
              ) : (
                <div className="actor-placeholder">
                  {actor.name.charAt(0)}
                </div>
              )}

              <div className="actor-overlay">
                <h3>{actor.name}</h3>
                <p>Known for {actor.movie}</p>
              </div>
            </div>

          </div>
        ))}

      </div>

    </section>
  );
}

export default PopularActors;
