const express = require('express');
const app = express();
const db = require('./src/config/database.js');
const port = process.env.PORT || 5001;

app.get('/', (req, res) => {
    const query = `SELECT * FROM museum`;
    db.query(query, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                "message": 'Gagal mendapatkan data museum',
                "error": err.message
            });
        } else {
            res.status(200).json({
                "success": true,
                "message": 'Berhasil mendapatkan data museum',
                "data": results
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
                "message": 'Gagal mendapatkan data museum',
                "error": err.message
            });
        } else {
            res.status(200).json({
                "success": true,
                "message": 'Berhasil mendapatkan data museum',
                "data": results
            });
        }
    });
});

app.listen(port, () => console.log(`Server running on port ${port}`));