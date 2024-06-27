const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    todoTitle: String, 
    todoText: String, 
    todoTime: String
})

const TodoModel = mongoose.model("todos", TodoSchema)
module.exports = TodoModel