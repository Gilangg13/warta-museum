/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
const createMuseumDetailImage = (museum) =>
  `<img class="lazyload" data-src="${museum.poster_url}" alt="${museum.nama}">`;

const createMuseumDetailTemplate = (museum) => `
    <h2 class="museum-detail-title text-center text-white py-2">${museum.nama}</h2>
    <div class="row">
        <div class="col-lg-4 col-md-12">
            <img class="lazyload museum-detail-poster rounded" data-src="${museum.poster_url}" alt="${museum.nama}">
        </div>
        <div class="col-lg-8 col-md-12 museum-detail-content">
            <table class="table museum-detail-table border-0">
                <tbody>
                    <tr>
                        <th>
                            <i class="fa fa-solid fa-tag"></i>
                            <span class="px-2">Kategori</span>
                        </th>
                        <td>${museum.kategori}</td>
                    </tr>

                    <tr>
                        <th>
                            <i class="fa fa-building"></i>
                            <span class="px-3">Lokasi</span>
                        </th>
                        <td>${museum.kota_kabupaten}, ${museum.provinsi}</td>
                    </tr>

                    <tr>
                        <th>
                            <i class="fa fa-map-marker"></i>
                            <span class="px-3">Jam Buka</span>
                        </th>
                        <td>${museum.hari_buka} ${museum.jam_buka}</td>
                    </tr>

                    <tr>
                        <th>
                            <i class="fa fa-solid fa-star"></i>
                            <span class="px-3">Rating</span>
                        </th>
                        <td>${museum.rating}</td>
                    </tr>
                    <tr>
                        <th>
                            <i class="fa fa-solid fa-tag"></i>
                            <span class="px-3">HTM</span>
                        </th>
                        <td>${museum.htm}</td>
                    </tr>
                </tbody>
            </table>
            <div class="museum-detail-description">
                <h4>Description</h4>
                <p>${museum.ringkasan}</p>
            </div>
        </div>
  </div>
`;

const createMuseumGalleryItems = (museum) => {
  if (museum && museum.gallery) {
    const galleryUrls = museum.gallery.split(",");

    // Batasi hanya 5 gambar
    const limitedGalleryUrls = galleryUrls.slice(0, 5);

    const galleryItems = limitedGalleryUrls.map((url, index) => {
      return `
        <div class="gallery-item image-${index + 1}">
            <img class="lazyload" data-src="${url.trim()}" alt="Museum Image ${
        index + 1
      }">
            <div class="overlay"></div>
        </div>
      `;
    });

    return galleryItems.join("");
  }

  return "";
};

const createMuseumLocationTemplate = (museum) => `
<h2 class="museum-detail-title text-center text-white mt-5">Lokasi Museum</h2>

<h5 class="text-center text-white mb-3">${museum.kota_kabupaten}, ${museum.provinsi}</h5>
    <div class="map-container">
        <iframe src="${museum.lokasi_url}" frameborder="0" style="border:0" allowfullscreen></iframe>
    </div>

`;

const createCategoryTemplate = (museum) => `
            <img src="${museum.poster_url}" class="d-block card-img-top" alt="${museum.nama}">
            <div class="museum-info">
                <h3 class="museum-title">${museum.nama}</h3>
                <p class="museum-rating"><i class="fa fa-solid fa-star pe-2"></i>${museum.rating}</p>
                <p class="museum-location">${museum.kota_kabupaten}, ${museum.provinsi}</p>
            </div>
            <div class="card-link-wrapper">
              <a href="#/detail/${museum.id_museum}" class="card-link">Explore</a> 
            </div>
`;

