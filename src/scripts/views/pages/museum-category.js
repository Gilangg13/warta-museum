/* eslint-disable arrow-body-style */
/* eslint-disable function-paren-newline */
import MuseumSource from "../../data/museum-resource";
import UrlParser from "../../routes/url-parser";
import { createCategoryTemplate } from "../templates/template-creator";

const capitalize = (string) => {
  return string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const MuseumCategory = {
  async render() {
    const provinsiUrl = this._getProvinsiFromUrl();
    console.log(provinsiUrl);
    const provinsi = provinsiUrl.replace(/%20/g, " ");
    const museums = await MuseumSource.museumByProvinsi(provinsiUrl);
    console.log(museums);

    return `
    <section id="content">
        <div class="museum-list-container" id="museum-list-container">
          <div class="mt-5 mb-3">
            <h2 class="text-white text-center">Museum Di ${capitalize(
              provinsi
            )}</h2>
            <ul class="museum-list-category"></ul>
          </div>
        </div>
    </section>`;
  },

  async afterRender() {
    const provinsi = this._getProvinsiFromUrl();
    console.log(provinsi);
    const museums = await MuseumSource.museumByProvinsi(provinsi);

    museums.forEach((museum) => {
      const ulProvinsi = document.querySelector(`.museum-list-category`);
      const museumItem = document.createElement("li");
      museumItem.classList.add("museum-item-category");
      museumItem.innerHTML = createCategoryTemplate(museum);
      ulProvinsi.appendChild(museumItem);

      const exploreLink = museumItem.querySelector(".card-link");
      exploreLink.addEventListener("click", (event) => {
        event.preventDefault();
        const museumId = museum.id_museum;
        console.log(museumId);
        window.location.hash = `#/detail/${museumId}`;
      });
    });
  },

  _getProvinsiFromUrl() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    return url.id;
  },
};

export default MuseumCategory;
