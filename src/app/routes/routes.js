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
    response.marko(
      require('../views/books/list/list.marko'),
      {
        livros: [
          {
            id: 1,
            titulo: "Fundamentos do node"
          },
          {
            id: 2,
            titulo: "Node avançado"
          }
        ]
      }
    );
  });
};
