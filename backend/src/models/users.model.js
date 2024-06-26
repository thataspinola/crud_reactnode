/*
 * file: src/models/user.model.js
 * description: arquivo responsavel pelo modelo da classe 'usuarios'
 * data: 25/06/2024
 * author: Thamiris Gaspar
*/

const db = require('../config/mySqlConnection.config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
