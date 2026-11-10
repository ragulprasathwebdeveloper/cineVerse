import { useState } from "react";
import { NavLink } from "react-router";

import "../css/Navbar.css"  
import SearchBar from "./SearchBar";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1 className="website-name">CineVerse</h1>
      </div>

      <div className="navbar-link desktop-links">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/movies">Movies</NavLink>
        <NavLink to="/trending">Trending</NavLink>
      </div>

      <SearchBar />

      <div className="navbar-actions">

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <div className="navbar-link mobile-links">
          <NavLink to="/" end onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/movies" onClick={closeMenu}>
            Movies
          </NavLink>
          <NavLink to="/trending" onClick={closeMenu}>
            Trending
          </NavLink>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
