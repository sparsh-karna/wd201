const { connect } = require("./connectDB");
const Todo = require("./TodoModel");

// eslint-disable-next-line no-unused-vars
const createTodo = async () => {
  try {
    await connect();
    const todo = await Todo.addTask({
      title: "Third todo",
      dueDate: new Date().toISOString().slice(0, 10),
      completed: false,
    });
    console.log(`Created todo with id ${todo.id}`);
  } catch (err) {
    console.error(err);
  }
};

// eslint-disable-next-line no-unused-vars
const countItems = async () => {
  try {
    await connect();
    const todos = await Todo.count();
    console.log(`There are ${todos} todo items`);
  } catch (err) {
    console.error(err);
  }
};

const getAllTodos = async () => {
  try {
    await connect();
    const todos = await Todo.findAll();
    todos.forEach((todo) => {
      console.log(todo.display());
    });
  } catch (err) {
    console.error(err);
  }
};

(async () => {
  // await createTodo();
  // await countItems();
  await getAllTodos();
})();
