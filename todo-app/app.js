const express = require("express");
const app = express();
const { Todo } = require("./models");
const bodyParser = require("body-parser");
const path = require("path");
app.use(bodyParser.json());

// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.get("/", async function (request, response) {
  try {
    const allTodos = await Todo.getTodos();
    const overdueTodo = await Todo.overdueTodos();
    const dueToday = await Todo.dueToday();
    const dueLater = await Todo.dueLater();

    if (request.accepts("html")) {
      return response.render("index", {
        allTodos,
        overdueTodo,
        dueToday,
        dueLater,
      });
    } else {
      return response.json({ allTodos, overdueTodo, dueToday, dueLater });
    }
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.get("/todos", async function (_request, response) {
  console.log("Processing list of all Todos ...");
  // FILL IN YOUR CODE HERE

  // First, we have to query our PostgerSQL database using Sequelize to get list of all Todos.
  // Then, we have to respond with all Todos, like:
  // response.send(todos)
  try {
    const todos = await Todo.findAll();
    return response.status(200).json(todos);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.get("/todos/:id", async function (request, response) {
  try {
    const todo = await Todo.findByPk(request.params.id);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.post("/todos", async function (request, response) {
  try {
    const todo = await Todo.addTodo({
      title: request.body.title,
      dueDate: request.body.dueDate,
      completed: false,
    });
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.put("/todos/:id/markAsCompleted", async function (request, response) {
  const todo = await Todo.findByPk(request.params.id);
  try {
    const updatedTodo = await todo.markAsCompleted();
    return response.json(updatedTodo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.delete("/todos/:id", async function (request, response) {
  console.log("We have to delete a Todo with ID: ", request.params.id);

  try {
    const todo = await Todo.findByPk(request.params.id);
    if (!todo) {
      // If no todo is found, respond with false
      return response.json(false);
    }

    // If the todo exists, destroy it
    await todo.destroy();
    return response.json(true);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.get("/todos/overdue", async function (request, response) {
  const overdueTodo = await Todo.overdueTodos();
  if (request.accepts("html")) {
    return response.render("index", { overdueTodo });
  } else {
    return response.json({ overdueTodo });
  }
});

app.get("/todos/dueToday", async function (request, response) {
  const dueToday = await Todo.dueToday();
  if (request.accepts("html")) {
    return response.render("index", { dueToday });
  } else {
    return response.json({ dueToday });
  }
});

app.get("/todos/dueLater", async function (request, response) {
  const dueLater = await Todo.dueLater();
  if (request.accepts("html")) {
    return response.render("index", { dueLater });
  } else {
    return response.json({ dueLater });
  }
});

module.exports = app;
