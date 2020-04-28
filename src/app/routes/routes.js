const LivroDao = require('../infra/LivroDao');
const db = require('../../config/database');

module.exports = (app) => {
  app.get('/', function (request, response) {
    response.send(
      `
      <html>
      <head>
        <meta charset="UTF-8">
      </head> 
      <body>
        <h1>Casa do código</h1>
      </body>
      </html>
      `
    );
  });

  app.get('/livros', function (request, response) {
    const livroDao = new LivroDao(db);

    livroDao.lista()
      .then(livros =>
        response.marko(
          require('../views/books/list/list.marko'),
          { livros }))
      .catch(error => console.log(error));

  });
};
