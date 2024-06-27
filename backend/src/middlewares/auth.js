/*
 * file: src/middlewares/auth.js
 * description: arquivo responsável por confirmar se um determinado(a) usuario tem autorização
 * para acessar um determinado recurso.
 * data: 26/06/2024
 * author: Thamiris Gaspar
*/

const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.replace('Bearer ', '');

    // ==> um console para termos uma saída do 'token'
    console.log(token);
    const decoded = jwt.verify(token, 'secret');
    req.userData = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Falha na Autenticação!' });
  }
};
