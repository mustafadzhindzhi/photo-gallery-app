const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/photoRoute');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/Photos');

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
