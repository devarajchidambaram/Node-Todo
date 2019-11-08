const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

//Todos

  app.get('/api/todos', todosController.list);
  app.get('/api/todos/:todoId', todosController.retrieve);
  app.post('/api/todos', todosController.create);
  app.put('/api/todos/:todoId', todosController.upsert);
  app.patch('/api/todos/:todoId', todosController.update);
  app.delete('/api/todos/:todoId', todosController.destroy);


//Todo items
  app.get('/api/todos/:todoId/items', todoItemsController.list);
  app.get('/api/todos/:todoId/items/:id', todoItemsController.retrieve);
  app.post('/api/todos/:todoId/items/:id', todoItemsController.create);
  app.put('/api/todos/:todoId/items/:id', todoItemsController.upsert);
  app.patch('/api/todos/:todoId/items/:id', todoItemsController.update);
  app.delete('/api/todos/:todoId/items/:id', todoItemsController.destroy);

  app.get('*', (req, res) => res.status(404).send({
    message: 'Page not found',
  }));
};