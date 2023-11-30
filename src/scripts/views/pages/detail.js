import UrlParser from "../../routes/url-parser";
import MuseumSource from "../../data/museum-resource";

import {
  createMuseumDetailTemplate,
  createMuseumGalleryTemplate,
  createMuseumLocationTemplate,
  createMuseumSocialTemplate,
} from "../templates/template-creator";

// import LikeButtonPresenter from "../../utils/like-button-presenter";
// import FavoriteMuseumIdb from "../../data/favorite-museum-idb";

const DetailMuseum = {
  async render() {
    return `
        <div class="content-detail">
            <div id="favoriteButtonContainer">
                
            </div>

            <div class="museum-detail-image">
                <img src="../../public/images/Rectangle 21.png" alt="">
            </div>

            <section id="museum-detail" class="museum-detail-container">

                <div class="museum-detail"></div>

                <div class="museum-gallery"></div>

                <div class="museum-location"></div>

                <div class="museum-social"></div>

                
            </section>
        </div>
        `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const museum = await MuseumSource.detailMuseum(url.id);

    const museumContainer = document.querySelector(".museum-detail");
    museumContainer.innerHTML = createMuseumDetailTemplate(museum);

    const museumGallery = document.querySelector(".museum-gallery");
    museumGallery.innerHTML = createMuseumGalleryTemplate(museum);

    const museumLocation = document.querySelector(".museum-location");
    museumLocation.innerHTML = createMuseumLocationTemplate(museum);

    const museumSocial = document.querySelector(".museum-social");
    museumSocial.innerHTML = createMuseumSocialTemplate(museum);
  },
};

export default DetailMuseum;
