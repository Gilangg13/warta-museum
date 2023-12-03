import UrlParser from "../../routes/url-parser";
import MuseumSource from "../../data/museum-resource";

import {
  createMuseumDetailTemplate,
  createMuseumDetailImage,
  // createMuseumLocationTemplate,
  // createMuseumSocialTemplate,
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
            
            </div>

            <section id="museum-detail" class="museum-detail-container">
            </section>
        </div>
        `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    console.log("Parsed URL:", url);
    const museumId = url.id;

    console.log("Museum ID from URL:", museumId);

    try {
      if (museumId) {
        const museum = await MuseumSource.detailMuseum(museumId);

        console.log("Museum data:", museum);

        const museumImage = document.querySelector(".museum-detail-image");
        museumImage.innerHTML = createMuseumDetailImage(museum);

        const museumContainer = document.querySelector("#museum-detail");
        museumContainer.innerHTML = createMuseumDetailTemplate(museum);

        // const museumGallery = document.querySelector(".museum-gallery");
        // museumGallery.innerHTML = createMuseumGalleryTemplate(museum);

        // const museumLocation = document.querySelector(".museum-location");
        // museumLocation.innerHTML = createMuseumLocationTemplate(museum);

        // const museumSocial = document.querySelector(".museum-social");
        // museumSocial.innerHTML = createMuseumSocialTemplate(museum);
      } else {
        console.error("Museum ID is not available in the URL");
      }
    } catch (error) {
      console.error(`Error fetching and rendering museum detail: ${error}`);
    }
  },
};

export default DetailMuseum;
