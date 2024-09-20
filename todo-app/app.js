const express = require('express');
const app = express();
const { Todo } = require('./models');
const bodyParser = require('body-parser');
app.use(bodyParser.json());


// eslint-disable-next-line no-unused-vars
app.get('/todos', (req, res) => {
    console.log("Todo List")
});

app.post("/todos", async (req, res) => {
    console.log("Creating a Todo", req.body);
    try{
        const todo = await Todo.addTodo({
            title: req.body.title,
            dueDate: req.body.dueDate,
            completed: false,
        })
        res.status(201).json(todo);
    }catch(error){
        console.error(error);
        res.status(500).json("Something went wrong");
    }
});

app.put("/todos/:id/markAsCompleted", async (req, res) => {
    console.log("We have to update a todo with ID:", req.params.id);
    try{
        const todo = await Todo.findByPk(req.params.id);
        await todo.markAsCompleted();
        res.status(200).json(todo);
    }
    catch(error){
        console.error("Error marking todo as complete:", error);
        res.status(500).json("Something went wrong");
    }
});

// eslint-disable-next-line no-unused-vars
app.delete("/todos/:id", (req, res) => {
    console.log("Delete a todo by ID:", req.params.id);
});

module.exports = app;