const createMuseumItemTemplate = (museum) => `
      <div class="carousel-inner">
        <div class="carousel-item active">
            <img data-src="${museum.poster_url}" class="lazyload d-block card-img-top" alt="${museum.nama}">
            <div class="museum-info">
                <h3 class="museum-title">${museum.nama}</h3>
                <p class="museum-rating"><i class="fa fa-solid fa-star pe-2"></i>${museum.rating}</p>
                <p class="museum-location">${museum.kota_kabupaten}, ${museum.provinsi}</p>
            </div>
            <div class="card-link-wrapper">
             <h3 class="card-link">
                    <a href="#/detail/${museum.id_museum}" class="text-decoration-none">Explore</a> 
                </h3> 
            </div>
        </div>
      </div>
`;

const createMuseumItemFavoriteTemplate = (museum) => `
        <li class="museum-item-category">
             <img data-src="${museum.poster_url}" class="lazyload d-block card-img-top" alt="${museum.nama}">
            <div class="museum-info">
                <h3 class="museum-title">${museum.nama}</h3>
                <p class="museum-rating"><i class="fa fa-solid fa-star pe-2"></i>${museum.rating}</p>
                <p class="museum-location">${museum.kota_kabupaten}, ${museum.provinsi}</p>
            </div>
            <div class="card-link-wrapper">
                <h3 class="card-link">
                    <a href="#/detail/${museum.id}">Explore</a> 
                </h3>
            </div>
        </li>
`;

const createEmptyMuseumTemplate = () => `
    <div class="museum-item__not__found text-center">
        Tidak ada museum untuk ditampilkan
    </div>
`;

