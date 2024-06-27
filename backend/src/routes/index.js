/*
 * file: src/routes/index.js
 * description: arquivo responsável pela rota default da aplicação
 * data: 26/06/2024
 * author: Thamiris Gaspar
*/

const express = require('express');

const router = express.Router();

router.get('/api/v1', (req, res) => {
  res.status(200).send({
    success: true,
    message: 'Seja bem-vindo(a)!',
    version: '1.0.0',
  });
});

module.exports = router;
