import UrlParser from "../../routes/url-parser";
import MuseumSource from "../../data/museum-resource";

import {
  createMuseumDetailTemplate,
  createMuseumDetailImage,
  createMuseumGalleryItems,
  createMuseumLocationTemplate,
} from "../templates/template-creator";

import LikeButtonPresenter from "../../utils/like-button-presenter";
import FavoriteMuseumIdb from "../../data/favorite-museum-idb";

const DetailMuseum = {
  async render() {
    return `
        <div class="content-detail">
            <div id="favoriteButtonContainer"></div>

            <div class="museum-detail-image"></div>

            <section id="museum-detail" class="museum-detail-container">
              <div class="museum-detail"></div>

              <div class="museum-gallery">
                <h2 class="museum-detail-title text-center text-white mt-5 mb-3 py-3">Gallery Museum</h2>
                <div class="row museum-gallery">
                  <div class="gallery">
                  </div>
                </div>
              </div>

              <div class="museum-maps"></div>

            </section>
        </div>

        <div id="likeButtonContainer"></div>
        `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    // console.log("Parsed URL:", url);
    const museumId = url.id;

    // console.log("Museum ID from URL:", museumId);

    if (museumId) {
      const museum = await MuseumSource.detailMuseum(museumId);

      // console.log("Museum data:", museum);

      const museumImage = document.querySelector(".museum-detail-image");
      museumImage.innerHTML = createMuseumDetailImage(museum);

      const museumDetail = document.querySelector(".museum-detail");
      museumDetail.innerHTML = createMuseumDetailTemplate(museum);

      const museumGallery = document.querySelector(".gallery");
      museumGallery.innerHTML = createMuseumGalleryItems(museum);

      const museumLocation = document.querySelector(".museum-maps");
      museumLocation.innerHTML = createMuseumLocationTemplate(museum);

      LikeButtonPresenter.init({
        likeButtonContainer: document.querySelector("#likeButtonContainer"),
        favoriteMuseums: FavoriteMuseumIdb,
        museum: {
          id: museum.id_museum,
          nama: museum.nama,
          kategori: museum.kategori,
          poster_url: museum.poster_url,
          kota_kabupaten: museum.kota_kabupaten,
          provinsi: museum.provinsi,
          hari_buka: museum.hari_buka,
          jam_buka: museum.jam_buka,
          rating: museum.rating,
          htm: museum.htm,
          ringkasan: museum.ringkasan,
          lokasi_url: museum.lokasi_url,
        },
      });
    } else {
      console.error("Museum ID is not available in the URL");
    }
  },
};

export default DetailMuseum;
