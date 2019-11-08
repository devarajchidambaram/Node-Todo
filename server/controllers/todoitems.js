const TodoItem = require('../models').TodoItem;
const only = require('only')

module.exports = {
  async create(req, res) {
 
     try{
 
       const body  = req.body
       const {todoId}  = req.params

      
       await TodoItem
       .create({...body , todoId})
 
       return res.status(201).send({ message :'Created successfully' })
 
     }catch(err){
       console.log('error', err)
       res.status(500).send( { message : 'Internal server error' })
     }
   },
 
   async list(req, res){
     
     try{

       const {todoId} = req.params;

       const todoItems = await TodoItem.findAll({
         where : {
          todoId
         }
        })
 
       return res.status(200).send(todoItems)
 
     }catch(err){
       console.log('error', err)
       res.status(500).send( { message : 'Internal server error' })
     }
   },
 
   async retrieve(req, res){
     
     try{
       const {todoId, id}  = req.params
 
       const todoItem = await TodoItem.findAll({
         where : {
           todoId,
           id
         }
       })

       return res.status(200).send(todoItem)
 
     }catch(err){
       console.log('error', err)
       res.status(500).send( { message : 'Internal server error' })
     }
   },
 
   async update(req, res){
     
     try{
       const {todoId, id}  = req.params
       const changes = req.body  
 
       const updatedCount = await TodoItem.update(
 
         only(changes, 'content complete todoId')
 
       , {
         where : {
            id,
            todoId
         }
       })
 

       if(updatedCount[0] === 0 ) return res.status('400').send({ message : 'TodoItem id not found'})
 
       return res.status(200).send({message : 'Updated successfully'})
 
     }catch(err){
       console.log('error', err)
       res.status(500).send( { message : 'Internal server error' })
     }
   },
 
 

   async upsert(req, res){
     
     try{

       const {todoId, id}  = req.params
       const changes = req.body  
 
       const result = await TodoItem.findOrCreate(
       {
         where : {
           todoId,
           id
         },
         //Data to be created or updated
         defaults:  only(changes, 'content complete todoId') 
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
      const {todoId, id}  = req.params
       
       const deletedCount = await TodoItem.destroy({
          where : {
            todoId,
            id
          }
      })
      
      if(deletedCount === 0 ) return res.status('400').send({ message : 'TodoItem id not found'})

      return res.status(200).send({message : 'Deleted successfully'})
 
     }catch(err){
       console.log('error', err)
       res.status(500).send( { message : 'Internal server error' })
     }
   }
 
 };