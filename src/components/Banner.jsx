// import React from 'react'

import { Link } from "react-router";
import "../css/Banner.css";

function Banner() {
  const items = [
    {
      image: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
      title: "Oppenheimer",
    },
    {
      image: "https://image.tmdb.org/t/p/w500/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
      title: "Deadpool & Wolverine",
    },
    {
      image: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
      title: "Dune: Part Two",
    },
    {
      image: "https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg",
      title: "Interstellar",
    },
    {
      image: "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
      title: "Superman",
    },
    {
      image: "https://image.tmdb.org/t/p/w500/1XDDXPXGiI8id7MrUxK36ke7gkX.jpg",
      title: "Kung Fu Panda 4",
    },
    {
      image: "https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg",
      title: "Iron Man",
    },
    {
      image: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
      title: "The Batman",
    },
    {
      image: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
      title: "The Shawshank Redemption",
    },
    {
      image: "https://image.tmdb.org/t/p/w500/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
      title: "Star Wars",
    },
    {
      image: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
      title: "Barbie",
    },
    {
      image: "https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg",
      title: "The Super Mario Bros. Movie",
    },
    {
      image: "https://image.tmdb.org/t/p/w500/2CAL2433ZeIihfX1Hb2139CX0pW.jpg",
      title: "John Wick: Chapter 4",
    },
    {
      image: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
      title: "Spider-Man: Across the Spider-Verse",
    },
    {
      image: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
      title: "The Dark Knight",
    },
  ];

  return (
    <>
      <div className="banner">
        <div className="wall">
          <div className="wall-tile">
            <div className="wall-track">
              {[...items, ...items].map((movie, index) => (
                <div className="wall-card" key={`${movie.title}-${index}`}>
                  <img src={movie.image} alt={movie.title} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="overlay"></div>

        <div className="hero-content">
          <div>
            <p className="hero-label">WELCOME TO CINEVERSE</p>

            <h1>Discover Your Next Favourite Movie</h1>

            <p className="hero-description">
              Explore unforgettable stories, iconic characters, and your next
              cinematic adventure.
            </p>

            <div className="hero-buttons">
              <Link to="/movies">
                {" "}
                <button className="watch-btn">▶ Explore Movies</button>{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
