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
              <a href="#/detail/${museum.id_museum}" class="card-link">Explore</a> 
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
              <a href="#/detail/${museum.id}" class="card-link">Explore</a> 
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
                <p class="text-left text-secondary">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam
                    necessitatibus
                    quibusdam corporis
                    fugiat numquam voluptas dolor beatae ratione obcaecati. Repellendus.
                    Impedit velit veritatis, eveniet corporis quia nesciunt ex distinctio dolorem voluptatum?
                    Similique deleniti iste quam nemo, quo nisi neque at.
                    Explicabo, rem! Alias dolore rem, quo ducimus dolorem delectus dolorum, animi nam eos fugiat
                    exercitationem beatae nostrum, dicta quos recusandae.
                    Harum nam provident laudantium at officiis sequi pariatur aspernatur repellat natus, nobis earum
                    explicabo id suscipit assumenda, itaque tempore quia?</p>
            </div>


            <h2 class="museum-detail-title text-white mt-5 mb-3">Say hi to our team</h2>

            <div class="user-profile">
                <div class="card card-profile">
                    <div class="upper">
                        <div class="profile text-center mt-4 pt-2">
                            <img src="./images/user.jpg" class="rounded-circle">
                        </div>
                    </div>
                    <div class="text-center coba">
                        <h4 class="mb-">Lorem Ipsum</h4>
                        <span class="text-white d-block mb-4">Front End Developer</span>

                        <div class="d-flex justify-content-between align-items-center my-3 px-4">
                            <div class="stats">
                                <a href="">
                                    <i class="fa-brands fa-github"></i>
                                </a>
                            </div>
                            <div class="stats">
                                <a href="">
                                    <i class="fa-brands fa-instagram"></i>
                                </a>
                            </div>
                            <div class="stats">
                                <a href="">
                                    <i class="fa-brands fa-linkedin"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card card-profile">
                    <div class="upper">
                        <div class="profile text-center mt-4 pt-2">
                            <img src="./images/user.jpg" class="rounded-circle">
                        </div>
                    </div>
                    <div class="text-center coba">
                        <h4 class="mb-2">Lorem Ipsum</h4>
                        <span class="text-white d-block mb-4">Front End Developer</span>

                        <div class="d-flex justify-content-between align-items-center my-3 px-4">
                            <div class="stats">
                                <a href="">
                                    <i class="fa-brands fa-github"></i>
                                </a>
                            </div>
                            <div class="stats">
                                <a href="">
                                    <i class="fa-brands fa-instagram"></i>
                                </a>
                            </div>
                            <div class="stats">
                                <a href="">
                                    <i class="fa-brands fa-linkedin"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card card-profile">
                    <div class="upper">
                        <div class="profile text-center mt-4 pt-2">
                            <img src="./images/user.jpg" class="rounded-circle">
                        </div>
                    </div>
                    <div class="text-center coba">
                        <h4 class="mb-2">Lorem Ipsum</h4>
                        <span class="text-white d-block mb-4">Front End Developer</span>

                        <div class="d-flex justify-content-between align-items-center my-3 px-4">
                            <div class="stats">
                                <a href="">
                                    <i class="fa-brands fa-github"></i>
                                </a>
                            </div>
                            <div class="stats">
                                <a href="">
                                    <i class="fa-brands fa-instagram"></i>
                                </a>
                            </div>
                            <div class="stats">
                                <a href="">
                                    <i class="fa-brands fa-linkedin"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card card-profile">
                    <div class="upper">
                        <div class="profile text-center mt-4 pt-2">
                            <img src="./images/user.jpg" class="rounded-circle">
                        </div>
                    </div>
                    <div class="text-center coba">
                        <h4 class="mb-2">Lorem Ipsum</h4>
                        <span class="text-white d-block mb-4">Front End Developer</span>

                        <div class="d-flex justify-content-between align-items-center my-3 px-4">
                            <div class="stats">
                                <a href="">
                                    <i class="fa-brands fa-github"></i>
                                </a>
                            </div>
                            <div class="stats">
                                <a href="">
                                    <i class="fa-brands fa-instagram"></i>
                                </a>
                            </div>
                            <div class="stats">
                                <a href="">
                                    <i class="fa-brands fa-linkedin"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card card-profile">
                    <div class="upper">
                        <div class="profile text-center mt-4 pt-2">
                            <img src="./images/user.jpg" class="rounded-circle">
                        </div>
                    </div>
                    <div class="text-center coba">
                        <h4 class="mb-2">Lorem Ipsum</h4>
                        <span class="text-white d-block mb-4">Front End Developer</span>

                        <div class="d-flex justify-content-between align-items-center my-3 px-4">
                            <div class="stats">
                                <a href="">
                                    <i class="fa-brands fa-github"></i>
                                </a>
                            </div>
                            <div class="stats">
                                <a href="">
                                    <i class="fa-brands fa-instagram"></i>
                                </a>
                            </div>
                            <div class="stats">
                                <a href="">
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
