/* eslint-disable operator-linebreak */
import UrlParser from "../../routes/url-parser";
import MuseumResource from "../../data/museum-resource";
import {
  // createMuseumItemFavoriteTemplate,
  createEmptyMuseumTemplate,
  createCategoryTemplate,
} from "../templates/template-creator";

const SearchResult = {
  async render() {
    return `
    <section id="content">
        <div class="museum-list-container" id="museum-list-container">
            <div class="museum-category mb-3">
                <h2>Hasil Pencarian</h2>
                <ul id="searchResult" class="museum-list-category"></ul>
            </div>
        </div>
      </div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const searchResultContainer = document.querySelector(
      ".museum-list-category"
    );

    try {
      const query = url.id || "";
      const museums = await MuseumResource.searchMuseum(query);
      if (museums) {
        museums.forEach((museum) => {
          // searchResultContainer.innerHTML += createCategoryTemplate(museum);
          const museumItem = document.createElement("li");
          museumItem.classList.add("museum-item-category");
          museumItem.innerHTML = createCategoryTemplate(museum);
          searchResultContainer.appendChild(museumItem);

          const exploreLink = museumItem.querySelector(".card-link");
          exploreLink.addEventListener("click", (event) => {
            event.preventDefault();
            const museumId = museum.id_museum;
            console.log(museumId);
            window.location.hash = `#/detail/${museumId}`;
          });
        });
      } else {
        searchResultContainer.innerHTML += createEmptyMuseumTemplate();
      }
    } catch (error) {
      console.log("Error fetching search result:", error);
      searchResultContainer.innerHTML += createEmptyMuseumTemplate();
    }
  },
};

export default SearchResult;
