import Home from "../views/pages/home";
import DetailMuseum from "../views/pages/detail";
// import Favorite from "../views/pages/favorite-museum";
// import About from "../views/pages/about";

const routes = {
  "/": Home,
  "/home": Home,
  "/museum/:id": DetailMuseum,
  // "/favorite": Favorite,
  // "/about": About,
};

export default routes;
