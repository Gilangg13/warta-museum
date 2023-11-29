const express = require('express');
const app = express();
const db = require('./src/config/database.js');
const port = process.env.PORT || 5001;

app.use(express.json());
app.get('/museum', (req, res) => {
    const query = `SELECT * FROM museum`;
    db.query(query, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Gagal mendapatkan data museum',
                error: err.message
            });
        } else {
            res.status(200).json({
                success: true,
                message: 'Berhasil mendapatkan data museum',
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
                message: 'Gagal mendapatkan data museum',
                error: err.message
            });
        } else {
            res.status(200).json({
                success: true,
                message: 'Berhasil mendapatkan data museum',
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
                message: 'Gagal mendapatkan data museum',
                error: err.message
            });
        } else {
            res.status(200).json({
                success: true,
                message: 'Berhasil mendapatkan data museum',
                data: results
            });
        }
    });
});

app.listen(port, () => console.log(`Server running on port ${port}`));