const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors'); 
const TodoModel = require('./models/Todo')

const app = express(); 
app.use(cors()); 
app.use(express.json()); 

mongoose.connect("mongodb+srv://jules:jules19@2due-main.gtaie2n.mongodb.net/2due?retryWrites=true&w=majority&appName=2due-main")

app.post("/createTodo", (req, res) => {
    TodoModel.create(req.body)
    .then(todos => res.json(todos))
    .catch(err => res.json(err)); 
})

app.get('/', (req, res) => {
    TodoModel.find({})
    .then(todos => res.json(todos))
    .catch(err => res.json(err))
})

app.delete("/deleteTodo/:id", (req, res) => {
    const id = req.params.id
    TodoModel.findByIdAndDelete({_id: id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})

app.get('/getTodo/:id', (req, res) => {
    const id = req.params.id; 
    TodoModel.findById({_id:id})
    .then(todos => res.json(todos))
    .catch(err => res.json(err)); 
})

app.put('/updateTodo/:id', (req, res) => {
    const id = req.params.id; 
    TodoModel.findByIdAndUpdate({_id:id}, {
        todoTitle: req.body.todoTitle, 
        todoText: req.body.todoText, 
        todoTime: req.body.todoTime
    })
    .then(todos => res.json(todos))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("Server Is Running"); 
})