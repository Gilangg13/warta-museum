import FavoriteMuseumIdb from "../data/favorite-museum-idb";
import {
  createLikeMuseumButtonTemplate,
  createUnlikeMuseumButtonTemplate,
} from "../views/templates/template-creator";

const LikeButtonPresenter = {
  async init({ likeButtonContainer, museum }) {
    this._likeButtonContainer = likeButtonContainer;
    this._museum = museum;
    this._favoriteMuseums = FavoriteMuseumIdb;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._museum;

    if (await this._isMuseumExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isMuseumExist(id) {
    const museum = await this._favoriteMuseums.getMuseum(id);
    return !!museum;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeMuseumButtonTemplate();
    const likeButton = document.querySelector("#likeButton");
    likeButton.addEventListener("click", async () => {
      await this._favoriteMuseums.putMuseum(this._museum);
      this._renderButton();
      console.log("Museum di Like");
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = createUnlikeMuseumButtonTemplate();

    const likeButton = document.querySelector("#likeButton");
    likeButton.addEventListener("click", async () => {
      await this._favoriteMuseums.deleteMuseum(this._museum.id);
      this._renderButton();
      console.log("Museum di Unlike");
    });
  },
};

export default LikeButtonPresenter;
