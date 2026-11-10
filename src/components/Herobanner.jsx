import "../css/Herobanner.css";

function Herobanner() {
  return (
    <div>
      <div className="doom-hero">
        <div className="doom-hero_image" />
        <div className="doom-hero_fog" />
        <div className="doom-hero_overlay" />
        <div className="doom-hero_content">
          <p className="doom-hero_highlight">CINEVERSE ORIGINAL SPOTLIGHT</p>
          <h1>Avengers : DoomsDay</h1>
          <p className="doom-hero_description">A new power rises from the shadows. The world will never be the same.</p>
          <div className="doom-hero_buttons">
            <button className="doom-btn doom-btn_primary">
               ▶ Watch Trailer
            </button>
            <button className="doom-btn doom-btn_secondary">
               + My List
            </button>
          </div>
        </div>
        <div className="doom-hero_label">
            FEATURED MOVIE
        </div>
      </div>
    </div>
  );
}

export default Herobanner;
