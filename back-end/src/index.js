const express = require('express');
const app = express();
const cors = require('cors');

const rotas = require('./rotas');

app.use(express.json())
app.use(cors());
app.use(rotas);

app.listen(3003)