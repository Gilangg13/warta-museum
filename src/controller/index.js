// const db = require('./config/database');

// module.exports = {
//     getAllMuseums: (req, res) => {
//         const query = `SELECT * FROM museum`;
//         db.query(query, (err, results) => {
//             if (err) {
//                 console.log(err);
//                 return res.status(500).json({
//                     message: 'Gagal mendapatkan data museum',
//                     error: err.message
//                 });
//             } else {
//                 res.status(200).json({
//                     success: true,
//                     message: 'Berhasil mendapatkan data museum',
//                     data: results
//                 });
//             }
//         });
//     }
// };