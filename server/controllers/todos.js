const { Todo , TodoItem } = require('../models');
const only = require('only')


module.exports = {
 async create(req, res) {

    try{

      const {title}  = req.body

      await Todo
      .create({
        title,
      })

      return res.status(201).send({ message :'Created successfully' })

    }catch(err){
      console.log('error', err)
      res.status(500).send( { message : 'Internal server error' })
    }
  },

  async list(req, res){
    
    try{
      const {skip, limit} = req.query

      const todos = await Todo.findAll({
        offset: skip, 
        limit: limit,

        include: [{
          model: TodoItem,
          as: 'todoItems',
        }],
      })

      return res.status(200).send(todos)

    }catch(err){
      console.log('error', err)
      res.status(500).send( { message : 'Internal server error' })
    }
  },

  async retrieve(req, res){
    
    try{
      const {todoId}  = req.params

      const todo = await Todo.findByPk(todoId)
      return res.status(200).send(todo)

    }catch(err){
      console.log('error', err)
      res.status(500).send( { message : 'Internal server error' })
    }
  },

  async update(req, res){
    
    try{
      const {todoId}  = req.params
      const changes = req.body  

      const updatedCount = await Todo.update(

        only(changes, 'title')

      , {
        where : {
          id : todoId
        }
      })

      if(updatedCount[0] === 0 ) return res.status('400').send({ message : 'Todo id not found'})

      return res.status(200).send({message : 'Updated successfully'})

    }catch(err){
      console.log('error', err)
      res.status(500).send( { message : 'Internal server error' })
    }
  },


  async upsert(req, res){
    
    try{

      const {todoId}  = req.params
      const changes = req.body  

      const result = await Todo.findOrCreate(
      {
        where : {
          id : todoId
        },
        //Data to be created or updated
        defaults:  only(changes, 'title') 
      })

      if(result[1] === true)  return res.status(201).send({message : 'Created successfully'})

      return res.status(200).send({message : 'Updated successfully'})

    }catch(err){
      console.log('error', err)
      res.status(500).send( { message : 'Internal server error' })
    }
  },


  async destroy(req, res){
    
    try{
      const {todoId}  = req.params
      
      const deletedCount = await Todo.destroy({
         where : {
           id : todoId
         }
     })
     
     if(deletedCount === 0 ) return res.status('400').send({ message : 'Todo id not found'})

     return res.status(200).send({message : 'Deleted successfully'})

    }catch(err){
      console.log('error', err)
      res.status(500).send( { message : 'Internal server error' })
    }
  }

};