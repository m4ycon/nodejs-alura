const LivroDao = require('../infra/LivroDao');
const db = require('../../config/database');

module.exports = (app) => {

  app.get('/', function (req, res) {
    res.send(`
      <html>
      <head>
        <meta charset="UTF-8">
      </head> 
      <body>
        <h1>Casa do código</h1>
      </body>
      </html>`
    );
  });

  app.get('/livros', function (req, res) {
    const livroDao = new LivroDao(db);

    livroDao.lista()
      .then(livros =>
        res.marko(
          require('../views/books/list/list.marko'),
          { livros })
      )
      .catch(error => console.log(error));

  });

  app.get('/livros/form', function (req, res) {
    res.marko(require('../views/books/form/form.marko'), { livro: {} });
  });

  app.get('/livros/form/:id', function (req, res) {
    const id = req.params.id;
    const livroDao = new LivroDao(db);

    livroDao.buscaPorId(id)
      .then(livro =>
        res.marko(
          require('../views/books/form/form.marko'), { livro }))
      .catch(error => console.log(error));
  });

  app.post('/livros', function (req, res) {
    console.log(req.body);

    const livroDao = new LivroDao(db);

    livroDao.adiciona(req.body)
      .then(res.redirect('/livros'))
      .catch(error => console.log(error));
  });

  app.put('/livros', function (req, res) {
    console.log(req.body);

    const livroDao = new LivroDao(db);

    livroDao.atualiza(req.body)
      .then(res.redirect('/livros'))
      .catch(error => console.log(error));
  });

  app.delete('/livros/:id', function (req, res) {
    const id = req.params.id;

    const livroDao = new LivroDao(db);
    livroDao.remove(id)
      .then(() => res.status(200).end())
      .catch(erro => console.log(erro));

  });

};
