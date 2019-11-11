const { User, Todo } = require('../models');
const only = require('only')

console.log('todo//', JSON.stringify(Todo))
module.exports = {
 async create(req, res) {

    try{

      const {name, email, password}  = req.body

      await User
      .create({
        name,
        email,
        password
      })

      return res.status(201).send({ message :'User created successfully' })

    }catch(err){
      console.log('error', err)
      res.status(500).send( { message : 'Internal server error' })
    }
  },

  async list(req, res){
    
    try{
      const {skip, limit} = req.query

      const users = await User.findAll({
        offset: skip, 
        limit: limit,

        include: [{
          model: Todo,
          as : 'userTodos'
        }]

      })

      return res.status(200).json(users)

    }catch(err){
      console.log('error', err)
      res.status(500).send( { message : 'Internal server error' })
    }
  },

  async retrieve(req, res){
    
    try{
      const {userId}  = req.params

      const user = await User.findByPk(userId)
      return res.status(200).send(user)

    }catch(err){
      console.log('error', err)
      res.status(500).send( { message : 'Internal server error' })
    }
  },

  async update(req, res){
    
    try{
      const {userId}  = req.params
      const changes = req.body  

      const updatedCount = await User.update(

        only(changes, 'name email password')

      , {
        where : {
          id : userId
        }
      })

      if(updatedCount[0] === 0 ) return res.status('400').send({ message : 'User id not found'})

      return res.status(200).send({message : 'Updated successfully'})

    }catch(err){
      console.log('error', err)
      res.status(500).send( { message : 'Internal server error' })
    }
  },


  async upsert(req, res){
    
    try{

      const {userId}  = req.params
      const changes = req.body  

      const result = await User.findOrCreate(
      {
        where : {
          id : userId
        },
        //Data to be created or updated
        defaults:  only(changes, 'title') 
      })

      if(result[1] === true)  return res.status(201).send({message : 'User created successfully'})

      return res.status(200).send({message : 'Updated successfully'})

    }catch(err){
      console.log('error', err)
      res.status(500).send( { message : 'Internal server error' })
    }
  },


  async destroy(req, res){
    
    try{
      const {userId}  = req.params
      
      const deletedCount = await User.destroy({
         where : {
           id : userId
         }
     })
     
     if(deletedCount === 0 ) return res.status('400').send({ message : 'User id not found'})

     return res.status(200).send({message : 'User deleted successfully'})

    }catch(err){
      console.log('error', err)
      res.status(500).send( { message : 'Internal server error' })
    }
  }

};