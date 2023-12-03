import Home from "../views/pages/home";
import DetailMuseum from "../views/pages/detail";
// import Favorite from "../views/pages/favorite-museum";
import AboutUs from "../views/pages/about";

const routes = {
  "/": Home,
  "/home": Home,
  "/museum/:id": DetailMuseum,
  // "/favorite": Favorite,
  "/about": AboutUs,
};

export default routes;
