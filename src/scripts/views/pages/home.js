/* eslint-disable max-len */
/* eslint-disable function-paren-newline */
/* eslint-disable no-param-reassign */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import MuseumSource from "../../data/museum-resource";
import { createMuseumItemTemplate } from "../templates/template-creator";

const Home = {
  async render() {
    const provinsiList = await MuseumSource.provinsiList();
    console.log(provinsiList);

    return `
        <section class="hero-banner text-light py-5">
            <div class="row align-items-center">
                <div class="col-lg-6 order-lg-1 d-flex justify-content-center">
                    
                    <picture>
                      <source class="lazyload" media="(min-width: 600px)" srcset="./images/hero-small.png" type="image/webp">
                      <source class="lazyload" media="(min-width: 600px)" srcset="./images/hero-small.png" type="image/png">

                      <source class="lazyload" media="(max-width: 600px)" srcset="./images/hero-medium.png" type="image/webp">
                      <source class="lazyload" media="(max-width: 600px)" srcset="./images/hero-medium.png" type="image/png">
                      
                      <img class="lazyload" data-src="./images/hero-small.png" 
                          alt="Museum Banner">
                    </picture>
                </div>
                <div class="col-lg-6">
                    <h1 class="mt-5">Eksplorasi Budaya, Museum sebagai Tempat Penemuan Tanpa Batas.</h1>
                    <p class="lead text-light my-4">Eksplorasi Tanpa Batas, Belajar Tanpa Henti: Museum Virtual Anda.</p>
                    <a href="#content" class="btn btn-outline-secondary btn-lg border">Explore Now</a>
                </div>
            </div>
        </section>

        <section id="content">
            <div class="content-heading text-center">
                <h2>Temukan Museum Favoritmu</h2>
                <p>Menelusuri Jejak Budaya: Eksplorasi Sejarah, Nikmati Karya Seni, dan Temukan Inspirasi di Setiap Sudut Museum.</p>
            </div>

             <div class="museum-list-container" id="provinsiContainer">
                ${provinsiList
                  .map(
                    (provinsi) => `
                    <div class="text-white text-center mt-5 mb-3">
                      <h2 class="py-2">Museum Di ${provinsi}</h2>
                        <ul class="museum-list ${provinsi.replace(
                          /\s+/g,
                          "-"
                        )}"></ul>

                        <div class="carousel slide">
                            <button class="carousel-prev" data-provinsi="${provinsi.replace(
                              /\s+/g,
                              "-"
                            )}">
                              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                              <span class="visually-hidden">Previous</span>
                            </button>

                            <a href="#/provinsi/${provinsi.toLowerCase()}" class="see-all-link text-decoration-none text-white btn btn-dark" data-provinsi="${provinsi.replace(
                      /\s+/g,
                      "-"
                    )}">Lihat Semua</a>

                            <button class="carousel-next" data-provinsi="${provinsi.replace(
                              /\s+/g,
                              "-"
                            )}">
                              <span class="carousel-control-next-icon" aria-hidden="true"></span>
                              <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                `
                  )
                  .join("")}
             </div>
        </section>
        `;
  },

  async afterRender() {
    try {
      const provinsiList = await MuseumSource.provinsiList();

      for (const provinsi of provinsiList) {
        const museums = await MuseumSource.museumByProvinsi(provinsi);
        // console.log(museums);
        const ulProvinsi = document.querySelector(
          `.museum-list.${provinsi.replace(/\s+/g, "-")}`
        );

        const slicedMuseums = museums.slice(0, 12);

        slicedMuseums.forEach((museum) => {
          const museumItem = document.createElement("li");
          museumItem.classList.add("museum-item");
          museumItem.innerHTML = createMuseumItemTemplate(museum);
          ulProvinsi.appendChild(museumItem);

          const exploreLink = museumItem.querySelector(".card-link");
          exploreLink.addEventListener("click", (event) => {
            event.preventDefault();
            const museumId = museum.id_museum;
            // console.log(museumId);
            window.location.hash = `#/detail/${museumId}`;
          });
        });

        const carouselPrev = document.querySelector(
          `.carousel-prev[data-provinsi="${provinsi.replace(/\s+/g, "-")}"]`
        );
        const carouselNext = document.querySelector(
          `.carousel-next[data-provinsi="${provinsi.replace(/\s+/g, "-")}"]`
        );
        const seeAllLink = document.querySelector(
          `.see-all-link[data-provinsi="${provinsi.replace(/\s+/g, "-")}"]`
        );

        if (seeAllLink) {
          seeAllLink.addEventListener("click", (event) => {
            event.preventDefault();
            const targetProvinsi = provinsi.toLowerCase();
            window.location.hash = `#/provinsi/${targetProvinsi}`;
            console.log(window.location.hash);
          });
        } else {
          console.error(`Error: seeAllLink not found for provinsi ${provinsi}`);
        }

        carouselPrev.addEventListener("click", () =>
          this.carouselPrevClickHandler(ulProvinsi)
        );
        carouselNext.addEventListener("click", () =>
          this.carouselNextClickHandler(ulProvinsi, slicedMuseums.length)
        );
      }
    } catch (error) {
      console.error(`Error fetching and rendering museums: ${error}`);
    }
  },

  carouselPrevClickHandler(ulProvinsi) {
    ulProvinsi.scrollLeft -= 300;
  },

  carouselNextClickHandler(ulProvinsi, museumCount) {
    const itemWidth = 300;
    ulProvinsi.scrollLeft += itemWidth;
    if (ulProvinsi.scrollLeft >= itemWidth * museumCount) {
      ulProvinsi.scrollLeft = 0;
    }
  },
};

export default Home;
