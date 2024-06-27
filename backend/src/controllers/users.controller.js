/*
 * Arquivo: src/controllers/users.controller.js
 * Descrição: arquivo responsável pelo CRUD na tabela usuarios
 * Data: 26/06/2024
 * author: Thamiris Gaspar
*/

const bcrypt = require('bcrypt');
const moment = require('moment');
const jwt = require('jsonwebtoken');
// const crypto = require('crypto');

const db = require('../config/mySqlConnection.config');
// const emailService = require('../services/email.service');

// singup - registro
exports.signup = async (req, res) => {
  console.log('[START] Processo de cadastro de novo usuário');

  try {
    console.info('[INFO] Verificar se algum usuário já tem o e-mail informado para cadastro');
    const { email } = req.body;
    let query = `SELECT * FROM usuarios WHERE email = '${email.toLowerCase()}'`;

    db.query(query, async (err, result) => {
      if (err) {
        console.error('[ERROR] ', err);
        return res.status(404).json({ err });
      }

      if (result.lenght !== 0) {
        console.info(`[INFO] E-mail ${req.body.email} já cadastrado`);
        return res.status(409).json({ message: "Atenção! Este e-mail já possui registro!" });
      }

      // descrição da senha
      const pwd = await bcrypt.hash(req.body.senha, 10);
      const dtNascimento = moment().format('YYYY-MM-DD', req.body.data_nascimento);
      query = `INSERT INTO usuarios (nome, email, fone, data_nascimento, senha) VALUES ('${req.body.nome}', '${email.toLowerCase()}', '${req.body.fone}', '${dtNascimento}', '${pwd}')`;

      db.query(query, async (error, results) => {
        if (error) {
          console.error('[ERROR] ', error);
          return res.status(404).json({ error });
        }

        console.info('[INFO] Usuário(a) criado(a) com sucesso!');
        const newUser = {
          id: results.insertId,
          nome: req.body.nome,
          email: req.body.email,
          fone: req.body.fone,
          data_nascimento: dtNascimento,
          senha: pwd,
        };

        const token = generateAuthToken(newUser);
        return res.status(201).json({ msg: "Usuário(a) criado(a) com sucesso!", token });
      });
    });
  } catch (err) {
    console.error('[ERROR] ', err);
    return res.status(404).json({ err });
  }
};

// login
exports.login = async (req, res) => {
  try {
    console.info(`[INFO] Verificando o e-mail ${req.body.email}`);
    const { email } = req.body;
    const query = `SELECT * FROM usuarios WHERE email = '${email.toLowerCase()}'`;
    db.query(query, async (err, result) => {
      if (err) {
        console.error('[ERROR] ', err);
        return res.status(404).json({ err });
      }

      if (result.length === 0) {
        console.info(`[INFO] E-mail ${req.body.email} não encontrado na base de dados!`);
        return res.status(409).json({ error: `E-mail ${req.body.email} não encontrado na base de dados!` });
      }

      const pwd = await bcrypt.compare(req.body.senha, result[0].senha);

      if (!pwd) {
        console.info('[INFO] Senha informada incorreta!');
        return res.status(409).json({ error: 'Senha informada incorreta!' });
      }

      const token = generateAuthToken(result);
      return res.status(200).json({ msg: 'Usuário logado com sucesso!', token });
    });
  } catch (err) {
    console.error('[ERROR] ', err);
    return res.status(404).json({ err });
  }
};

// Esse método irá criar (gerar) uma autenticação auth para o usuario
function generateAuthToken(usuario) {
  const token = jwt.sign({ usuario }, 'secret');
  return token;
}
