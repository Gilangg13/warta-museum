/* eslint-disable class-methods-use-this */
import { createMuseumItemFavoriteTemplate } from "../../templates/template-creator";

class FavoriteMuseumView {
  getTemplate() {
    return `
    <section id="content">
        <div class="museum-list-container" id="museum-list-container">
          <div class="mt-5 mb-3">
            <h2 class="text-white text-center">Your Liked Museum</h2>
            <ul class="museum-list-category"></ul>
          </div>
        </div>
    </section>
        `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById("query").addEventListener("change", (event) => {
      callback(event.target.value);
    });
  }

  showFavoriteMuseums(museums) {
    let html;

    if (museums.length > 0) {
      html = museums.reduce(
        (carry, museum) =>
          carry.concat(createMuseumItemFavoriteTemplate(museum)),
        ""
      );
    } else {
      html = this._getEmptyMuseumsTemplate();
    }

    document.querySelector(".museum-list-category").innerHTML = html;
    // const museumContainer = document.querySelector(".museum-list-category");

    // const museumItem = document.createElement("li");

    // museumItem.classList.add("museum-item-category");
    // museumItem.innerHTML = html;
    // museumContainer.appendChild(museumItem);

    // const exploreLink = museumItem.querySelector(".card-link");
    // exploreLink.addEventListener("click", (event) => {
    //   event.preventDefault();
    //   const museumId = museums.id_museum;
    //   console.log(museumId);
    //   window.location.hash = `#/detail/${museumId}`;
    // });

    document
      .querySelector(".museum-list-category")
      .dispatchEvent(new Event("museum-list-category:updated"));
  }

  _getEmptyMuseumsTemplate() {
    return `
        <div class="museum-item__not__found text-center">
            Tidak ada museum untuk ditampilkan
        </div>
    `;
  }
}

export default FavoriteMuseumView;
