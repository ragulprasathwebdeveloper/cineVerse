import { Link } from "react-router";
import "../css/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <h2>
            CINE<span>VERSE</span>
          </h2>

          <p>
            Your universe of cinema. Discover movies, explore stories, and
            experience entertainment without limits.
          </p>
        </div>

        <div className="footer-links">
          <h3>Explore</h3>

          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/trending">Trending</Link>
          <Link to="/profile">Profile</Link>
        </div>

        <div className="footer-links">
          <h3>Categories</h3>

          <Link to="/geners">Action</Link>
          <Link to="/geners">Comedy</Link>
          <Link to="/geners">Horror</Link>
          <Link to="/geners">Thriller</Link>
        </div>

        <div className="footer-links">
          <h3>About Us</h3>

          <a href="#about">About CineVerse</a>
          <a href="#contact">Contact</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms & Conditions</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} CineVerse. All Rights Reserved by G.
          Ragul Prasath
        </p>

        <p className="footer-tagline">MADE FOR MOVIE LOVERS</p>
      </div>
    </footer>
  );
}

export default Footer;
