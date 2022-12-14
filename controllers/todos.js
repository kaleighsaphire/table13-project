const Todo = require('../models/Todo')

module.exports = {
    getTodos: async (req,res)=>{
        try{
            const todoItems = await Todo.find({userId:req.user.id})
            const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
            res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createTodo: async (req, res)=>{
        try{
            await Todo.create({todo: req.body.todoItem, completed: false, userId: req.user.id})
            console.log('Todo has been added!')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    markImportant: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                important: true
            })
            console.log('Marked Important')
            res.json('Marked Important')
        }catch(err){
            console.log(err)
        }
    },
    markRegular: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                important: false
            })
            console.log('Marked Regular')
            res.json('Marked Regular')
        }catch(err){
            console.log(err)
        }
    },
    // GET form to edit todo
    getEditTodoForm: async (req,res)=>{
        try {
            const id = req.params.id
            const todo = await Todo.findById(id).exec()
            res.render('editTodo', {
                todo: todo,
                user: req.user
            })
        } catch(err){
            console.log(err)
        }
    },
    // POST - edit note
    editTodo: async (req, res)=>{
        try{
            const id = req.params.id
            const data = req.body
            await Todo.findByIdAndUpdate(id, {
                todo: data.todoItem
            }, { new: true })
            console.log('Todo Updated')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    deleteTodo: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    