/* eslint-disable function-paren-newline */
/* eslint-disable no-param-reassign */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import MuseumSource from "../../data/museum-resource";

import { createMuseumItemTemplate } from "../templates/template-creator";

const Home = {
  async render() {
    const provinsis = [
      "DKI Jakarta",
      "Jawa Barat",
      "Jawa Tengah",
      "Jawa Timur",
      "Banten",
    ];

    return `
        <section class="hero-banner text-light py-5">
            <!-- <div class="container"> -->
            <div class="row row align-items-center">
                <div class="col-lg-6 order-lg-1">
                    <img src="./images/hero.png" class="img-fluid" alt="Web Development">
                </div>
                <div class="col-lg-6">
                    <h1 class="mt-5">Eksplorasi Budaya, Museum sebagai Tempat Penemuan Tanpa Batas.</h1>
                    <p class="lead text-light my-4">Eksplorasi Tanpa Batas, Belajar Tanpa Henti: Museum Virtual Anda.</p>
                    <a href="#" class="btn btn-outline-secondary btn-lg border">Explore Now</a>
                </div>
            </div>
            <!-- </div> -->
        </section>


        <section id="content">
            <div class="content-heading text-center">
                <h2>Temukan Museum Favoritmu</h2>
                <p>Menelusuri Jejak Budaya: Eksplorasi Sejarah, Nikmati Karya Seni, dan Temukan Inspirasi di Setiap Sudut
                Museum.</p>
            </div>

             <div class="museum-list-container" id="provinsiContainer">
                ${provinsis
                  .map(
                    (provinsi) => `
                    <div class="museum-category mt-5 mb-3">
                      <h2>${provinsi}</h2>
                        <ul class="museum-list ${provinsi
                          .replace(/\s+/g, "-")
                          .toLowerCase()}">
                        </ul>

                        <div class="carousel slide">
                            <button class="carousel-prev" data-provinsi="${provinsi
                              .replace(/\s+/g, "-")
                              .toLowerCase()}">
                              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                              <span class="visually-hidden">Previous</span>
                            </button>

                            <div class="see-all-link btn btn-dark" data-provinsi="${provinsi
                              .replace(/\s+/g, "-")
                              .toLowerCase()}">
                                <a href="#" class="text-decoration-none text-white">Lihat Semua</a>
                            </div>

                            <button class="carousel-next" data-provinsi="${provinsi
                              .replace(/\s+/g, "-")
                              .toLowerCase()}">
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
      const provinsis = [
        "DKI Jakarta",
        "Jawa Barat",
        "Jawa Tengah",
        "Jawa Timur",
        "Banten",
      ];

      for (const provinsi of provinsis) {
        const museums = await MuseumSource.museumByProvinsi(provinsi);
        const ulProvinsi = document.querySelector(
          `.museum-list.${provinsi.replace(/\s+/g, "-").toLowerCase()}`
        );

        const carouselPrev = document.querySelector(
          `.carousel-prev[data-provinsi="${provinsi
            .replace(/\s+/g, "-")
            .toLowerCase()}"]`
        );
        const carouselNext = document.querySelector(
          `.carousel-next[data-provinsi="${provinsi
            .replace(/\s+/g, "-")
            .toLowerCase()}"]`
        );

        // batas jumlah museum yang ditampilkan
        const slicedMuseums = museums.slice(0, 12);

        slicedMuseums.forEach((museum) => {
          const museumItem = document.createElement("li");
          museumItem.classList.add("museum-item");

          museumItem.innerHTML = createMuseumItemTemplate(museum);
          ulProvinsi.appendChild(museumItem);

          // klik item museum
          // museumItem.addEventListener("click", () => {
          //   // Navigasi ke halaman detail menggunakan hash URL
          //   window.location.hash = `#/detail/${museum.id}`;
          // });
        });

        // Tambahkan link "Lihat Semua"
        const seeAllLink = document.querySelector(
          `.see-all-link[data-provinsi="${provinsi
            .replace(/\s+/g, "-")
            .toLowerCase()}"] a`
        );
        seeAllLink.href = `/#/provinsi/${provinsi
          .replace(/\s+/g, "-")
          .toLowerCase()}`;

        // Tambahkan event listener untuk tombol "Previous"
        carouselPrev.addEventListener("click", () =>
          this.carouselPrevClickHandler(ulProvinsi)
        );

        // Tambahkan event listener untuk tombol "Next"
        carouselNext.addEventListener("click", () =>
          this.carouselNextClickHandler(ulProvinsi, slicedMuseums.length)
        );
      }
    } catch (error) {
      console.error(`Error fetching and rendering museums: ${error}`);
    }
  },

  carouselPrevClickHandler(ulProvinsi) {
    ulProvinsi.scrollLeft -= 300; // Sesuaikan jumlah scroll yang diinginkan
  },

  carouselNextClickHandler(ulProvinsi, museumCount) {
    const itemWidth = 300; // Sesuaikan lebar item museum
    ulProvinsi.scrollLeft += itemWidth; // Sesuaikan jumlah scroll yang diinginkan
    if (ulProvinsi.scrollLeft >= itemWidth * museumCount) {
      ulProvinsi.scrollLeft = 0; // Reset ke awal setelah mencapai akhir daftar
    }
  },
};

export default Home;
