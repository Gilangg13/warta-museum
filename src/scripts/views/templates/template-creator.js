/* eslint-disable import/prefer-default-export */

const createMuseumDetailTemplate = (museum) => `
<h2 class="museum-detail-title text-center text-white">${museum.nama}</h2>

  <div class="row">
      <div class="col-lg-4 col-md-12">
          <img class="museum-detail-poster" src="${museum.poster_url}" alt="">
      </div>
      <div class="col-lg-8 col-md-12 museum-detail-content">

          <table class="table museum-detail-table border-0">
              <tbody>
                  <tr>
                      <th>
                          <i class="fa fa-solid fa-star"></i>
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
                          <i class="fa fa-solid fa-tag"></i>
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

const createMuseumGalleryTemplate = (museum) => `
<h2 class="museum-detail-title text-center text-white mt-5 mb-3 py-3">Gallery Museum</h2>
<div class="row">
  <div class="gallery">
    <div class="gallery-item image-1">
        <img src="${museum.poster_url}" alt="${museum.nama}">
        <div class="overlay">Museum 1</div>
    </div>
    <div class="gallery-item image-2">
        <img src="${museum.poster_url}" alt="${museum.nama}">
        <div class="overlay">Museum 2</div>
    </div>
    <div class="gallery-item image-3">
        <img src="${museum.poster_url}" alt="${museum.nama}">
        <div class="overlay">Museum 3</div>
    </div>
    <div class="gallery-item image-4">
        <img src="${museum.poster_url}" alt="${museum.nama}">
        <div class="overlay">Museum 4</div>
    </div>
    <div class="gallery-item image-5">
        <img src="${museum.poster_url}" alt="${museum.nama}">
        <div class="overlay">Museum 5</div>
    </div>
  </div>
</div>
`;

const createMuseumLocationTemplate = (museum) => `
<h2 class="museum-detail-title text-center text-white mt-5 mb-3 py-3">Lokasi</h2>

<div class="card map-card">
  <div class="card-body">
    <div class="map-container">
        <iframe src="${museum.lokasi_url}" frameborder="0" style="border:0" allowfullscreen></iframe>
    </div>
    <div class="map-details">
        <h3>Location</h3>
        <p>${museum.nama}<br>${museum.kota_kabupaten}, ${museum.provinsi}
        </p>
    </div>
  </div>
</div>
`;

const createMuseumSocialTemplate = (museum) => `
<div class="text-center text-white mt-5 mb-3 pt-3">
  <h5>${museum.nama}</h5>
</div>
<div class="museum-social-media">
  <div class="row mx-auto">
    <div class="col-12 d-flex justify-content-center my-3">
        <a href="#" class="fs-2 px-4">
            <i class="fab fa-facebook-square"></i>
        </a>
        <a href="#" class="fs-2 px-4">
            <i class="fab fa-instagram-square"></i>
        </a>
        <a href="#" class="fs-2 px-4">
            <i class="fab fa-twitter-square"></i>
        </a>
    </div>
    <div class="col-12 d-flex justify-content-center my-3">
        <button class="btn btn-warning">
            <i class="fas fa-plus"></i><span class="px-3">Follow</span>
        </button>
    </div>
  </div>
</div>
`;

const createMuseumItemTemplate = (museum) => `
      <div class="carousel-inner">
        <div class="carousel-item active">
            <img src="${museum.poster_url}" class="d-block w-100" alt="${museum.nama}">
            <h3 class="museum-title">${museum.nama}</h3>
            <div class="card-link-wrapper">
              <a href="/#/museum/${museum.id}" class="card-link">Explore</a> 
            </div>
        </div>
      </div>
`;

export {
  createMuseumItemTemplate,
  createMuseumDetailTemplate,
  createMuseumGalleryTemplate,
  createMuseumLocationTemplate,
  createMuseumSocialTemplate,
};
