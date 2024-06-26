/*
 * file: src/config/mySqlConnection.config.js
 * description: arquivo responsável por fazer a conexão via msql
 * data: 25/06/2024
 * author: Thamiris Gaspar
*/

const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const HOST = process.env.MYSQL_IP;
const LOGIN = process.env.MYSQL_LOGIN;
const PASSWORD = process.env.MYSQL_PASSWORD;
const DBNAME = process.env.DB_NAME;

const connection = mysql.createConnection({
  host: HOST,
  user: LOGIN,
  password: PASSWORD,
  database: DBNAME,
});

connection.connect((err) => {
  if (err) {
    console.error('[ERROR] ', err);
    throw err;
  }

  console.info('[INFO] Conexão com MySQL estabelecida');
});

module.exports = connection;
