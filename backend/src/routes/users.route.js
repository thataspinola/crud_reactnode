/*
 * file: src/routes/user.routes.js
 * description: arquivo responsável pelas rotas do usuario
 * data: 26/06/2024
 * author: Thamiris Gaspar
*/

const express = require('express');

const router = express.Router();
// const auth = require('../middlewares/auth');
const userController = require('../controllers/users.controller');

// ==> Rota responsável por Criar um novo usuario: (POST): localhost:3000/api/v1/register
router.post('/register', userController.signup);

// ==> Rota responsável por realizar um novo login: (POST): localhost:3000/api/v1/login
router.post('/login', userController.login);

// ==> Rota responsável por retornar o perfil/profile do usuario: (GET): localhost:3000/api/v1/userProfile
// router.get('/userProfile', auth, userController.returnUserProfile);

module.exports = router;
