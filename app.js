const express = require('express');
const app = express();
const port = process.env.PORT || 5001;
const cors = require('cors');
const Router = require('./src/routes/index');

app.use(cors());
app.use(express.json());
app.set('port', port);

app.use('/api', Router);

app.listen(port, () => console.log(`Server running on port ${port}`));