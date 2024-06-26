/*
 * file: server.js
 * description: arquivo responsável por toda a configuração e execução da aplicação
 * data: 25/06/2024
 * author: Thamiris Gaspar
*/

const app = require('./src/app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.info('[INFO] Aplicação executando na porta: ', port);
});
