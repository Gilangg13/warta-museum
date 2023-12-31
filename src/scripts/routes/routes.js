import Home from "../views/pages/home";
import Favorite from "../views/pages/favorite-museum";
import DetailMuseum from "../views/pages/detail";
import AboutUs from "../views/pages/about";
import MuseumCategory from "../views/pages/museum-category";
import SearchResult from "../views/pages/search-result";

const routes = {
  "/": Home,
  "/home": Home,
  "/favorite": Favorite,
  "/about": AboutUs,
  "/detail/:id": DetailMuseum,
  "/provinsi/:id": MuseumCategory,
  "/search?q=:id": SearchResult,
};

export default routes;
