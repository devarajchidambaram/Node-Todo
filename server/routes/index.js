const {
  todosController,
  todoItemsController,
  usersController
} = require('../controllers');


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

  //users
  app.get('/api/users', usersController.list);
  app.get('/api/users/:userId', usersController.retrieve);
  app.post('/api/users', usersController.create);
  app.put('/api/users/:userId', usersController.upsert);
  app.patch('/api/users/:userId', usersController.update);
  app.delete('/api/users/:userId', usersController.destroy);

  app.get('*', (req, res) => res.status(404).send({
    message: 'Page not found',
  }));

};