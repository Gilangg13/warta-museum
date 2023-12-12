/* eslint-disable no-new */
import FavoriteMuseumIdb from "../../data/favorite-museum-idb";
import FavoriteMuseumView from "./liked-museum/favorite-museum-view";
import FavoriteMuseumShowPresenter from "./liked-museum/favorite-museum-show-presenter";

const view = new FavoriteMuseumView();

const Like = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    new FavoriteMuseumShowPresenter({
      view,
      favoriteMuseums: FavoriteMuseumIdb,
    });
  },
};

export default Like;
