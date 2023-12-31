class FavoriteMuseumShowPresenter {
  constructor({ view, favoriteMuseums }) {
    this._view = view;
    this._favoriteMuseums = favoriteMuseums;

    this._showFavoriteMuseums();
  }

  async _showFavoriteMuseums() {
    const museums = await this._favoriteMuseums.getAllMuseums();

    this._displayMuseums(museums);
  }

  _displayMuseums(museums) {
    this._view.showFavoriteMuseums(museums);
  }
}

export default FavoriteMuseumShowPresenter;
