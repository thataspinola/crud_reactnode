/*
 * file: app.js
 * description: arquivo responsável por fazer a conexão com arquivo 'server.js'
 * data: 25/06/2024
 * author: Thamiris Gaspar
*/

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mySqlConnection = require('./config/mySqlConnection.config');

const app = express();

// ==> Rotas da API:
// const index = require('./routes/index');
// const userRoutes = require('./routes/user.routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(morgan('dev'));
app.use(cors());

// ==> Retornando a conexão via mysql via external file usando 'app.set()'
app.set('mysql connection', mySqlConnection.connect);

// app.use(index);
// app.use('/api/v1/', userRoutes);

module.exports = app;
