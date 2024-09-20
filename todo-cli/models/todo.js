// models/todo.js
"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      // FILL IN HERE
      this.overdue().then((overdueTodos) => {
        overdueTodos.forEach((todo) => {
          console.log(todo.displayableString());
        });
      });
      console.log("\n");

      console.log("Due Today");
      // FILL IN HERE
      this.dueToday().then((dueTodayTodos) => {
        dueTodayTodos.forEach((todo) => {
          console.log(todo.displayableString());
        });
      });
      console.log("\n");

      console.log("Due Later");
      // FILL IN HERE
      this.dueLater().then((dueLaterTodos) => {
        dueLaterTodos.forEach((todo) => {
          console.log(todo.displayableString());
        });
      });
    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      try {
        // Fetch all Todo items where dueDate is less than the current date (overdue)
        const overdueTodos = await Todo.findAll({
          where: {
            dueDate: {
              [Op.lt]: new Date(), // Op.lt is 'less than', so it fetches dates earlier than now
            },
          },
        });

        // Return the fetched overdue todos
        return overdueTodos;
      } catch (error) {
        console.error("Error fetching overdue todos:", error);
        throw error;
      }
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      try {
        // Fetch all Todo items where dueDate is equal to the current date
        const dueTodayTodos = await Todo.findAll({
          where: {
            dueDate: new Date().toISOString().slice(0, 10), // Get the current date in the format 'YYYY-MM-DD'
          },
        });

        // Return the fetched todos due today
        return dueTodayTodos;
      } catch (error) {
        console.error("Error fetching todos due today:", error);
        throw error;
      }
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      try {
        // Fetch all Todo items where dueDate is greater than the current date
        const dueLaterTodos = await Todo.findAll({
          where: {
            dueDate: {
              [Op.gt]: new Date(), // Op.gt is 'greater than', so it fetches dates later than now
            },
          },
        });

        // Return the fetched todos due later
        return dueLaterTodos;
      } catch (error) {
        console.error("Error fetching todos due later:", error);
        throw error;
      }
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
      try {
        // Find the Todo item with the specified id
        const todo = await Todo.findOne({
          where: {
            id: id,
          },
        });
        // If the Todo item is found, update its completed status to true
        if (todo) {
          todo.completed = true;
          await todo.save();
        } else {
          console.error(`Todo item with id ${id} not found`);
        }
      } catch (error) {
        console.error("Error marking todo as complete:", error);
        throw error;
      }
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      if (this.dueDate === new Date().toISOString().slice(0, 10)) {
        return `${this.id}. ${checkbox} ${this.title}`;
      }
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    },
  );
  return Todo;
};
