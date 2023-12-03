const express = require('express');
const app = express();
const db = require('./src/config/database.js');
const port = process.env.PORT || 5001;
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/museum', (req, res) => {
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
});

app.get('/museum/search', (req, res) => {
    const keyword = req.query.keyword;
    const query = 'SELECT * FROM museum WHERE nama LIKE ?';
    const searchKeyword = `%${keyword}%`;

    db.query(query, [searchKeyword], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
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
});

app.get('/museum/:id', (req, res) => {
    const id = req.params.id;
    const query = `SELECT
    museum.id,
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
  INNER JOIN gallery_museum ON museum.id = gallery_museum.id_museum
    WHERE
        museum.id = ${id}
  GROUP BY
    museum.id`;

    db.query(query, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Gagal mendapatkan data museum berdasarkan id',
                error: err.message
            });
        } else {
            res.status(200).json({
                success: true,
                message: 'Berhasil mendapatkan data museum berdasarkan id',
                data: results
            });
        }
    });
});

app.get('/museum/provinsi/:provinsi', (req, res) => {
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
});

app.get('/museum/kategori/:kategori', (req, res) => {
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
});

app.listen(port, () => console.log(`Server running on port ${port}`));