// const routes = require('express').Router();

// const {
//     getAllMuseums,
//     getMuseumBySearch,
//     getMuseumById,
//     getMuseumByProvinsi,
//     getMuseumByKategori, 
//     getMuseumByRating,
//     getProvinsi,
//     addReview,
// } = require('../controller');

// routes.get('/', getAllMuseums);
// routes.get('/museum', getAllMuseums);
// routes.get('/museum/search', getMuseumBySearch);
// routes.get('/museum/:id', getMuseumById);
// routes.post('/museum/:id/add-review', addReview );
// routes.get('/provinsi', getProvinsi);
// routes.get('/museum/provinsi/:provinsi', getMuseumByProvinsi);
// routes.get('/museum/kategori/:kategori', getMuseumByKategori);
// routes.get('/museum/rating/:rating', getMuseumByRating);

// module.exports = routes;

const routes = require('express').Router();
const {
    getAllMuseums,
    getMuseumBySearch,
    getMuseumById,
    getMuseumByProvinsi,
    getMuseumByKategori, 
    getMuseumByRating,
    getProvinsi,
    addReview,
} = require('../controller');

// Middleware untuk memvalidasi ID museum yang diterima dalam rute
function validateMuseumId(req, res, next) {
    const id = req.params.id;
    if (!id || !/^\d+$/.test(id)) {
        return res.status(400).json({
            success: false,
            message: 'ID museum tidak valid. Harap berikan ID museum yang valid.',
            error: 'ID museum tidak valid'
        });
    }
    next();
}

// Middleware untuk memvalidasi input review sebelum menambahkannya
function validateReviewInput(req, res, next) {
    const id = req.params.id;
    const { nama, review } = req.body;
    if (!id || !nama || !review) {
        return res.status(400).json({
            success: false,
            message: 'Data tidak valid. Pastikan data diisi dengan benar.',
            error: 'Data tidak valid'
        });
    }
    next();
}

// Rute-rute yang telah diperbarui dengan middleware untuk validasi
routes.get('/', getAllMuseums);
routes.get('/museum', getAllMuseums);
routes.get('/museum/search', getMuseumBySearch);
routes.get('/museum/:id', validateMuseumId, getMuseumById);
routes.post('/museum/:id/add-review', validateMuseumId, validateReviewInput, addReview);
routes.get('/provinsi', getProvinsi);
routes.get('/museum/provinsi/:provinsi', getMuseumByProvinsi);
routes.get('/museum/kategori/:kategori', getMuseumByKategori);
routes.get('/museum/rating/:rating', getMuseumByRating);

// Middleware untuk menangani kasus di mana params URL tidak ditemukan
routes.use((req, res) => {
    return res.status(404).json({
        success: false,
        message: 'Rute tidak ditemukan',
        error: 'Rute tidak ditemukan'
    });
});

module.exports = routes;
