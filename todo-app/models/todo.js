"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }

    static getTodos() {
      return this.findAll();
    }

    static addTodo({ title, dueDate, completed }) {
      return this.create({ title, dueDate, completed });
    }

    markAsCompleted() {
      return this.update({ completed: true });
    }

    static async overdueTodos() {
      return await this.findAll({
        where: {
          dueDate: {
            [Op.lt]: new Date(),
          },
        },
      });
    }

    static async dueToday() {
      return await this.findAll({
        where: {
          dueDate: new Date().toISOString().slice(0, 10),
        },
      });
    }

    static async dueLater() {
      return await this.findAll({
        where: {
          dueDate: {
            [Op.gt]: new Date().toISOString().slice(0, 10),
          },
        },
      });
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
