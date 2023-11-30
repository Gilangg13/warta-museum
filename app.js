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
    const query = `SELECT * FROM museum WHERE nama LIKE '%${keyword}%'`;
    db.query(query, (err, results) => {
        if (err) {
            console.log(err);
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
    const query = `SELECT * FROM museum WHERE id = ${id}`;
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
        'Agama', 'Antropologi', 'Arkeologi', 
        'Bencana', 'Biografi', 'Biologi', 'Budaya', 
        'Edukasi', 'Ekonomi', 'Etnografi', 
        'Geologi', 'Geologi dan Sejarah', 
        'Ilmu Alam', 'Ilmu Pengetahuan', 'Industri', 
        'Kebudayaan', 'Kesehatan', 'Khusus', 'Kriptologi', 
        'Media', 'Memorial', 'Militer', 
        'Paleontologi', 'Pendidikan', 'Penerbangan', 
        'Rekor', 
        'Sains', 'Satwa', 'Sejarah', 'Sejarah dan Budaya', 'Sejarah dan Ekonomi', 
        'Sejarah dan Ilmu Pengetahuan', 'Sejarah dan Militer', 'Sejarah dan Perjuangan', 
        'Sejarah dan Seni', 'Sejarah dan Teknologi', 'Sejarah Budaya dan Geologi', 
        'Sejarah Budaya dan Religi', 'Seni', 'Seni dan Budaya', 'Seni dan Sejarah', 
        'Seni rupa', 'Teknologi', 'Transportasi', 'Umum'
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