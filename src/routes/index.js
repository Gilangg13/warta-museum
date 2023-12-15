const routes = require('express').Router();

const {
    getAllMuseums,
    getMuseumBySearch,
    getMuseumById,
    getMuseumByProvinsi,
    getMuseumByKategori, 
    getMuseumByRating,
    getProvinsi,
} = require('../controller');

routes.get('/', getAllMuseums);
routes.get('/museum', getAllMuseums);
routes.get('/museum/search', getMuseumBySearch);
routes.get('/museum/:id', getMuseumById);
routes.get('/provinsi', getProvinsi);
routes.get('/museum/provinsi/:provinsi', getMuseumByProvinsi);
routes.get('/museum/kategori/:kategori', getMuseumByKategori);
routes.get('/museum/rating/:rating', getMuseumByRating);

module.exports = routes;