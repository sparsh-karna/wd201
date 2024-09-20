const Sequelize = require("sequelize");

const database = "todo_db";
const username = "postgres";
const password = "Arkita@2005";
const sequelize = new Sequelize(database, username, password, {
  host: "localhost",
  dialect: "postgres",
});

const connect = async () => {
  return sequelize.authenticate();
};

module.exports = {
  connect,
  sequelize,
};
