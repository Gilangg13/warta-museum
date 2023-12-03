const routes = require('express').Router();

const {
    getAllMuseums,
    getMuseumBySearch,
    getMuseumById,
    getMuseumByProvinsi,
    getMuseumByKategori, 
} = require('../controller');

routes.get('/', getAllMuseums);
routes.get('/museum', getAllMuseums);
routes.get('/museum/search', getMuseumBySearch);
routes.get('/museum/:id', getMuseumById);
routes.get('/museum/provinsi/:provinsi', getMuseumByProvinsi);
routes.get('/museum/kategori/:kategori', getMuseumByKategori);

module.exports = routes;