/*
 * Arquivo: src/controllers/email.controller.js
 * Descrição: arquivo responsável pelo envio de emails fornecido pelo serviço de email
 * Data: 26/06/2024
 * author: Thamiris Gaspar
*/

const emailService = require('../services/email.service');

exports.sendmail = async (req, res) => {
  const user = req.body;

  emailService.sendMail(user, (info) => {
    res.send(info);
  });
};
