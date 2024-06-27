/*
 * file: src/services/email.service.js
 * description: arquivo responsavel pelo serviço de envio de emails
 * data: 26/06/2024
 * author: Thamiris Gaspar
*/

const nodemailer = require('nodemailer');

exports.sendMail = async function (user, callback) {
  // cria um objeto transportador reutilizável usando o transporte SMTP padrão
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // verdadeiro para 465, falso para outras portas
    auth: {
      user: 'arcanusgames23@gmail.com',
      pass: 'motetozcvmoaogji',
    },
  });

  const mailOptions = {
    from: '"Arcanum Oculltus" <arcanusgames23@gmail.com>', // Endereço do remetente
    to: user.email, // lista de receptores
    subject: user.subject, // linha de assunto
    html: user.message,
  };

  // envia e-mail com objeto de transporte definido
  const info = await transporter.sendMail(mailOptions);

  callback(info);
};
