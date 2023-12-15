const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    getAllMuseums: (req, res) => {
        const query = `SELECT * FROM museum`;

        db.query(query, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Gagal mendapatkan data semua museum',
                    error: err.message
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: 'Berhasil mendapatkan data semua museum',
                    data: results
                });
            }
        });
    },
    
    getMuseumById: (req, res) => {
        const id = req.params.id;

        const museumQuery = `SELECT
            museum.id_museum,
            museum.nama,
            museum.kategori,
            museum.poster_url,
            museum.kota_kabupaten,
            museum.provinsi,
            museum.hari_buka,
            museum.jam_buka,
            museum.rating,
            museum.htm,
            museum.ringkasan,
            museum.lokasi_url,
            GROUP_CONCAT(gallery_museum.gambar_url) AS gallery
            FROM
            museum
            INNER JOIN gallery_museum ON museum.id_museum = gallery_museum.id_museum
            WHERE
            museum.id_museum = ? 
            GROUP BY
            museum.id_museum`;

        db.query(museumQuery, [id], (err, museumResults) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: 'Gagal mendapatkan data museum berdasarkan id',
                    error: err.message
                });
            } else {
                const museumData = museumResults[0];

                const reviewQuery = `SELECT * FROM reviews_museum WHERE id_museum = ?`;

                db.query(reviewQuery, [id], (err, reviewResults) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            success: false,
                            message: 'Gagal mendapatkan review museum',
                            error: err.message
                        });
                    } else {
                        museumData.reviews = reviewResults;
                        res.status(200).json({
                            success: true,
                            message: 'Berhasil mendapatkan data museum berdasarkan id',
                            data: museumData
                        });
                    }
                });
            }
        });
    },

    getMuseumBySearch: (req, res) => {
        const q = req.query.q;
        if (!q) {
            return res.status(400).json({
                success: false,
                message: 'Pencarian tidak valid. Silakan masukkan kata kunci pencarian.',
                error: 'Pencarian tidak valid'
            });
        }

        const query = `SELECT * FROM museum WHERE nama LIKE ? OR kota_kabupaten LIKE ? OR provinsi LIKE ? OR kategori LIKE ? OR rating LIKE ?`;
        const searchTerm = `%${q}%`;
        db.query(query, [searchTerm, searchTerm, searchTerm, searchTerm, searchTerm], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Gagal mendapatkan data museum berdasarkan pencarian',
                    error: err.message
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: 'Berhasil mendapatkan data museum berdasarkan pencarian',
                    data: results
                });            
            }
        });
    },

    getMuseumByProvinsi: (req, res) => {
        const allowedProvinces = ['banten', 'dki jakarta', 'jawa barat', 'jawa tengah', 'jawa timur', 'yogyakarta'];
        const provinsi = req.params.provinsi.toLowerCase();

        // Periksa apakah provinsi valid
        if (!allowedProvinces.includes(provinsi)) {
            return res.status(400).json({
                success: false,
                message: 'Provinsi tidak valid. Silakan pilih provinsi yang benar.',
                error: 'Provinsi tidak valid'
            });
        }

        // Menghilangkan dua suku kata dari provinsi
        const provinsiTanpaDuaSukuKata = provinsi.replace(/\b\w{1,2}\b/g, '');

        const query = 'SELECT * FROM museum WHERE LOWER(provinsi) = ?';
        db.query(query, [provinsiTanpaDuaSukuKata], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: 'Gagal mendapatkan data museum berdasarkan provinsi',
                    error: err.message
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: 'Berhasil mendapatkan data museum berdasarkan provinsi',
                    data: results
                });
            }
        });
    },

    getMuseumByKategori: (req, res) => {
        const allowedKategories = [
            'agama', 'antropologi', 'arkeologi', 
            'bencana', 'biografi', 'biologi', 'budaya', 
            'edukasi', 'ekonomi', 'etnografi', 
            'geologi', 'geologi dan sejarah', 
            'ilmu alam', 'ilmu pengetahuan', 'industri', 
            'kebudayaan', 'kesehatan', 'khusus', 'kriptologi', 
            'media', 'memorial', 'militer', 
            'paleontologi', 'pendidikan', 'penerbangan', 
            'rekor', 
            'sains', 'satwa', 'sejarah', 'sejarah dan budaya', 'sejarah dan ekonomi', 
            'sejarah dan ilmu pengetahuan', 'sejarah dan militer', 'sejarah dan perjuangan', 
            'sejarah dan seni', 'sejarah dan teknologi', 'sejarah budaya dan geologi', 
            'sejarah budaya dan religi', 'seni', 'seni dan budaya', 'seni dan sejarah', 
            'seni rupa', 'teknologi', 'transportasi', 'umum'
        ];
        const kategori = req.params.kategori;
    
        // Periksa apakah kategori valid
        if (!allowedKategories.includes(kategori)) {
          return res.status(400).json({
            success: false,
            message: 'Kategori tidak valid. Silakan pilih kategori yang benar.',
            error: 'Kategori tidak valid'
          });
        }
      
        const query = 'SELECT * FROM museum WHERE LOWER(kategori) = ?';
        db.query(query, [kategori], (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: 'Gagal mendapatkan data museum berdasarkan kategori',
              error: err.message
            });
          } else {
            // Jika hasil query kosong, kembalikan status 404 - Not Found
            if (results.length === 0) {
              return res.status(404).json({
                success: false,
                message: 'Data museum tidak ditemukan berdasarkan kategori yang diminta',
                error: 'Data tidak ditemukan'
              });
            } else {
              res.status(200).json({
                success: true,
                message: 'Berhasil mendapatkan data museum berdasarkan kategori',
                data: results
              });
            }
          }
        });
    },

    getMuseumByRating: (req, res) => {
        const rating = req.params.rating;
        const query = 'SELECT * FROM museum WHERE rating = ?';
        db.query(query, [rating], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Gagal mendapatkan data museum berdasarkan rating',
                    error: err.message
                });
            } else {
                if(results.length === 0) {
                    return res.status(404).json({
                        success: false,
                        message: 'Data museum tidak ditemukan berdasarkan rating yang diminta',
                        error: 'Data tidak ditemukan'
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: 'Berhasil mendapatkan data museum berdasarkan rating',
                        data: results
                    });
                }
            }
        });
    },

    getProvinsi: (req, res) => {
        const query = `SELECT DISTINCT provinsi FROM museum`;
        db.query( query, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Gagal mendapatkan data provinsi',
                    error: err.message
                });
            } else {
                const provinsiList = results.map((result) => result.provinsi);
                const responseObj =  { provinsi: provinsiList };

                res.status(200).json({
                    success: true,
                    message: 'Berhasil mendapatkan data provinsi',
                    data: responseObj
                });
            }
        });
    }, 

    addReview: (req, res) => {
        const id = req.params.id;
        const reviewData = {
            ...req.body,
            id: uuidv4(),
            id_museum: id,
            created_at: new Date().toISOString(),
        }
    
        if(!id || !reviewData.nama || !reviewData.review) {
            return res.status(400).json({
                success: false,
                message: 'Data tidak valid. Pastikan data diisi dengan benar.',
                error: 'Data tidak valid'
            });
        }
    
        const query = 'INSERT INTO reviews_museum SET ?';
        db.query(query, reviewData, (err, results) => {
            if(err) {
                return res.status(500).json({
                    success: false,
                    message: 'Gagal menambahkan review',
                    error: err.message
                });
            } else {
                return res.status(201).json({
                    success: true,
                    message: 'Berhasil menambahkan review',
                    data: reviewData
                });
            }
        });
    }

}