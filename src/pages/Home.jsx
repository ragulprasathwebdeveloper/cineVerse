import { Link } from "react-router";
import AccordionGallery from "../components/AccordionGallery";
import Banner from "../components/Banner";
import FeaturedMovies from "../components/FeaturedMovies";
import GenresPage from "./GenersPage";
import Spotlight from "../components/Spotlight";
import TopRated from "../components/TopRated";
import PopularActors from "../components/PopularActors";
import Footer from "../components/Footer";

import "../css/Home.css"

function Home() {

  return (
    <div>
      <Banner />
      <FeaturedMovies />
      <AccordionGallery />
      <GenresPage featuredOnly={true}/>
      <div className="explore-movies">
        <Link to="/movies" className="explore-btn">
         Explore All Movies 
        </Link>
      </div>
      <Spotlight />
      <TopRated />
      <PopularActors />
      <Footer />
    </div>
  );
}

export default Home;