const createAboutTemplate = () => `
<h2 class="museum-detail-title text-white mt-2 mb-3">About Us</h2>
            <div class="col-lg-8 col-md-12 col-sm-12">
                <p class="text-left text-secondary">
                    Warta Museum adalah Web Aplikasi yang berguna untuk memperkenalkan museum - museum yang ada di Pulau Jawa. 
                    Warta Museum sendiri memiliki arti Warta (Berita) dan Museum (Lembaga yang memperkenalkan sejarah) sesuai nama 
                    Aplikasi kami tujuan kami hanya satu yaitu memperkenalkan Museum - Museum yang ada di Pulau Jawa kepada Masyarakat 
                    Luas supaya kita dapat terus mengingat sejarah - sejarah dan mempelajarinya supaya dapat berguna bagi kehidupan kita kedepan.</p>
            </div>


            <h2 class="museum-detail-title text-white mt-5 mb-3">Say hi to our team</h2>

            <div class="user-profile">
                <div class="card card-profile">
                    <div class="upper">
                        <div class="profile text-center mt-4 pt-2">
                            <img src="./user-profile/gilang-gumelar.jpg" class="rounded-circle">
                        </div>
                    </div>
                    <div class="text-center coba">
                        <h4 class="mb-">Gilang Gumelar</h4>
                        <span class="text-white d-block mb-4">Front End Developer</span>

                        <div class="d-flex justify-content-between align-items-center my-3 px-4">
                            <div class="stats">
                                <a href="https://github.com/Gilangg13/">
                                    <i class="fa-brands fa-github"></i>
                                </a>
                            </div>
                            <div class="stats">
                                <a href="https://www.instagram.com/ggilang13/">
                                    <i class="fa-brands fa-instagram"></i>
                                </a>
                            </div>
                            <div class="stats">
                                <a href="https://www.linkedin.com/in/gilang-gumelar-96b35621a/">
                                    <i class="fa-brands fa-linkedin"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card card-profile">
                    <div class="upper">
                        <div class="profile text-center mt-4 pt-2">
                            <img src="./user-profile/muhammad-zaedane.jpg" class="rounded-circle">
                        </div>
                    </div>
                    <div class="text-center coba">
                        <h4 class="mb-2">Muhammad Zaedane</h4>
                        <span class="text-white d-block mb-4">Front End Developer</span>

                        <div class="d-flex justify-content-between align-items-center my-3 px-4">
                            <div class="stats">
                                <a href="https://github.com/kerandamonyet">
                                    <i class="fa-brands fa-github"></i>
                                </a>
                            </div>
                            <div class="stats">
                                <a href="https://www.instagram.com/kerandamonyet/">
                                    <i class="fa-brands fa-instagram"></i>
                                </a>
                            </div>
                            <div class="stats">
                                <a href="https://www.linkedin.com/in/muhammad-zaedane-689551278/">
                                    <i class="fa-brands fa-linkedin"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card card-profile">
                    <div class="upper">
                        <div class="profile text-center mt-4 pt-2">
                            <img src="./user-profile/raihan-daffa-aziz.jpg" class="rounded-circle">
                        </div>
                    </div>
                    <div class="text-center coba">
                        <h4 class="mb-2">Raihan Daffa Aziz</h4>
                        <span class="text-white d-block mb-4">Front End Developer</span>

                        <div class="d-flex justify-content-between align-items-center my-3 px-4">
                            <div class="stats">
                                <a href="https://github.com/raihanndaffaa">
                                    <i class="fa-brands fa-github"></i>
                                </a>
                            </div>
                            <div class="stats">
                                <a href="">
                                    <i class="fa-brands fa-instagram"></i>
                                </a>
                            </div>
                            <div class="stats">
                                <a href="https://www.linkedin.com/in/raihanndaffaa">
                                    <i class="fa-brands fa-linkedin"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card card-profile">
                    <div class="upper">
                        <div class="profile text-center mt-4 pt-2">
                            <img src="./user-profile/taqiy-rizqi-jagad-samudra.jpg" class="rounded-circle">
                        </div>
                    </div>
                    <div class="text-center coba">
                        <h4 class="mb-2">Taqiy Rizky Jagad Samudra</h4>
                        <span class="text-white d-block mb-4">Front End Developer</span>

                        <div class="d-flex justify-content-between align-items-center my-3 px-4">
                            <div class="stats">
                                <a href="https://github.com/Taq1yRizqi">
                                    <i class="fa-brands fa-github"></i>
                                </a>
                            </div>
                            <div class="stats">
                                <a href="https://www.instagram.com/sinibejo/">
                                    <i class="fa-brands fa-instagram"></i>
                                </a>
                            </div>
                            <div class="stats">
                                <a href="https://www.linkedin.com/in/TaqiyRizqi/">
                                    <i class="fa-brands fa-linkedin"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card card-profile">
                    <div class="upper">
                        <div class="profile text-center mt-4 pt-2">
                            <img src="./user-profile/firman-sobari.jpg" class="rounded-circle">
                        </div>
                    </div>
                    <div class="text-center coba">
                        <h4 class="mb-2">Firman Sobari</h4>
                        <span class="text-white d-block mb-4">Front End Developer</span>

                        <div class="d-flex justify-content-between align-items-center my-3 px-4">
                            <div class="stats">
                                <a href="https://github.com/FirmanSobari">
                                    <i class="fa-brands fa-github"></i>
                                </a>
                            </div>
                            <div class="stats">
                                <a href="https://www.instagram.com/frmnsbry_/">
                                    <i class="fa-brands fa-instagram"></i>
                                </a>
                            </div>
                            <div class="stats">
                                <a href="http://www.linkedin.com/in/firman-sobari-404415281">
                                    <i class="fa-brands fa-linkedin"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
`;

const createLikeMuseumButtonTemplate = () => `
  <button aria-label="like this museum" id="likeButton" class="like">
    <i class="fa-regular fa-heart" aria-hidden="true"></i>
  </button>
`;

const createUnlikeMuseumButtonTemplate = () => `
  <button aria-label="unlike this museum" id="likeButton" class="like">
    <i class="fa-solid fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createMuseumItemTemplate,
  createMuseumDetailTemplate,
  createMuseumDetailImage,
  createMuseumGalleryItems,
  createAboutTemplate,
  createLikeMuseumButtonTemplate,
  createUnlikeMuseumButtonTemplate,
  createMuseumItemFavoriteTemplate,
  createMuseumLocationTemplate,
  createCategoryTemplate,
  createEmptyMuseumTemplate,
};